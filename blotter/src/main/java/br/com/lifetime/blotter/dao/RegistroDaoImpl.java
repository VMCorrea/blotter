package br.com.lifetime.blotter.dao;

import java.util.List;

import javax.persistence.TypedQuery;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.lifetime.blotter.model.Registro;

@Repository
public class RegistroDaoImpl implements RegistroDao {

	@Autowired
	private SessionFactory session;

	@Override
	public Registro get(String id) {
		return getSession().find(Registro.class, id);
	}

	@Override
	public Boolean create(Registro reg) {
		try {
			getSession().persist(reg);
			getSession().clear();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
		return true;
	}

	@Override
	public void delete(Registro reg) {
		getSession().remove(reg);
	}

	@Override
	public void update(Registro reg) {
		getSession().merge(reg);
	}

	@Override
	public void saveOrUpdate(Registro reg) {
		getSession().saveOrUpdate(reg);
		getSession().flush();
	}

	@Override
	public List<Registro> getRegistroByCliente(Long codigo) {
		String jpql = "select r from Registro r join r.cliente c where c.codigo = :codigo";
		TypedQuery<Registro> query = getSession().createQuery(jpql, Registro.class);
		return query.setParameter("codigo", codigo).getResultList();
	}

	@Override
	public List<Registro> getAll() {
		String jpql = "select r from Registro r";
		TypedQuery<Registro> query = getSession().createQuery(jpql, Registro.class);
		return query.getResultList();
	}

	@Override
	public List<Registro> getClassificadoFalse() {
		String jpql = "select r from Registro r where r.classificado = false";
		TypedQuery<Registro> query = getSession().createQuery(jpql, Registro.class);
		return query.getResultList();
	}

	private final Session getSession() {
		return this.session.getCurrentSession();
	}
}
