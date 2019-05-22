import { View } from "./View.js";

export class RegistroXpView extends View {

    constructor( element ) {

        super( element );
    }

    template( model ) {

        return `
            ${ model.registros.map( reg => `
                <tr class="text-center" data-registro="${ reg.id }">
                    <td> <input type="checkbox"> </td>
                    <td class="td-200 py-0"> <input class="form-control table_td--input-operacao" type="text" list="table_input--list-operacoes"> </td>
                    <td class="td-300"> ${ reg.cliente.nome } </td>
                    <td> ${ reg.ativo } </td>
                    <td> ${ reg.tipo } </td>
                    <td> ${ reg.quantidade } </td>
                    <td> ${ reg.preco } </td>
                    <td> ${ reg.cliente.codigo } </td>
                    <td class="td-200"> ${ reg.data } </td>
                </tr> 
            ` ).join( "" ) }
        `;
    }
}