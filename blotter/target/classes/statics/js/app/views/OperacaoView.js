import {View} from "./View.js";
import { DateHelper } from "../helpers/DateHelper.js";

export class OperacaoView extends View {

    constructor( elemento ) {

        super( elemento );
    }

    template( model ) {

		return `
			${ model.operacoes.map( op => `
                <tr class="editavel" data-toggle="modal" data-target="#modalEdit" data-id="${ op.id }" data-estrategia="${ op.estrategia.nome }" data-nome="${ op.nome }" data-inicio='${ DateHelper.dateToStringUs( op.dataInicio ) }' data-acao="Editar">
                    <td>${ op.estrategia.nome }</td>
                    <td>${ op.nome }</td>
                    <td>${ DateHelper.dateToStringBr( op.dataInicio ) }</td>
                </tr>
			` ).join( "" ) }
		`;
    }
}