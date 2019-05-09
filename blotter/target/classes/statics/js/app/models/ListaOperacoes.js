class ListaOperacoes {
	
	constructor() {
		
		this._operacoes = [];
	}
	
	adiciona( operacao ) {
		
		this._operacoes.push( operacao );
	}
	
	get operacoes(){
		
		return [].concat( this._operacoes );
	}
}