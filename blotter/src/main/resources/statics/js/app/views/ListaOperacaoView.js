import { View } from "./View.js";

export class ListaOperacaoView extends View {

    constructor ( element ) {

        super( element );
    }

    template( model ) {

        return `
            ${ model.operacoes.map( op => `
                <option value="${ op.nome }" data-op="${ op.id }">
            ` ).join( "" ) }
        `;
    }
}