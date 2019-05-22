import { HttpService } from "./HttpService.js";
import { RegistroXp } from "../models/RegistroXp.js";
import { Cliente } from "../models/Cliente.js";

export class RegistroXpService {

    constructor() {

        this._http = new HttpService();
    }

    getNaoClassificados() {

        return new Promise( ( resolve, reject ) => {

            this._http
                .get( "api/registros/classificar" )
                .then( objetos => resolve( objetos.map( o => 
                    new RegistroXp(
                        o.id, 
                        o.ativo,
                        o.tipo,
                        o.quantidade,
                        o.preco,
                        o.data,
                        o.operacao,
                        new Cliente( o.cliente.codigo, o.cliente.nome )
                    ) ) ) )
                .catch( err => {
                    console.log( err );
                    reject( "Não foi possível obter a lista de registros Xp Pro" );
                } );
        } );
    }

    putLista( registros ) {

        return new Promise ( ( resolve, reject ) => {

            this._http
                .put( "api/registros/lista", registros.toJson() )
                .then( res => resolve( res ) )
                .catch( err => {
                    console.log( err );
                    reject( "Não foi possível salvar os registros" );
                } );
        } );
    }

    uploadFile( file ) {

        return new Promise ( ( resolve, reject ) => {

            this._http
                .post( "upload", file )
                .then( res => resolve( 0 ) )
                .catch( err => {
                    console.log( err );
                    reject( "Não foi possível importar arquivo!" );                    
                } );
        } );
    }
}