package br.com.lifetime.blotter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.lifetime.blotter.dao.OperacaoDao;
import br.com.lifetime.blotter.model.Operacao;

@Service
public class OperacaoService {

	@Autowired
	private OperacaoDao dao;

	@Transactional
	public Boolean insereOperacaoUnica(Operacao op) {
		return dao.create(op);
	}

	@Transactional
	public Optional<Operacao> buscaOperacaoUnica(Long id) {
		return Optional.ofNullable(dao.get(id));
	}

	@Transactional
	public Boolean atualiza(Operacao op) {
		try {
			dao.update(op);
		} catch (Exception e) {
			System.out.println("OperacaoService -> atualiza(): " + e.getMessage());
			return false;
		}
		return true;
	}

	@Transactional
	public Boolean deleta(Long id) {
		try {
			Operacao op = dao.get(id);
			dao.delete(op);
		} catch (Exception e) {
			System.out.println("OperacaoService -> deleta(): " + e.getMessage());
		}
		return true;
	}

	@Transactional
	public List<Operacao> buscaLista() {
		return dao.getAll();
	}
}
