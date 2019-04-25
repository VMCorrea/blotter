package br.com.lifetime.blotter.dao;

import java.util.List;

import javax.persistence.TypedQuery;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.lifetime.blotter.model.Estrategia;

@Repository
public class EstrategiaDaoImpl implements EstrategiaDao {

	@Autowired
	private SessionFactory session;

	@Override
	public List<Estrategia> getAll() {
		String jpql = "select e from Estrategia e";
		TypedQuery<Estrategia> query = getSession().createQuery(jpql, Estrategia.class);
		List<Estrategia> lista = query.getResultList();
		return lista;
	}

	private final Session getSession() {
		return this.session.getCurrentSession();
	}

	@Override
	public Estrategia get(Long id) {
		return getSession().find(Estrategia.class, id);
	}

	@Override
	public Boolean create(Estrategia est) {
		try {
			getSession().persist(est);
		} catch (Exception e) {
			System.out.println("EstrategiaDao -> create(): " + e.getMessage());
			return false;
		}

		return true;
	}

	@Override
	public void delete(Estrategia est) {
		getSession().remove(est);
	}

	@Override
	public void bulkInsert(List<Estrategia> list) {
		// TODO Auto-generated method stub

	}

	@Override
	public void saveOrUpdate(Estrategia est) {
		getSession().saveOrUpdate(est);
	}

	@Override
	public void update(Estrategia est) {
		getSession().merge(est);
	}
}
