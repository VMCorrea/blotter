import {HttpService} from "./HttpService.js";
import {Operacao} from "../models/Operacao.js";
import { Estrategia } from "../models/Estrategia.js";
import { DateHelper } from "../helpers/DateHelper.js";

export class OperacaoService {

    constructor() {
        
        this._http = new HttpService();
    }

    getListaOperacoes() {

        return new Promise( ( resolve, reject ) => {

            this._http
                .get( "api/operacoes" )
                .then( objetos => resolve( objetos.map( o => 
                    new Operacao( 
                        o.id, 
                        o.nome, 
                        new Estrategia( o.estrategia.id, o.estrategia.nome ), 
                        DateHelper.stringToDate( o.dataInicio ) 
                        ) ) ) )
                .catch( err => {
                    console.log( err );
                    reject( "Não foi possível obter a lista de operações." );
                } );
        } );
    }

    postOperacao( operacao ) {

        return new Promise( ( resolve, reject ) => {

            this._http
                .post( "api/operacoes", operacao.toJson() )
                .then( res => resolve( JSON.parse( res ) ) )
                .catch( err => {

                    console.log( err );
                    reject( "Não foi possível adicionar operação." );
                } );
        } );
    }

    putOperacao( operacao ) {

        return new Promise( ( resolve, reject ) => {

            this._http
                .put( "api/operacoes", operacao.toJson() )
                .then( res => resolve( JSON.parse( res ) ) )
                .catch( err => {

                    console.log( err );
                    reject( "Não foi possível editar operação." );
                } );
        } );
    }
}