package br.com.lifetime.blotter.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.lifetime.blotter.model.Cliente;
import br.com.lifetime.blotter.model.Registro;
import br.com.lifetime.blotter.service.ClienteService;
import br.com.lifetime.blotter.service.RegistroService;
/**
 * <h1>ClienteRestController</h1>
 * <p> Classe que implemente as requisições RESTful do model Cliente </p>
 * 
 * @author victor.correa
 *
 */
@RestController
@RequestMapping("api/clientes")
public class ClienteRestController {

	@Autowired
	private ClienteService clienteService;

	@Autowired
	private RegistroService registroService;

	@PostMapping("")
	public ResponseEntity<String> post(@RequestBody Cliente cliente) {

		clienteService.insereClienteUnico(cliente);

		return ResponseEntity.ok().build();
	}

	@GetMapping(value = "/{codigo}", produces = "application/json")
	public List<Cliente> get(@PathVariable Long codigo) {
		Cliente cliente = clienteService.buscaClienteUnico(codigo).orElse(new Cliente());
		List<Cliente> lista = new ArrayList<>(1);
		lista.add(cliente);
		return lista;
	}

	@GetMapping(value = "/{codigo}/registros", produces = "application/json")
	public List<Registro> getClienteRegistro(@PathVariable Long codigo) {
		return registroService.buscaRegistroPorCliente(codigo);
	}

	@GetMapping(value = "", produces = "application/json")
	public List<Cliente> getAll() {
		return clienteService.buscaLista();
	}

}
