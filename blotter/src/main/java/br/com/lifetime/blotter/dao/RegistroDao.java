package br.com.lifetime.blotter.dao;

import java.util.List;

import br.com.lifetime.blotter.model.Registro;

public interface RegistroDao {

	Registro get(String id);

	Boolean create(Registro registro);

	void delete(Registro registro);

	void update(Registro registro);

	void saveOrUpdate(Registro registro);

	List<Registro> getAll();
	
	List<Registro> getRegistroByCliente(Long codigo);

	List<Registro> getClassificadoFalse();

}
