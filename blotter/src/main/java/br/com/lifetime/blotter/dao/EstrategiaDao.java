package br.com.lifetime.blotter.dao;

import java.util.List;

import br.com.lifetime.blotter.model.Estrategia;

public interface EstrategiaDao {

	Estrategia get(Long id);

	List<Estrategia> getAll();

	Boolean create(Estrategia estrategia);

	void delete(Estrategia estrategia);

	void update(Estrategia estrategia);

	void bulkInsert(List<Estrategia> list);

	void saveOrUpdate(Estrategia estrategia);

}
