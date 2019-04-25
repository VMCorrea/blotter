package br.com.lifetime.blotter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.lifetime.blotter.dao.ClienteDao;
import br.com.lifetime.blotter.model.Cliente;

@Service
public class ClienteService {

	@Autowired
	private ClienteDao dao;

	@Transactional
	public Boolean insereClienteUnico(Cliente c) {
		return dao.create(c);
	}

	@Transactional
	public Optional<Cliente> buscaClienteUnico(Long codigo) {
		Cliente c = dao.get(codigo);
		return Optional.ofNullable(c);
	}

	@Transactional
	public void salvaCliente(Cliente cliente) {
		dao.saveOrUpdate(cliente);
	}

	@Transactional
	public Boolean atualiza(Cliente cliente) {
		try {
			dao.update(cliente);
		} catch (Exception e) {
			System.out.println("ClienteService -> atualiza(): " + e.getMessage());
			return false;
		}
		return true;
	}

	@Transactional
	public Boolean deleta(Long codigo) {
		try {
			Cliente cliente = dao.get(codigo);
			dao.delete(cliente);
		} catch (Exception e) {
			System.out.println("ClienteService -> atualiza(): " + e.getMessage());
			return false;
		}
		return true;
	}

	@Transactional
	public List<Cliente> buscaLista() {
		return dao.getAll();
	}

}
