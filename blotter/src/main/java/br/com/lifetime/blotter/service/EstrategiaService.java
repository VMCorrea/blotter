package br.com.lifetime.blotter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.lifetime.blotter.dao.EstrategiaDao;
import br.com.lifetime.blotter.model.Estrategia;

@Service
public class EstrategiaService {

	@Autowired
	private EstrategiaDao dao;

	@Transactional
	public Boolean insereEstrategiaUnica(Estrategia est) {
		return dao.create(est);
	}

	@Transactional
	public Optional<Estrategia> buscaEstrategiaUnica(Long id) {
		return Optional.ofNullable(dao.get(id));
	}

	@Transactional
	public Boolean atualiza(Estrategia est) {
		try {
			dao.update(est);
		} catch (Exception e) {
			System.out.println("EstrategiaService -> atualiza(): " + e.getMessage());
		}
		return true;
	}
	
	@Transactional
	public Boolean deleta(Long id) {
		try {
			Estrategia est = dao.get(id);
			dao.delete(est);
		} catch (Exception e) {
			System.out.println("EstrategiaService -> deleta(): " + e.getMessage());
			return false;
		}
		return true;
	}
	
	@Transactional
	public List<Estrategia> buscaLista() {
		return dao.getAll();
	}
}
