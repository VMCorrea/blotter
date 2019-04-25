var tbody,
	tr,
    inputFiltro,
    checkboxMaster,
	list,
	options,
	formUpload;

window.onload = function () {

    var btnClassify,
        btnFiltrar,
		btnSalvar,
		btnUpload;
       
    inputFiltro = document.getElementById( "input_filtra-registro" );
    inputFiltro.addEventListener( "keyup", filtroRegistro );
    
    checkboxMaster = document.querySelector( "input[name=checkbox-master]" );
    checkboxMaster.addEventListener( "change", selectAll );
    
    btnClassify = document.getElementById( "form_modal--classify-button" );
    btnClassify.addEventListener( "click", classifyAll );
    
    btnFiltrar = document.getElementById( "btn-filtro" );
    btnFiltrar.addEventListener( "click", function() {
       hideShowElement( "form_filtro-registros" );
		
		inputFiltro.value = "";
		
		filtroRegistro();
		
    });
    
    tbody = document.getElementById( "table_tbody--registros" );
	
	tr = tbody.getElementsByTagName( "tr" );
	
	list = document.getElementById( "table_input--list-operacoes" );
	
	options = list.getElementsByTagName( "option" );
	
	btnSalvar = document.getElementById( "btn-salvar" );
	btnSalvar.addEventListener( "click", salvarRegistros );
	
	btnUpload = document.getElementById( "form_modal-import--upload-button" );
	

	var inputFile = document.getElementById( "form_modal-import--input-file" );
	
	formUpload = document.getElementById( "form_modal-import" );
	formUpload.addEventListener( "submit", function( event ) {
		event.preventDefault();
		event.stopPropagation();
		
		var request = new XMLHttpRequest(),
			formData = new FormData();
		
		formData.append( "file", inputFile.files[0] );
		
		request.open( "POST", "/blotter/blotter/upload" );
		request.onload = () => console.log(request.status);
		request.send(formData);
		
		$( "#modalImport" ).modal( "hide" );
		
	
	});

};


// ==== MOSTRA/OCULTA Elemento ====
// Essa função necessita colocar um onclick no elemento html que à ativa.
function hideShowElement( id ) {

    var element = document.getElementById( id ),
        classe = "d-none";

    if ( element.classList.contains( classe ) ) {
        
        element.classList.remove( classe );

    } else {
        
        element.classList.add( classe );

    }

}

// ==== FILTRO ====
function filtroRegistro() {

    var inputValue,
        select;

    // Pega o valor do input normalizado e tudo maiúsculo
    inputValue = inputFiltro.value.toUpperCase().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );

    // Pega a opção de filtro
    select = document.getElementById( "form_select--filtro" );


    // Pra cada tr
    for ( var i = 0; i < tr.length; i++ ) {

        // Seleciona o td baseado no filtro selecionado
        var td = tr[i].getElementsByTagName( "td" )[select.value].textContent
            .toUpperCase().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );

        // Verifica se contem o texto
        if ( td.indexOf( inputValue ) > -1 ) {

            tr[i].style.display = "";

        } else {

            tr[i].style.display = "none";

        }
    }
}

// ======================== Classificação em massa / CHECKBOX =============================
// Função que seleciona ou deselecionar as checkbox visíveis.
function selectAll() {
 
    var i;

	// Verifica se o a checkbox mestre está checada.
    if( checkboxMaster.checked ) {
        
		// Itera pelas linhas da tabela
        for ( i = 0; i < tr.length; i++ ) {
			
			// Verifica se o display está vazio. Indicando que a linha está visível,
			// ou seja, faz parte do filtro.
            if ( tr[i].style.display == "" ){

				// Marca a checkbox da linha.
                tr[i].querySelector( "input[type=checkbox]" ).checked = true; 
                
            }
        }
    
    } else {
        
		// Itera pelas linhas da tabela
        for ( i = 0; i < tr.length; i++ ) {
   
			// Desmarca a checkbox da linha.
            tr[i].querySelector( "input[type=checkbox]" ).checked = false;
                 
        }  
    }
}

// Função que atualiza a operação das linhas selecionadas.
function classifyAll( ) {
    
    var operacao,
        i;
    
	// Valor do input de Operação, do Modal.
    operacao = document.getElementById( "form_modal--input-operacao" ).value;

	// Se a validação retornar vazio e o campo de operação não for vazio
	// significa que a operação não existe.
	if ( validaOperacoes( operacao ) == "" && operacao != "") {
		
		alert( "Operação inválida" );
		
	} else {
	
		// Itera pelas linhas da tabela.
		for ( i = 0; i < tr.length; i++ ) {

			// Verifica se o checkbox está checado.
			if ( tr[i].querySelector( "input[type=checkbox]" ).checked == true ) {

				// Atribui o valor da operação.
				tr[i].querySelector( "input[type=text]" ).value = operacao;

			}

		}

		// Fecha o modal.
		$( '#modalCl' ).modal( 'hide' );
		
	}
    
}

// Modal de Classificação. Necessário usar JQuery, por causa do Bootstrap
$( "#modalCl" ).on( "show.bs.modal", function ( event ) {

    var inputOperacao = document.getElementById( "form_modal--input-operacao" );
    
    inputOperacao.value = "";
    
});

// ======================== SALVAR ================================
function salvarRegistros() {
	
	var registros = [],
		registro,
		operacao,
		idOp = 0,
		td, 
		falha = false,
		salvos = [],
		idLinha,
		numFalhas = 0;
	
	for( var i = 0 ; i < tr.length ; i++ ) {
		
		td = tr[i].getElementsByTagName( "td" );
		
		operacao = tr[i].querySelector( "input[type=text]" ).value;
		
		idOp = validaOperacoes( operacao );
		
		if ( idOp != "" ) {
			
			idLinha = tr[i].getAttribute( "data-registro" );
			
			registro = {
				id: idLinha,
				operacao: {
					id: idOp
				}
			};
			
			registros.push( registro );
			
			salvos.push( idLinha );
	
			
		} else {
			
			falha = true;
			
			numFalhas++;
			
		}
		
	}
	
	if ( salvos.length > 0 ) {
		
		var linha;
		
		for ( var i = 0 ; i < salvos.length ; i++ ){
			
			linha = tbody.querySelector( "tr[data-registro='" + salvos[i] + "']" );
			
			linha.remove();

		}
		
	}
	
	
	if ( falha ) {
		
		alert( salvos.length + " registros salvos.\n" + numFalhas + " registros com operação em branco ou inválida!" );
		
	} else {
		
		alert( salvos.length + " registros salvos." );
		
	}
	
	console.log( registros );

	
}

// ======================== VALIDAÇÃO =============================
function validaOperacoes( operacao ) {
    
    var id = 0;
    
    // Compara o campo de Operação com as opções disponiveis no <datalist>.
    for( i = 0 ; i < options.length ; i++ ){

        if( options[i].value.indexOf( operacao ) > -1 && operacao != "" ){

            // Ao encontrar uma opção que bata, o id que está salvo na <option> é salvo para validação. 
            id = options[i].getAttribute( "data-op" );

        }        
    
    }
    
	return id;
}