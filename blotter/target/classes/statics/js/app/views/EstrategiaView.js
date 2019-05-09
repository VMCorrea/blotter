class EstrategiaView extends View {
	
	constructor( elemento ) {
		
		super( elemento );
	}

	template( model ) {

		return `
		${ model.estrategias.map( est => `
			<tr class="editavel" data-toggle="modal" data-target="#modalEdit" data-id="${ est.id }" data-nome="${ est.nome }" data-acao="Editar">
				<td>${ est.nome }</td>
			</tr>
		` ).join( "" ) }
		`;
	}
}
