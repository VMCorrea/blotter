export class DateHelper {
	
	constructor() {
		
		throw new Error( "DateHelper não pode ser instanciada!" );
	}
	
	/**
	 * Método que recebe uma string e transforma em um Date. 
	 * Aceita formato brasileiro e americano de datas.
	 * 
	 * @param {string} texto 
	 */
	static stringToDate( texto ) {

		let fmtUs = /\d{4}-\d{2}-\d{2}/,
			fmtBr = /\d{2}\/\d{2}\/\d{4}/;
		
		if( !fmtUs.test( texto ) && fmtBr.test( texto ) ) {

			let array = texto.split( "/" ),
				aux = [ array[2], array[1], array[0] ];
			
			texto = aux.join( "-" );
		} else if ( !fmtUs.test( texto ) && !fmtBr.test( texto ) ) {

			throw new Error( "Formato de data inválido!" );
		}
		
		return new Date( ...texto.split( "-" ).map( ( item, indice ) => item - indice % 2 ) );
	}
	
	/**
	 * Método que recebe um Date e retorna seu valor em string, no padrão brasileiro de data.
	 * 
	 * @param {Date} data Data que será transformada em texto. 
	 */
	static dateToStringBr( data ) {

		let dia = ( data.getDate() < 10 ? "0" : "" ) + data.getDate(),
			mes = ( ( data.getMonth() + 1 ) < 10 ? "0" : "" ) + ( data.getMonth() + 1 ),
			ano = data.getFullYear();

		return `${ dia }/${ mes }/${ ano }`;	
	}
	
	/**
	 * Método que recebe um Date e retorna seu valor em string, no padrão americano de data.
	 * 
	 * @param {Date} data Data que será transformada em texto. 
	 */
	static dateToStringUs( data ) {

		let dia = ( data.getDate() < 10 ? "0" : "" ) + data.getDate(),
			mes = ( ( data.getMonth() + 1 ) < 10 ? "0" : "" ) + ( data.getMonth() + 1 ),
			ano = data.getFullYear();

		return `${ ano }-${ mes }-${ dia }`;
	}
}