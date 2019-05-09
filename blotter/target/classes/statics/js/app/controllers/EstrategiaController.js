class EstrategiaController {
	
	constructor() {
		
		let select = document.querySelector.bind( document );
		
		this._inputSaveBtn = select( "#form_modal--save-button" );
		this._inputName = select( "#form_modal--name-input" );
		this._inputId = select( "#form_modal--id-input" );
		this._modalForm = select( "#form_modal" );
		this._modalLabel = select( "#modalEditLabel" );
		
		this._estrategias = new ListaEstrategias();
		
		this._estrategiasView = new EstrategiaView( select( "#estrategiaView" ) );
		
		this._modalForm.addEventListener( "submit", event => this._submit( event ) );
		
		$( "#modalEdit" ).on( "show.bs.modal", event => this._modalConfig( event ) );
	}
	
	_submit( event ) {
		
		event.preventDefault();
		
		if ( this._inputName.value == "" ) {
			
			alert( "Preencha todos os campos!" );
		} else {
		
			let estrategia = new Estrategia( this._inputId.value, this._inputName.value ),
				metodo = this._modalForm.getAttribute( "method" ),
				xhr;
			
			xhr = RequisicaoHelper.configRequest( metodo, "api/estrategias", function(){ console.log( "Teste" ) } );
			
        	xhr.send( estrategia.toJson() );
			
			$( "#modalEdit" ).modal( "hide" );
		}
	}
	
	_modalConfig( event ) {
		
		let alvo = $( event.relatedTarget ),
			acao = alvo[0].getAttribute( "data-acao" );
		
		this._modalLabel.innerText = `${ acao } estratégia`;
		
		if ( acao == "Editar" ) {
			
			this._modalForm.setAttribute( "method", "PUT" );
			
			let id = alvo[0].getAttribute( "data-id" ),
				nome = alvo[0].getAttribute( "data-nome" );
			
			this._inputId.value = id;
			this._inputName.value = nome;
		} else {
			
			this._modalForm.setAttribute( "method", "POST" );
			
			this._inputId.value = "";
			this._inputName.value = "";
		}
	}
}