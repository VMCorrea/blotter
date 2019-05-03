package br.com.lifetime.blotter.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.gson.Gson;

@Entity
public class Estrategia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String nome;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Método que retorna o objeto em uma string no padrão Json
	 * 
	 * @return String json
	 */
	public String toJson() {
		return new Gson().toJson(this);
	}

	public void mescla(Estrategia novo) {

		if (!novo.nome.isEmpty()) {
			this.nome = novo.nome;
		}

	}

}
