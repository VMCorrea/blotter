export class Estrategia {

	constructor( id, nome ) {
		
		this._id = id;
		this.nome = nome;
	}

	get id() {
		
		return this._id;
	}

	toJson() {

		var obj = {
			id: this._id,
			nome: this.nome
		};

		return JSON.stringify( obj );
	}
}