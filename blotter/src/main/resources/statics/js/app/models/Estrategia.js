class Estrategia {

	constructor(id, nome) {
		this._id = id;
		this._nome = nome;
		Object.freeze(this);
	}

	get nome() {
		return this._nome;
	}

	get id() {
		return this._id;
	}

	toJson() {

		var obj = {
			id: this._id,
			nome: this._nome
		};

		return JSON.stringify(obj);
	}

}
