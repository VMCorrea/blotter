class RequisicaoHelper {

	constructor() {

		throw new Error( "RequisicaoHelper não pode ser instanciada!" );
	}

	static configRequest( metodo, url, f ) {

		let xhr = new XMLHttpRequest();

		xhr.onload = function () {

			if ( xhr.status >= 200 && xhr.status < 300 ) {

				let obj = JSON.parse(xhr.responseText);

				console.log( "Sucesso: " + xhr.status );
				console.log( xhr.responseText );

				f();
			} else {
				
				console.log( "Falha: " + xhr.status );
			}
		};

		xhr.open( metodo, url, true );
		xhr.setRequestHeader( "Content-Type", "application/json; charset=utf-8" );
		
		return xhr;
	}
}
