package br.com.lifetime.blotter.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
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
		Integer batchSize = 100;

		EntityManagerFactory emf = Persistence.createEntityManagerFactory("blotter");
		EntityManager entityManager = emf.createEntityManager();
		EntityTransaction entityTransaction = entityManager.getTransaction();

		try {
			entityTransaction.begin();

			for (int i = 0; i < lista.size(); i++) {
				if (i > 0 && i % batchSize == 0) {
					entityTransaction.commit();
					entityTransaction.begin();

					entityManager.clear();
				}

				entityManager.persist(lista.get(i));
			}

			entityTransaction.commit();
		} catch (RuntimeException e) {
			if (entityTransaction.isActive()) {
				entityTransaction.rollback();
			}
			throw e;
		} finally {
			entityManager.close();
		}
	}

	@Override
	public void saveOrUpdate(Cliente c) {
		getSession().saveOrUpdate(c);
	}

	private final Session getSession() {
		return this.session.getCurrentSession();
	}

}
