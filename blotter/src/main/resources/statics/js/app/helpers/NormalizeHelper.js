export class NormalizeHelper {

    constructor() {

        throw new Error( "NormalizeHelper não pode ser instanciado!" );
    }

    static normalize( texto ) {

        return texto
            .toUpperCase()
            .normalize( "NFD" )
            .replace( /[\u0300-\u036f]/g, "" );
    }
}