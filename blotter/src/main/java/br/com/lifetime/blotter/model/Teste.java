package br.com.lifetime.blotter.model;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Teste {

	public static void main(String[] args) {
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("blotter");
		
		EntityManager manager = emf.createEntityManager();
		
		manager.getTransaction().begin();
		
		Estrategia est = manager.find(Estrategia.class, "cart-dividendos");
		
		est.setNome("Cart Dividendos");
		
		manager.getTransaction().commit();
		
		manager.close();
		emf.close();
		
		
	}
}
