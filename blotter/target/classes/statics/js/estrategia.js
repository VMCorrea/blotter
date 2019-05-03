window.onload = function () {

    document.getElementById( "form_modal--save-button" ).addEventListener( "click", sendEstrategia );

//    document.getElementById( "form_modal--delete-button" ).addEventListener( "click", deleteEstrategia );

};

// ==== MODAL DE EDIÇÃO/CRIAÇÃO DE OPERAÇÕES ====
// Necessário usar JQuery, por causa do Bootstrap
$( "#modalEdit" ).on( "show.bs.modal", function ( event ) {

    var linha = $( event.relatedTarget ),
        acao = linha.data( "acao" ),
        modal = $( this ),
        btnSalvar = document.getElementById( "form_modal--save-button" ),
        btnDeletar = document.getElementById( "form_modal--delete-button" );

    modal.find( "#modalEditLabel" ).text( acao + " estratégia" );

    if ( acao == "Editar" ) { 
    // Opção em que o modal é utilizado para editar uma operação. 
    // Ele traz os dados e preenche os campos automaticamente.

        // Existe um problema de 'cache' ao pegar atributos via JQuery. Mesmo os atributos sendo atualizados o JQuery pegava os valores antigos.
        var id = linha[0].getAttribute( "data-id" ),
            nome = linha[0].getAttribute( "data-nome" );

        // Setando o atributo que é utilizado para definir a ação que o botão SALVAR vai executar.
        btnSalvar.setAttribute( "data-acao", "editar" );

        // Setando o id da operação no botão DELETAR e o ativa.
        // btnDeletar.setAttribute( "data-delete", id );
 //       btnDeletar.disabled = false;

        // Preenchimento dos campos.
        modal.find( "#form_modal--name-input" ).val( nome );
        modal.find( "#form_modal--id-input" ).val( id );

    } else { 
    // Opção em que o modal é utilizado para criar uma operação.
    // Os campos são esvaziados. 
    
        // Esvaziando os campos.
        modal.find( "#form_modal--name-input" ).val( "" );

        // Setando o atributo que é utilizado para definir a ação que o botão vai executar.
        btnSalvar.setAttribute( "data-acao", "criar" );

 //       btnDeletar.disabled = true;
    }
});

// ==== Requisições ====
// Função que envia a operação, para criar ou atualizar, através de requisições assíncronas.
function sendEstrategia() {

    var btnSalvar = document.getElementById( "form_modal--save-button" ),
        nome = document.getElementById( "form_modal--name-input" ).value, 
        id = document.getElementById( "form_modal--id-input" ).value;


    if ( nome == "" ) {
    // Verifica se os campos foram preenchidos.

        alert( "Preencha todos os campos!" );

    } else {

        var obj = {
                nome: nome,
                id: id
            },
            xhr = new XMLHttpRequest(),
            metodo = "";


        // if else que pega o atributo do botão salvar, e baseado nisso define o método que será usado na requisição.
        if ( btnSalvar.getAttribute( "data-acao" ) == "editar" ) {
            
            metodo = "PUT";

            // Para atualizar, é necessário permalink.
            obj.id = id;

        } else if ( btnSalvar.getAttribute( "data-acao" ) == "criar" ) {

            metodo = "POST";

        }

        // Função que é executada após a requisição ter sido completada.
        xhr.onload = function () {

            if ( xhr.status >= 200 && xhr.status < 300 ) {
            // Caso a requisição tenha sido bem sucedida.

                // A requisição retorna um json, com os atributos da operação salva.
                var estrategia = JSON.parse( xhr.responseText );

                console.log( "Sucesso: " + xhr.status );
                console.log( xhr.responseText );

                updateTable( estrategia, metodo );

            } else {

                console.log( "Falha: " + xhr.status );

            }

        };

        console.log( obj );

        // Configuração e execução da requisição.
        xhr.open( metodo, "/blotter/api/estrategias/", true );
        xhr.setRequestHeader( "Content-Type", "application/json; charset=utf-8" );
        xhr.send( JSON.stringify( obj ) );

        // Esconde o modal, no caso de ter sido bem sucedido.
        $( '#modalEdit' ).modal( 'hide' );

    }
}
// Requisição do tipo DELETE
/*
function deleteEstrategia() {

    if ( window.confirm( "Deseja deletar essa estratégia? Essa ação não poderá ser desfeita." ) ){

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

        xhr.open( "DELETE", "/blotter/api/estrategias/" + id, true );
        xhr.send();
    }

}
*/

// ==== Atualiza tabela de operações ====
// Função para adicionar ou modificar uma linha.
function updateTable( estrategia, metodo ) {

    // Existe a necessidade de ter tanto a data no formato brasileiro quanto americano.
    // Isso se deve porque o <input type"date"> utiliza o value no formato americano, mas o sistema utiliza o formato brasileiro.
    var table = document.getElementById( "table_estrategias" ),
        tbody = table.getElementsByTagName( "tbody" )[0];

    if ( metodo == "POST" ) {
    // Essa é a opção cria uma linha nova na tabela, no caso do método ter sido POST.

        var new_tr,
            td;

        new_tr = document.createElement( "tr" );
        new_tr.setAttribute( "class", "editavel" );
        new_tr.setAttribute( "data-toggle", "modal" );
        new_tr.setAttribute( "data-target", "#modalEdit" );
        new_tr.setAttribute( "data-id", estrategia.id );
        new_tr.setAttribute( "data-nome", estrategia.nome );
        new_tr.setAttribute( "data-acao", "Editar" );

        td = document.createElement( "td" );

        td.innerHTML = estrategia.nome;

        new_tr.appendChild( td );

        tbody.insertBefore( new_tr, tbody.firstElementChild );

    } else if ( metodo == "PUT" ) {
    // Essa é a opção edita uma linha da tabela, no caso do método ter sido PUT.

        var tr_update = table.querySelector( "tr[data-id='" + estrategia.id + "']" );

        tr_update.getElementsByTagName( "td" )[0].innerHTML = estrategia.nome;

        tr_update.setAttribute( "data-nome", estrategia.nome );
        tr_update.setAttribute( "data-permalink", estrategia.id );

    }

}
// Função para deletar uma linha
function deleteFromTable( id ) {

    var table = document.getElementById( "table_estrategias" );

    tr = table.querySelector( "tr[data-id='" + id + "']" );

    tr.remove();

}