package br.com.lifetime.blotter.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.lifetime.blotter.model.Estrategia;

@Repository
public class EstrategiaDAO {
	
	@PersistenceContext
	private EntityManager manager;

	@Transactional
	public void create(Estrategia est) {
		manager.persist(est);
	}
	
	@Transactional
	public Estrategia read(Long id) {
		return manager.find(Estrategia.class, id);
	}

	@Transactional
	public void delete(Long id) {
		Estrategia est = manager.find(Estrategia.class, id);
		manager.remove(est);
	}

	public List<Estrategia> list() {
		String jpql = "select e from Estrategia e";
		TypedQuery<Estrategia> query = manager.createQuery(jpql, Estrategia.class);
		List<Estrategia> lista = query.getResultList();
		return lista;
	}

	@Transactional
	public void update(Estrategia est) {
		Estrategia velho = manager.find(Estrategia.class, est.getId());
		velho.mescla(est);
	}
	
	

}
