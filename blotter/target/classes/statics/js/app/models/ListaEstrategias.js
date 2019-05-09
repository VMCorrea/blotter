class ListaEstrategias {
	
	constructor() {
		
		this._estrategias = [];
	}
	
	adiciona( estrategia ) {
		
		this._estrategias.push( estrategia );
	}
	
	get estrategias() {
		
		return [].concat( this._estrategias );
	}
}