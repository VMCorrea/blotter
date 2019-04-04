window.onload = function () {

    // Seleciona o input
    var input = document.getElementById( "input_filtra-estrategia" );

    // Adiciona o eventListener
    input.addEventListener( "keyup", filtroOperacao );

    document.getElementById( "form_modal--save-button" ).addEventListener( "click", sendOperacao );

};

// ==== MODAL DE EDIÇÃO/CRIAÇÃO DE ESTRATÉGIAS ====
$( "#modalEdit" ).on( "show.bs.modal", function ( event ) {

    var linha = $( event.relatedTarget ),
        acao = linha.data( "acao" ),
        modal = $( this ),
        btnSalvar = document.getElementById( "form_modal--save-button" );

    modal.find( "#modalEditLabel" ).text( acao + " operação" );

    if ( acao == "Editar" ) {
        var id = linha.data( "id" ),
            estrategia = linha.data( "estrategia" ),
            operacao = linha.data( "operacao" ),
            inicio = linha.data( "inicio" );

        btnSalvar.setAttribute( "data-acao", "editar" );


        modal.find( "#estrategia-edit" ).val( estrategia );
        modal.find( "#operacao-edit" ).val( operacao );
        document.getElementById( "data-edit" ).value = inicio;
        modal.find( "#id-edit" ).val( id );

    } else {

        modal.find( "#estrategia-edit" ).val( "" );
        modal.find('#operacao-edit').val( "" );
        modal.find('#data-edit').val( "" );

        btnSalvar.setAttribute( "data-acao", "criar" );
    }
});

// ==== Requisição ====
function sendOperacao() {

    var btnSalvar = document.getElementById( "form_modal--save-button" ),
        est = document.getElementById( "estrategia-edit" ).value, 
        op = document.getElementById( "operacao-edit" ).value, 
        dt = document.getElementById( "data-edit" ).value, 
        id = document.getElementById( "id-edit" ).value,
        list = document.getElementById( "form_modal--list-estrategias" ),
        options = list.getElementsByTagName( "option" ),
        permalink = "";

    for( var i = 0 ; i < options.length ; i++ ){

        if( options[i].value.indexOf( est ) > -1 ){

            permalink = options[i].getAttribute( "data-permalink" );

        }        
    
    }

    if (dt == "" || est == "" || op == "") {

        alert( "Preencha todos os campos!" );

    } else {

        var data = new Date( dt ), 
            obj = {
                nome: op,
                estrategia: { 
                    permalink: permalink 
                },
                dataInicio: setDataBr( (data.getDate() + 1),  (data.getMonth() + 1), data.getFullYear() ),
                id: ""
            },
            xhr = new XMLHttpRequest(),
            metodo = "";


        if ( btnSalvar.getAttribute( "data-acao" ) == "editar" ) {
            
            metodo = "PUT";
            obj.id = id;

        } else if ( btnSalvar.getAttribute( "data-acao" ) == "criar" ) {

            metodo = "POST";

        }

        xhr.onload = function () {

            if ( xhr.status >= 200 && xhr.status < 300 ) {

                var operacao = JSON.parse( xhr.responseText );

                console.log( "Sucesso: " + xhr.status );
                console.log( xhr.responseText );

                updateTable( operacao, xhr.status );

            } else {

                console.log( "Falha: " + xhr.status );

            }

        };

        console.log( obj );

        xhr.open( metodo, "/blotter/api/operacoes/", true );
        xhr.setRequestHeader( "Content-Type", "application/json; charset=utf-8" );
        xhr.send( JSON.stringify( obj ) );

        $( '#modalEdit' ).modal( 'hide' );

    }
}

// ==== Atualiza tabela de operações ==== 
function updateTable( operacao, codigo ) {

    var table = document.getElementById( "table_estrategias" ),
        tbody = table.getElementsByTagName( "tbody" )[0],
        dataBr = setDataBr( operacao.dataInicio.dayOfMonth, operacao.dataInicio.month, operacao.dataInicio.year ),
        dataUs = setDataUs( operacao.dataInicio.dayOfMonth, operacao.dataInicio.month, operacao.dataInicio.year );

    if ( codigo == 201 ) {

        var new_tr,
            td_estrategia,
            td_operacao,
            td_dataInicio;

        new_tr = document.createElement( "tr" );
        new_tr.setAttribute( "class", "editavel" );
        new_tr.setAttribute( "data-toggle", "modal" );
        new_tr.setAttribute( "data-target", "#modalEdit" );
        new_tr.setAttribute( "data-id", operacao.id );
        new_tr.setAttribute( "data-estrategia", operacao.nome );
        new_tr.setAttribute( "data-operacao", operacao.estrategia.permalink );
        new_tr.setAttribute( "data-inicio", dataUs );
        new_tr.setAttribute( "data-acao", "Editar" );

        td_estrategia = document.createElement( "td" );
        td_operacao = document.createElement( "td" );
        td_dataInicio = document.createElement( "td" );

        td_estrategia.innerHTML = operacao.estrategia.nome;
        td_operacao.innerHTML = operacao.nome;
        td_dataInicio.innerHTML = dataBr;

        new_tr.appendChild( td_estrategia );
        new_tr.appendChild( td_operacao );
        new_tr.appendChild( td_dataInicio );

        tbody.insertBefore( new_tr, tbody.firstElementChild );

    } else if ( codigo == 200 ) {

        var tr_update = table.querySelector( "tr[data-id='" + operacao.id + "']" );

        tr_update.getElementsByTagName( "td" )[0].innerHTML = operacao.estrategia.nome;
        tr_update.getElementsByTagName( "td" )[1].innerHTML = operacao.nome;
        tr_update.getElementsByTagName( "td" )[2].innerHTML = dataBr;

        tr_update.setAttribute( "data-inicio", dataUs );
        tr_update.setAttribute( "data-estrategia", operacao.estrategia.permalink );
        tr_update.setAttribute( "data-operacao", operacao.nome );

    }

}

// ==== Config de Datas ====

function setDataBr( dia, mes, ano ) {
    return ( "0" + dia ).slice( -2 ) + "/" + ( "0" + mes ).slice( -2 ) + "/" + ano;
}

function setDataUs(dia, mes, ano) {
    return ano + "-" + ( "0" + mes ).slice(-2) + "-" + ( "0" + dia ).slice( -2 );
}

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
function filtroOperacao() {

    var inputValue,
        select,
        table, 
        tr;

    // Pega o valor do input normalizado e tudo maiúsculo
    inputValue = document.getElementById( "input_filtra-estrategia" ).value
        .toUpperCase().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );

    // Pega a opção de filtro
    select = document.getElementById( "filtro" );

    // Seleciona a tabela
    table = document.getElementById( "table_estrategias" );

    // Pega todos os tr da tabela
    tr = table.getElementsByClassName( "editavel" );

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