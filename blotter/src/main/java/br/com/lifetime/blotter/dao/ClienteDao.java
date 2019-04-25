package br.com.lifetime.blotter.dao;

import java.util.List;

import br.com.lifetime.blotter.model.Cliente;

public interface ClienteDao {
	
	Cliente get(Long id);
	List<Cliente> getAll();
	Boolean create(Cliente cliente);
	void delete(Cliente cliente);
	void update(Cliente cliente);
	void bulkInsert(List<Cliente> list);
	void saveOrUpdate(Cliente cliente);
	
}
