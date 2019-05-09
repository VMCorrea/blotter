class Operacao {

	constructor(id, nome, estrategia, dataInicio) {
		this._id = id;
		this._nome = nome;
		this._estrategia = new Estrategia( estrategia.id, estrategia.nome );
		this._dataInicio = new Date( dataInicio.getTime() );
		Object.freeze(this);
	}

	get nome() {
		return this._nome;
	}

	get id() {
		return this._id;
	}
	
	get estrategia(){
		return new Estrategia( this._estrategia.id, this._estrategia.nome );
	}
	
	get dataInicio(){
		return new Date( this._dataInicio.getTime() );
	}

	toJson() {

		var obj = {
			id: this._id,
			nome: this._nome,
			estrategia: {
				id: this._estrategia.id,
				nome: this._estrategia.nome
			},
			dataInicio: DateHelper.dateToStringBr( this.dataInicio )
		};

		return JSON.stringify(obj);
	}

}
