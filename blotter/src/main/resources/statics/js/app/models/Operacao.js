import { Estrategia } from "./Estrategia.js";
import { DateHelper } from "../helpers/DateHelper.js";

export class Operacao {

	constructor( id, nome, estrategia, dataInicio ) {
		
		this._id = id;
		this.nome = nome;
		this.estrategia = new Estrategia( estrategia.id, estrategia.nome );
		this.dataInicio = new Date( dataInicio.getTime() );
	}

	get id() {

		return this._id;
	}

	toJson() {

		var obj = {
			id: this._id,
			nome: this.nome,
			estrategia: {
				id: this.estrategia.id,
				nome: this.estrategia.nome
			},
			dataInicio: DateHelper.dateToStringBr( this.dataInicio )
		};

		return JSON.stringify( obj );
	}
}
