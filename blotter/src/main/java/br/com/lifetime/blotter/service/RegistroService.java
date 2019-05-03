package br.com.lifetime.blotter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.lifetime.blotter.dao.RegistroDao;
import br.com.lifetime.blotter.model.Registro;

@Service
public class RegistroService {

	@Autowired
	private RegistroDao dao;

	@Autowired
	private ClienteService clienteService;

	@Transactional
	public Boolean insereRegistroUnico(Registro reg) {
		return dao.create(reg);
	}

	@Transactional
	public void salvaRegistro(Registro reg) {
		dao.saveOrUpdate(reg);
	}

	@Transactional
	public Optional<Registro> buscaRegistroUnico(String id) {
		return Optional.ofNullable(dao.get(id));
	}

	@Transactional
	public Boolean atualiza(Registro reg) {
		try {
			dao.update(reg);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
		return true;
	}

	@Transactional
	public Boolean deleta(String id) {
		try {
			Registro reg = dao.get(id);
			dao.delete(reg);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
		return true;
	}

	@Transactional
	public List<Registro> buscaTodos() {
		return dao.getAll();
	}

	@Transactional
	public List<Registro> buscaRegistroPorCliente(Long codigo) {
		return dao.getRegistroByCliente(codigo);
	}

	@Transactional
	public List<Registro> buscaNaoClassificado() {
		return dao.getClassificadoFalse();
	}

	@Transactional
	public void insereLista(List<Registro> lista) {

		for (Registro registro : lista) {

			// if (!Optional.ofNullable(dao.get(registro.getId())).isPresent())
			dao.update(registro);

		}

	}

	@Transactional
	public void atualizaLista(List<Registro> lista) {

		for (Registro registro : lista) {
			Registro velho = dao.get(registro.getId());
			velho.setOperacao(registro.getOperacao());
			velho.setClassificado(true);
//			dao.reset();
		}

	}

	@Transactional
	public void anulaOperacao(Long id) {
		List<Registro> registros = dao.getRegistroByOperacao(id);
		for (Registro registro : registros) {
			registro.setClassificado(false);
			registro.setOperacao(null);
		}
	}

//	public void insereLista(List<Registro> lista) {
//		for (Registro registro : lista) {
//			if (!clienteService.buscaClienteUnico(registro.getCliente().getCodigo()).isPresent()) {
//				clienteService.insereClienteUnico(registro.getCliente());
//			}
//			this.insereRegistroUnico(registro);
//		}
//	}

}
