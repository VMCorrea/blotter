package br.com.lifetime.blotter.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.lifetime.blotter.model.Estrategia;
import br.com.lifetime.blotter.model.Operacao;

@Repository
public class EstrategiaDAO {
	
	@PersistenceContext
	private EntityManager manager;

	@Transactional
	public void create(Estrategia est) {
		est.generatePermalink();
		manager.persist(est);
	}

	@Transactional
	public Estrategia read(String permalink) {
		return manager.find(Estrategia.class, permalink);
	}

	@Transactional
	public void delete(String permalink) {
		Estrategia est = manager.find(Estrategia.class, permalink);
		manager.remove(est);
	}

	public List<Estrategia> list() {
		String jpql = "select e from Estrategia e";
		TypedQuery<Estrategia> query = manager.createQuery(jpql, Estrategia.class);
		List<Estrategia> lista = query.getResultList();
		return lista;
	}

	public void update(Estrategia est) {
		Estrategia velho = manager.find(Estrategia.class, est.getPermalink());
		velho.mescla(est);
	}
	
	

}
