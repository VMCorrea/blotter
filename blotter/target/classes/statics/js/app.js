window.onload = function () {

    // Seleciona o input
    var input = document.getElementById( "input_filtra-operacao" );

    // Adiciona o eventListener
    input.addEventListener( "keyup", filtroOperacao );

    document.getElementById( "form_modal--save-button" ).addEventListener( "click", sendOperacao );

    document.getElementById( "form_modal--delete-button" ).addEventListener( "click", deleteOperacao );

};

// ==== MODAL DE EDIÇÃO/CRIAÇÃO DE ESTRATÉGIAS ====
// Necessário usar JQuery, por causa do Bootstrap
$( "#modalEdit" ).on( "show.bs.modal", function ( event ) {

    var linha = $( event.relatedTarget ),
        acao = linha.data( "acao" ),
        modal = $( this ),
        btnSalvar = document.getElementById( "form_modal--save-button" ),
        btnDeletar = document.getElementById( "form_modal--delete-button" );

    modal.find( "#modalEditLabel" ).text( acao + " operação" );

    if ( acao == "Editar" ) { 
    // Opção em que o modal é utilizado para editar uma operação. 
    // Ele traz os dados e preenche os campos automaticamente.

        // Existe um problema de 'cache' ao pegar atributos via JQuery. Mesmo os atributos sendo atualizados o JQuery pegava os valores antigos.
        var id = linha[0].getAttribute("data-id"),
            estrategia = linha[0].getAttribute( "data-estrategia" ),
            operacao = linha[0].getAttribute( "data-operacao" ),
            inicio = linha[0].getAttribute( "data-inicio" );



        // Setando o atributo que é utilizado para definir a ação que o botão SALVAR vai executar.
        btnSalvar.setAttribute( "data-acao", "editar" );

        // Setando o id da operação no botão DELETAR e o ativa.
        btnDeletar.setAttribute( "data-delete", id );
        btnDeletar.disabled = false;

        // Preenchimento dos campos.
        modal.find( "#estrategia-edit" ).val( estrategia );
        modal.find( "#operacao-edit" ).val( operacao );
        document.getElementById( "data-edit" ).value = inicio;
        modal.find( "#id-edit" ).val( id );

    } else { 
    // Opção em que o modal é utilizado para criar uma operação.
    // Os campos são esvaziados. 
    
        // Esvaziando os campos.
        modal.find( "#estrategia-edit" ).val( "" );
        modal.find('#operacao-edit').val( "" );
        modal.find('#data-edit').val( "" );

        // Setando o atributo que é utilizado para definir a ação que o botão vai executar.
        btnSalvar.setAttribute( "data-acao", "criar" );

        btnDeletar.disabled = true;
    }
});

// ==== Requisições ====
// Função que envia a operação, para criar ou atualizar, através de requisições assíncronas.
function sendOperacao() {

    var btnSalvar = document.getElementById( "form_modal--save-button" ),
        est = document.getElementById( "estrategia-edit" ).value, 
        op = document.getElementById( "operacao-edit" ).value, 
        dt = document.getElementById( "data-edit" ).value, 
        id = document.getElementById( "id-edit" ).value,
        list = document.getElementById( "form_modal--list-estrategias" ),
        options = list.getElementsByTagName( "option" ),
        permalink = "";

    // Compara o campo de Estratégia com as opções disponiveis no <datalist>.
    for( var i = 0 ; i < options.length ; i++ ){

        if( options[i].value.indexOf( est ) > -1 ){

            // Ao encontrar uma opção que bata, o permalink que está salvo na <option> é salvo. 
            // Ele é necessário para enviar a operação para o banco.
            permalink = options[i].getAttribute( "data-permalink" );

        }        
    
    }

    if (dt == "" || est == "" || op == "") {
    // Verifica se os campos foram preenchidos.

        alert( "Preencha todos os campos!" );

    } else if( permalink == "" ){
    // Verifica se algum permalink foi encontrado. Se não foi, é porque a estratégia não existe.

        alert( "Estratégia não existe!" );

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


        // if else que pega o atributo do botão salvar, e baseado nisso define o método que será usado na requisição.
        if ( btnSalvar.getAttribute( "data-acao" ) == "editar" ) {
            
            metodo = "PUT";

            // Para atualizar, é necessário id.
            obj.id = id;

        } else if ( btnSalvar.getAttribute( "data-acao" ) == "criar" ) {

            metodo = "POST";

        }

        // Função que é executada após a requisição ter sido completada.
        xhr.onload = function () {

            if ( xhr.status >= 200 && xhr.status < 300 ) {
            // Caso a requisição tenha sido bem sucedida.

                // A requisição retorna um json, com os atributos da operação salva.
                var operacao = JSON.parse( xhr.responseText );

                // A classe Calendar do Java enumera os meses entre 0 e 11. Um ajuste no mês é necessário para continuar.
                operacao.dataInicio.month += 1;

                console.log( "Sucesso: " + xhr.status );
                console.log( xhr.responseText );

                updateTable( operacao, metodo );

            } else {

                console.log( "Falha: " + xhr.status );

            }

        };

        console.log( obj );

        // Configuração e execução da requisição.
        xhr.open( metodo, "/blotter/api/operacoes/", true );
        xhr.setRequestHeader( "Content-Type", "application/json; charset=utf-8" );
        xhr.send( JSON.stringify( obj ) );

        // Esconde o modal, no caso de ter sido bem sucedido.
        $( '#modalEdit' ).modal( 'hide' );

    }
}
// Requisição do tipo DELETE
function deleteOperacao() {

    if ( window.confirm( "Deseja deletar essa operação? Essa ação não poderá ser desfeita" ) ){

        var id = document.getElementById( "form_modal--delete-button" ).getAttribute( "data-delete" ),
        xhr = new XMLHttpRequest();
    
        xhr.onload = function () {

            if ( xhr.status >= 200 && xhr.status < 300 ) {

                console.log( "Sucesso!: " + xhr.status );

                // Esconde o modal, no caso de ter sido bem sucedido.
                $( '#modalEdit' ).modal( 'hide' );

                deleteFromTable( id );

            } else {

                console.log( "Falha!: " + xhr.status );

            }

        }

        xhr.open( "DELETE", "/blotter/api/operacoes/" + id, true );
        xhr.send();
    }

}

