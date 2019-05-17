import {Estrategia} from "../models/Estrategia.js";
import {ListaEstrategias} from "../models/ListaEstrategias.js";
import {EstrategiaService} from "../services/EstrategiaService.js";
import {EstrategiaView} from "../views/EstrategiaView.js";
import {Bind} from "../helpers/Bind.js";

export class EstrategiaController {
	
	constructor() {
		
		let select = document.querySelector.bind( document );
		
		this._inputSaveBtn = select( "#form_modal--save-button" );
		this._inputName = select( "#form_modal--name-input" );
		this._inputId = select( "#form_modal--id-input" );
		this._modalForm = select( "#form_modal" );
		this._modalLabel = select( "#modalEditLabel" );
		this._tbody = select( "#estrategiaView" );
		
		this._estrategiaService = new EstrategiaService();
		
		this._estrategias = new Bind( 
			new ListaEstrategias(), 
			new EstrategiaView( this._tbody ), 
			"adiciona", "edita" );
		
		this._modalForm.addEventListener( 
			"submit", 
			event => this._submit( event ) );
		
		$( "#modalEdit" ).on( 
			"show.bs.modal", 
			event => this._modalConfig( event ) );
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
				promise;

			if ( metodo == "POST" ) {
				
				promise = 
					this._estrategiaService
						.postEstrategia( estrategia )
						.then( response => {
							console.log( response );
							this._estrategias.adiciona( new Estrategia( response.id, response.nome ) );
						} )
						.catch( err => alert( err ) );
			} else {
				
				promise = 
					this._estrategiaService
						.putEstrategia( estrategia )
						.then( response => {
							console.log( response );
							this._estrategias.edita( estrategia );
						} )
						.catch( err => alert( err ) );
			}
			
			$( "#modalEdit" ).modal( "hide" );
		}
	}
	
	/*
		Método para buscar todas as estratégias do banco.
	*/
	buscaEstrategias() {

		let promise = 
				this._estrategiaService
					.getListEstrategias()
					.then( estrategias => 
						  estrategias.forEach( estrategia => this._estrategias.adiciona( estrategia ) ) )
					.catch( erro => alert( erro ) );
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
}