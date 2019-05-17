export class ListaEstrategias {
	
	constructor() {
		
		this._estrategias = [];
	}
	
	adiciona( estrategia ) {
		
		this._estrategias.push( estrategia );
	}
	
	get estrategias() {
		
		return [].concat( this._estrategias );
	}
	
	edita( estrategia ) {
		
		for( let i = 0 ; i < this._estrategias.length ; i++ ) {
			
			if ( this._estrategias[i].id == estrategia.id ) {
				
				this._estrategias[i].nome = estrategia.nome;
				break;
			}
		}
	}
}