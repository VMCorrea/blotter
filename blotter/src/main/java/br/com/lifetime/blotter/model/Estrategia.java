package br.com.lifetime.blotter.model;

import java.text.Normalizer;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.google.gson.Gson;

@Entity
public class Estrategia {

	@Id
	private String permalink;
	private String nome;

	public Estrategia() {
	}

	public Estrategia(String nome) {

		this.nome = nome;
		this.generatePermalink();

	}

	public String getPermalink() {
		return permalink;
	}

	public void setPermalink(String permalink) {
		this.permalink = permalink;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	/**
	 * M�todo que retorna o objeto em uma string no padr�o Json
	 * 
	 * @return String json
	 */
	public String toJson() {
		return new Gson().toJson(this);
	}

	public void mescla(Estrategia novo) {

		if (!novo.nome.isEmpty()) {
			this.nome = novo.nome;
			this.generatePermalink();
		}

	}

	public void generatePermalink() {

		// Remove espa�os e m�ltiplos '-' por apenas um '-', depois transforma tudo em
		// min�sculas.
		this.permalink = this.nome.replaceAll("-", " ").replaceAll("\\s+", "-").toLowerCase();

		// Remove acentos e caracteres especiais, "normalizando-os".
		this.permalink = Normalizer.normalize(permalink, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");

	}

}
