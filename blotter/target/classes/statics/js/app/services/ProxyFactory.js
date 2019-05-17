export class ProxyFactory {
	
	static create( objeto, props, acao ) {
		
		return new Proxy( objeto, {
			
			get( target, prop, receiver ) {
				
				if( props.includes( prop ) && ProxyFactory._isFunction( target[prop] ) ) {
					
					return function() {
						
						console.log( `Interceptando ${ prop }` );
						Reflect.apply( target[prop], target, arguments );
						return acao( target );
					};
				}
				
				return Reflect.get( target, prop, receiver );
			},
			
			set( target, prop, value, receiver ) {
				
				if( props.includes( prop ) ) {
					
					target[prop] = value;
					acao( target );
				}
				
				return Reflect.set( target, prop, value, receiver );
			}
		} );
	}
	
	static _isFunction( fn ) {
		
		return typeof( fn ) == typeof( Function );
	}
}