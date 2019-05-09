class EstrategiaController {
	
	constructor() {
		
		let select = document.querySelector.bind( document );
		
		this._inputSaveBtn = select( "#form_modal--save-button" );
		this._inputName = select( "#form_modal--name-input" );
		this._inputId = select( "#form_modal--id-input" );
		this._modalForm = select( "#form_modal" );
		this._modalLabel = select( "#modalEditLabel" );
		this._tbody = select( "#estrategiaView" );
		
		this._estrategias = new ListaEstrategias( model => console.log( model ) );
		
		this._estrategiasView = new EstrategiaView( this._tbody );
		
		this._modalForm.addEventListener( "submit", event => this._submit( event ) );
		
		$( "#modalEdit" ).on( "show.bs.modal", event => this._modalConfig( event ) );
		
		this._atualizaLista();
		
		this._estrategias.fn = model => this._estrategiasView.update( this._estrategias );
	}
	
	/*
		Método que envia a estratégia via HTTP.
	*/
	_submit( event ) {
		
		event.preventDefault();
		
		if ( this._inputName.value == "" ) {
			
			alert( "Preencha todos os campos!" );
		} else {
		
			let estrategia = new Estrategia( this._inputId.value, this._inputName.value ),
				metodo = this._modalForm.getAttribute( "method" ),
				xhr;
			
			xhr = RequisicaoHelper.configRequest( metodo, "api/estrategias", obj => {
				
				let estrategia = new Estrategia( obj.id, obj.nome );
				
				if( this._modalForm.getAttribute( "method" ) == "POST" ) {
					
					this.add( estrategia );
				} else {
					
					this.update( estrategia );
				}
			} );
			
        	xhr.send( estrategia.toJson() );
			
			$( "#modalEdit" ).modal( "hide" );
		}
	}
	
	add( estrategia ) {
		
		this._estrategias.adiciona( estrategia );
	}
	
	update( estrategia ) {
		
		this._estrategias.atualizaEstrategia( estrategia );
	}
	
	/* 
		Método que configura os campos do modal, quando ele é chamado.
	*/
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
	
	/*	
		Método utilizado ao carregar a página. Ele itera as linhas da tabela de estratégia, 
		para adicionar as estratégias existentes na lista do controller.
	*/
	_atualizaLista() {
		
		let tr = this._tbody.querySelectorAll( "tr" );
		
		for( let i = 0 ; i < tr.length ; i++ ) {
		
			let id = tr[i].getAttribute( "data-id" ),
				nome = tr[i].getAttribute( "data-nome" );
			
			this.add( new Estrategia( id, nome ) );
		}
	}
}