export class ListaOperacoes {
	
	constructor() {
		
		this._operacoes = [];
	}
	
	adiciona( operacao ) {
		
		this._operacoes.push( operacao );
	}
	
	get operacoes(){
		
		return [].concat( this._operacoes );
	}

	edita( operacao ) {

		for( let i = 0 ; i < this._operacoes.length ; i++ ) {

			if ( this._operacoes[i].id == operacao.id ) {

				this._operacoes[i].nome = operacao.nome;
				this._operacoes[i].estrategia = operacao.estrategia;
				this._operacoes[i].dataInicio = operacao.dataInicio;
			}
		}
	}
}