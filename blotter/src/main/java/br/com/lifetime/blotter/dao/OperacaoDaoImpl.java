package br.com.lifetime.blotter.dao;

import java.util.List;

import javax.persistence.TypedQuery;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.lifetime.blotter.model.Operacao;

@Repository
public class OperacaoDaoImpl implements OperacaoDao {

	@Autowired
	private SessionFactory session;

	private final Session getSession() {
		return this.session.getCurrentSession();
	}

	@Override
	public Operacao get(Long id) {
		return getSession().find(Operacao.class, id);
	}

	@Override
	public List<Operacao> getAll() {
		String jpql = "select o from Operacao o";
		TypedQuery<Operacao> query = getSession().createQuery(jpql, Operacao.class);
		List<Operacao> lista = query.getResultList();
		return lista;
	}

	@Override
	public Boolean create(Operacao op) {
		try {
			getSession().persist(op);
		} catch (Exception e) {
			System.out.println("OperacaoDao -> create(): " + e.getMessage());
			return false;
		}
		return true;
	}

	@Override
	public void delete(Operacao op) {
		getSession().remove(op);
	}

	@Override
	public void update(Operacao op) {
		getSession().merge(op);
	}

	@Override
	public void bulkInsert(List<Operacao> list) {
		// TODO Auto-generated method stub

	}

	@Override
	public void saveOrUpdate(Operacao op) {
		getSession().saveOrUpdate(op);
	}

}
