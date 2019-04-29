package br.com.lifetime.blotter.dao;

import java.util.List;

import javax.persistence.TypedQuery;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.lifetime.blotter.model.Cliente;

@Repository
public class ClienteDaoImpl implements ClienteDao {

	@Autowired
	private SessionFactory session;

	@Override
	public Cliente get(Long codigo) {
		Cliente cliente = getSession().find(Cliente.class, codigo);
		Hibernate.initialize(cliente.getRegistros());
		return cliente;
	}

	@Override
	public List<Cliente> getAll() {
		String jpql = "select c from Cliente c";
		TypedQuery<Cliente> query = getSession().createQuery(jpql, Cliente.class);
		return query.getResultList();
	}

	@Override
	public Boolean create(Cliente c) {
		try {
			getSession().persist(c);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public void delete(Cliente c) {
		getSession().remove(c);
	}

	@Override
	public void update(Cliente c) {
		getSession().merge(c);
	}

	@Override
	public void bulkInsert(List<Cliente> lista) {

	}

	@Override
	public void saveOrUpdate(Cliente c) {
		getSession().saveOrUpdate(c);
	}

	private final Session getSession() {
		return this.session.getCurrentSession();
	}

}
