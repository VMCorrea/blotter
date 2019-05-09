class OperacaoController {

	constructor() {

		let select = document.querySelector.bind( document );

		this._inputNome = select("#nome");
		this._inputDataInicio = select("#dataInicio");
		this._inputEstrategia = select("#idEst");

	}


	adiciona( event ) {
		
		event.preventDefault();

		let estrategia = new Estrategia( this._inputEstrategia.value, "Estrategia 1" );

		let data = DateHelper.stringToDate( this._inputDataInicio.value );

		let operacao = new Operacao( 0, this._inputNome.value, estrategia, data );

		console.log( operacao.toJson() );

	}

}
