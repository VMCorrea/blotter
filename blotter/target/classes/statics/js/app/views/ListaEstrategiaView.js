import { View } from "./View.js";

export class ListaEstrategiaView extends View {

    constructor ( element ) {

        super( element );
    }

    template( model ) {

        return `
            ${ model.estrategias.map( est => `
                <option value="${ est.nome }" data-id="${ est.id }" ></option>
            ` ).join( "" ) }
        `;
    }
}