var requisicao = ( function () {

	var xhr = new XMLHttpRequest(), 
		funcao = null,
		parametros = [];

	xhr.onload = function () {

		var resposta = {
			status: xhr.status,
			responseBody: xhr.responseText
		};

		
		parametros.push( resposta );
		
		if ( resposta.status >= 200 && resposta.status < 300 ) {

			console.log( "Sucesso: " + resposta.status );
			console.log( resposta.responseBody );
			
			funcao( parametros );
			
			funcao = null;

		} else {

			console.log( "Falha: " + resposta.status );

		}

	}
	
	var sendPutPost = function( metodo, url, obj, isJson ) {
		
		xhr.open( metodo, url, true );
		
		if ( isJson ){
			
			xhr.setRequestHeader( "Content-Type", "application/json; charset=utf-8" );
			
			obj = JSON.stringify( obj );
			
		} else {
			
			xhr.setRequestHeader( "Content-Type", "false" );
			xhr.setRequestHeader( "cache", "false" );
			xhr.setRequestHeader( "processData", "false" );
			
			
		}
		
		xhr.send( obj );
		
	}
	
	var sendGetDelete = function( metodo, url ) {
		
		xhr.open( metodo, url, true );
		xhr.send( "" );

	}
	
	return {
		
		post: function( url, obj, isJson, f ) {
			
			funcao = f;
			
			sendPutPost( "POST", url, obj, isJson );
			
		},
		put: function( url, obj, isJson, f ) {
			
			funcao = f;
			
			sendPutPost( "PUT", url, obj, isJson );

		},
		get: function( url, f ) {
			
			funcao = f;
			
			sendGetDelete( url );
			
		},
		delete: function( url, f ) {
			
			
			
			
		}
		
	}

})();