// ==== Atualiza tabela de operações ====
// Função para adicionar ou modificar uma linha.
function updateTable( operacao, metodo ) {

    // Existe a necessidade de ter tanto a data no formato brasileiro quanto americano.
    // Isso se deve porque o <input type"date"> utiliza o value no formato americano, mas o sistema utiliza o formato brasileiro.
    var table = document.getElementById( "table_operacoes" ),
        tbody = table.getElementsByTagName( "tbody" )[0],
        dataBr = setDataBr( operacao.dataInicio.dayOfMonth, operacao.dataInicio.month, operacao.dataInicio.year ),
        dataUs = setDataUs( operacao.dataInicio.dayOfMonth, operacao.dataInicio.month, operacao.dataInicio.year );

    if ( metodo == "POST" ) {
    // Essa é a opção cria uma linha nova na tabela, no caso do método ter sido POST.

        var new_tr,
            td_estrategia,
            td_operacao,
            td_dataInicio;

        new_tr = document.createElement( "tr" );
        new_tr.setAttribute( "class", "editavel" );
        new_tr.setAttribute( "data-toggle", "modal" );
        new_tr.setAttribute( "data-target", "#modalEdit" );
        new_tr.setAttribute( "data-id", operacao.id );
        new_tr.setAttribute( "data-operacao", operacao.nome );
        new_tr.setAttribute( "data-estrategia", operacao.estrategia.nome );
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

    } else if ( metodo == "PUT" ) {
    // Essa é a opção edita uma linha da tabela, no caso do método ter sido PUT.

        var tr_update = table.querySelector( "tr[data-id='" + operacao.id + "']" );

        tr_update.getElementsByTagName( "td" )[0].innerHTML = operacao.estrategia.nome;
        tr_update.getElementsByTagName( "td" )[1].innerHTML = operacao.nome;
        tr_update.getElementsByTagName( "td" )[2].innerHTML = dataBr;

        tr_update.setAttribute( "data-inicio", dataUs );
        tr_update.setAttribute( "data-estrategia", operacao.estrategia.nome );
        tr_update.setAttribute( "data-operacao", operacao.nome );

    }

}
// Função para deletar uma linha
function deleteFromTable( id ) {

    var table = document.getElementById( "table_operacoes" );

    tr = table.querySelector( "tr[data-id='" + id + "']" );

    tr.remove();

}

// ==== Config de Datas ====
// Configuração de data brasileira
function setDataBr( dia, mes, ano ) {
    return ( "0" + dia ).slice( -2 ) + "/" + ( "0" + mes ).slice( -2 ) + "/" + ano;
}

// Configuração de data americana
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
    inputValue = document.getElementById( "input_filtra-operacao" ).value
        .toUpperCase().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );

    // Pega a opção de filtro
    select = document.getElementById( "filtro" );

    // Seleciona a tabela
    table = document.getElementById( "table_operacoes" );

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