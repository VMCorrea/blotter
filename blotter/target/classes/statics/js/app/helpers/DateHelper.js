class DateHelper {
	
	constructor() {
		
		throw new Error( "DateHelper não pode ser instanciada!" );
		
	}
	
	static stringToDate( texto ) {
		
		if( !/\d{4}-\d{2}-\d{2}/.test( texto ) )
			throw new Error( "Data deve estar no formato yyyy-MM-dd" );
		
		return new Date( ...texto.split( "-" ).map( ( item, indice ) => item - indice % 2 ) );
	}
	
	static dateToStringBr( data ) {
		return `${ data.getDate() }/${ data.getMonth() + 1 }/${ data.getFullYear() }`;	
	//	return data.getDate() + "/" + ( data.getMonth() + 1 ) + "/" + data.getFullYear();
	}
	
	static dateToStringUs( data ) {
		return `${ data.getFullYear() }/${ data.getMonth() + 1 }/${ data.getDate() }`;
	//	return data.getFullYear() + "-" + ( data.getMonth() + 1 ) + "-" + data.getDate();
	}
	
}