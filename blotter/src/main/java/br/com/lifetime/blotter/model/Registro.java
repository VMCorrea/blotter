package br.com.lifetime.blotter.model;

import java.text.DecimalFormat;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.gson.Gson;

@Entity
public class Registro {

	@Id
	private String id;

	private String ativo;
	private String tipo;
	private Integer quantidade;
	private Double preco;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
	private Calendar data;

	private Boolean classificado;

	@ManyToOne
	private Operacao operacao;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "codigo_cliente")
	private Cliente cliente;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		id = id.replaceAll("-", " ").replaceAll("\\s+", "-").replaceAll("[./:_]", "");
		this.id = Normalizer.normalize(id, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
	}

	public String getAtivo() {
		return ativo;
	}

	public void setAtivo(String ativo) {
		this.ativo = ativo;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public Calendar getData() {
		return data;
	}

	public void setData(Calendar data) {
		this.data = data;
	}

	public Boolean getClassificado() {
		return classificado;
	}

	public void setClassificado(Boolean classificado) {
		this.classificado = classificado;
	}

	public Operacao getOperacao() {
		return operacao;
	}

	public void setOperacao(Operacao operacao) {
		this.operacao = operacao;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public String toJson() {
		return new Gson().toJson(this);
	}

	public String getDataText() {

		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

		return sdf.format(data.getTime());

	}

	public void mescla(Registro novo) {

		this.ativo = novo.ativo;
		this.classificado = novo.classificado;
		this.cliente = novo.cliente;
		this.data = novo.data;
		this.operacao = novo.operacao;
		this.preco = novo.preco;
		this.quantidade = novo.quantidade;
		this.tipo = novo.tipo;

	}

}
