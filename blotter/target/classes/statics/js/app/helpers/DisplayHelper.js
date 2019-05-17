export class DisplayHelper {

    constructor() {

        throw new Error( "DisplayHelper não pode ser instanciado!" );
    }

    static display( elemento ) {

        if ( elemento.classList.contains( "d-none" ) ) {

            elemento.classList.remove( "d-none" );
        } else {

            elemento.classList.add( "d-none" );
        }
    }   
}

