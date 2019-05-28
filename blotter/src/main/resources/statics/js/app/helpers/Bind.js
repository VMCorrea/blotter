import { ProxyFactory } from "../services/ProxyFactory.js";

/**
 * Classe que ao ser instanciada retorna o Proxy do modelo passado.
 * 
 */
export class Bind {
	
	constructor( model, view, ...props ) {
		
		let proxy = ProxyFactory.create( model, props, model => view.update( model ) );
		
		view.update( model );
		
		return proxy;
	}
}