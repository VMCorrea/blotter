import { Operacao } from "../models/Operacao.js";
import { OperacaoService } from "../services/OperacaoService.js";
import { ListaOperacoes } from "../models/ListaOperacoes.js";
import { OperacaoView } from "../views/OperacaoView.js";
import { Bind } from "../helpers/Bind.js";
import { DateHelper } from "../helpers/DateHelper.js";
import { ListaEstrategias } from "../models/ListaEstrategias.js";
import { ListaEstrategiaView } from "../views/ListaEstrategiaView.js";
import { Estrategia } from "../models/Estrategia.js";
import { EstrategiaService } from "../services/EstrategiaService.js";
import { DisplayHelper } from "../helpers/DisplayHelper.js";
import { NormalizeHelper } from "../helpers/NormalizeHelper.js";

export class OperacaoController {

	constructor() {

		let select = document.querySelector.bind( document );

		// Atributos relacionados ao formulário de envio.
		this._inputSaveBtn = select( "#form_modal--save-button" );
		this._inputNome = select("#form_modal--input-nome");
		this._inputDataInicio = select("#form_modal--input-data");
		this._inputEstrategia = select("#form_modal--input-estrategia");
		this._inputId = select( "#form_modal--input-id" );
		this._modalForm = select( "#form_modal" );
		this._modalLabel = select( "#modalEditLabel" );

		// Atributos relacionados as views.
		this._tbody = select( "#operacaoView" );
		this._dataList = select( "#form_modal--list-estrategias" );

		// Atributos relacionados ao formulário de filtro.
		this._inputFiltro = select( "#input_filtra-operacao" );
		this._inputSelect = select( "#filtro" );
		this._inputFiltroBtn = select( "#btn-filtro" );
		this._formFiltro = select( "#form_busca-operacao" );

		this._inputFiltro.addEventListener( "keyup", e => this._filtro() );
		this._inputFiltroBtn.addEventListener( "click", e => DisplayHelper.display( this._formFiltro ) );

		this._operacaoService = new OperacaoService();

		this._operacoes = new Bind(
			new ListaOperacoes(),
			new OperacaoView( this._tbody ),
			"adiciona", "edita"
		);

		this._estrategias = new Bind(
			new ListaEstrategias(),
			new ListaEstrategiaView( this._dataList ),
			"adiciona"
		);

		this._modalForm.onsubmit = e => this._submit( e );

		$( "#modalEdit" ).on( 
			"show.bs.modal", 
			event => this._modalConfig( event ) );
	}

	/**
	 * Método que busca via HTTP a lista de operações cadastradas no banco, 
	 * adicionando-as na view.
	 */
	buscaOperacoes() {

		this._operacaoService
			.getListaOperacoes()
			.then( operacoes => 
				operacoes.forEach( op => this._operacoes.adiciona( op ) ) )
			.catch( err => alert( err ) );
	}

	/**
	 * Método que busca via HTTP a lista de estratégias cadastradas no banco,
	 * adicionando-as na view.
	 */
	buscaEstrategias() {

		new EstrategiaService()
			.getListEstrategias()
			.then( estrategias => 
				estrategias.forEach( estrategia => this._estrategias.adiciona( estrategia ) ) )
			.catch( erro => alert( erro ) );
	}

	/**
	 *  Verifica se a estratégia passada pelo inputEstrategia existe no datalist.
	 * 
	 * 	@returns {number} Retorna o id da estratégia, ou 0 caso não exista.
	 */
	_validaEstrategia( est ) {

		let list = document.getElementById( "form_modal--list-estrategias" ),
        	options = list.getElementsByTagName( "option" ),
			id = 0;

		for( let option of options ) {

			if ( option.value == est )
				id = option.getAttribute( "data-id" );
		}

		return id;
	}

	/**
	 * Método que verifica se os campos do formuláio não estão vazios.
	 * 
	 * @returns {boolean} Se algum campo estiver vazio retorna false, caso contrário, true.
	 */
	_validaCampos() {

		if ( this._inputNome.value == "" || this._inputEstrategia.value == "" || this._inputDataInicio.value == "" ){

			alert( "Preencha todos os campos!" );
			return false;
		}

		return true;
	}

	/**
	 * Método que configura e envia as operações.
	 * 
	 * @param {*} event Evento de submit do formulário.
	 */
	_submit( event ) {
		
		event.preventDefault();

		let idEstrategia = this._validaEstrategia( this._inputEstrategia.value );

		console.log( idEstrategia );

		if( !this._validaCampos() );
		else if( idEstrategia == 0 ){

			alert( "Estratégia não existe!" );
		} else {

			let estrategia = new Estrategia( idEstrategia, this._inputEstrategia.value ),
				operacao = new Operacao( 
					this._inputId.value, 
					this._inputNome.value, 
					estrategia, 
					DateHelper.stringToDate( this._inputDataInicio.value ) 
				),
				metodo = this._modalForm.getAttribute( "method" ),
				promise;
			
			if( metodo == "POST" ) {

				promise = this._operacaoService
					.postOperacao( operacao )
					.then( res => {
						console.log( res );
						this._operacoes.adiciona( 
							new Operacao( 
								res.id, 
								operacao.nome, 
								operacao.estrategia, 
								operacao.dataInicio 
							) );
					} )
					.catch( err => console.log( err + " POST" ) );
			} else if( metodo == "PUT" ) {

				promise = this._operacaoService
					.putOperacao( operacao )
					.then( res => {
						console.log( res );
						this._operacoes.edita( operacao );
					} )
					.catch( err => console.log( err + " PUT" ) );
			}

			$( "#modalEdit" ).modal( "hide" );
		}	
	}

	/**
	 * Método que filtra as linhas da tabela, 
	 * baseado no valor e nas opções do formulário de busca.
	 */
	_filtro() {

		let inputValue = NormalizeHelper.normalize( this._inputFiltro.value ),
			linhas = this._tbody.getElementsByClassName( "editavel" ),
			filtroOp = this._inputSelect.value;

		for( let linha of linhas ) {

			let cel = linha.getElementsByTagName( "td" )[filtroOp],
				celValue = NormalizeHelper.normalize( cel.textContent );

			if ( celValue.indexOf( inputValue ) > -1 ) {

				linha.style.display = "";
			} else {

				linha.style.display = "none";
			}
		}
	}

	/**
	 * Método que configura o modal, quando ele é chamado.
	 * @param {event} event Evento da aparição do modal.
	 */
	_modalConfig( event ) {
		
		let alvo = $( event.relatedTarget ),
			acao = alvo[0].getAttribute( "data-acao" );
		
		this._modalLabel.innerText = `${ acao } operação`;
		
		if ( acao == "Editar" ) {
			
			this._modalForm.setAttribute( "method", "PUT" );
			
			let id = alvo[0].getAttribute( "data-id" ),
				nome = alvo[0].getAttribute( "data-nome" ),
				estrategia = alvo[0].getAttribute( "data-estrategia" ),
				dataInicio = alvo[0].getAttribute( "data-inicio" );
			
			this._inputId.value = id;
			this._inputNome.value = nome;
			this._inputEstrategia.value = estrategia;
			this._inputDataInicio.value = DateHelper.dateToStringUs( DateHelper.stringToDate( dataInicio ) );

		} else {
			
			this._modalForm.setAttribute( "method", "POST" );
			
			this._inputId.value = "";
			this._inputNome.value = "";
			this._inputEstrategia.value = "";
			this._inputDataInicio.value = "";
		}
	}
}