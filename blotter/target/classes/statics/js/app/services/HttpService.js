export class HttpService {
	
	get( url ) {

		return fetch( url )
			.then( res => this._handleErrors( res ) )
			.then( res => res.json() );
	}
	
	post( url, json ) {

		return fetch( url, {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: json
			} )
			.then( res => this._handleErrors( res ) )
			.then( res => res.text() );
	}
	
	put( url, json ) {
		
		return fetch( url, {
			headers: { "Content-Type": "application/json" },
			method: "PUT",
			body: json
		} )
		.then( res => this._handleErrors( res ) )
		.then( res => res.text() );
	}
	
	_handleErrors( res ) {

		if( !res.ok ) throw new Error( res.statusText );
		return res;
	}
}