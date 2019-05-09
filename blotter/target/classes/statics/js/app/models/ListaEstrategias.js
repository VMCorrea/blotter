class ListaEstrategias {
	
	constructor( fn ) {
		
		this._fn = fn;
		this._estrategias = [];
	}
	
	adiciona( estrategia ) {
		
		this._estrategias.push( estrategia );
		this._fn( this );
	}
	
	set fn( fn ) {
		
		this._fn = fn; 
	}
	
	get estrategias() {
		
		return [].concat( this._estrategias );
	}
	
	atualizaEstrategia( estrategia ) {
		
		for( let i = 0 ; i < this._estrategias.length ; i++ ) {
			
			if ( this._estrategias[i].id == estrategia.id ) {
				
				this._estrategias[i].nome = estrategia.nome;
				break;
			}
		}
		
		this._fn( this );
	}
}