package br.com.lifetime.blotter.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.lifetime.blotter.model.Operacao;

@Repository
public class OperacaoDAO {

	@PersistenceContext
	private EntityManager manager;

	@Transactional
	public void create(Operacao operacao) {
		manager.persist(operacao);
	}

	@Transactional
	public Operacao read(Long id) {
		return manager.find(Operacao.class, id);
	}

	@Transactional
	public void update(Operacao novo) {
		Operacao velho = manager.find(Operacao.class, novo.getId());
		velho.mescla(novo);
	}

	@Transactional
	public void delete(Long id) {
		Operacao operacao = manager.find(Operacao.class, id);
		manager.remove(operacao);
	}

	public List<Operacao> list() {
		String jpql = "select o from Operacao o";
		TypedQuery<Operacao> query = manager.createQuery(jpql, Operacao.class);
		List<Operacao> lista = query.getResultList();
		return lista;
	}

}
