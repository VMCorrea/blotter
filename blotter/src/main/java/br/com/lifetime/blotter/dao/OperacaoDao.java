package br.com.lifetime.blotter.dao;

import java.util.List;

import br.com.lifetime.blotter.model.Operacao;

public interface OperacaoDao {

	Operacao get(Long id);

	List<Operacao> getAll();

	Boolean create(Operacao operacao);

	void delete(Operacao operacao);

	void update(Operacao operacao);

	void bulkInsert(List<Operacao> list);

	void saveOrUpdate(Operacao operacao);

}
