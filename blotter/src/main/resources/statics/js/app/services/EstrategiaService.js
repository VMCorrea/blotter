import {HttpService} from "./HttpService.js";
import {Estrategia} from "../models/Estrategia.js";

export class EstrategiaService {
	
	constructor() {
		
		this._httpService = new HttpService();
	}
	
	getListEstrategias(){
		
		return new Promise( ( resolve, reject ) => {
			
			this._httpService
				.get( "api/estrategias" )
				.then( objetos => resolve( objetos.map( objeto => new Estrategia( objeto.id, objeto.nome ) ) ) )
				.catch( err => {
					console.log( err );
					reject( "Não foi possível obter a lista de estratégias." );
				} );
		} );
	}
	
	postEstrategia( estrategia ) {
		
		return new Promise( ( resolve, reject ) => {
			
			this._httpService
				.post( "api/estrategias", estrategia.toJson() )
				.then( response => resolve( JSON.parse( response ) ) )
				.catch( err => {
				
					console.log( err );
					reject( "Não foi possível adicionar estratégia." );
				} );
		} );
	}
	
	putEstrategia( estrategia ) {
		
		return new Promise( ( resolve, reject ) => {
			
			this._httpService
				.put( "api/estrategias", estrategia.toJson() )
				.then( response => resolve( JSON.parse( response ) ) )
				.catch( err => {
					console.log( err );
					reject( "Não foi possível adicionar estratégia." );
				} );
		} );
	}
}