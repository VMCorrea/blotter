package br.com.lifetime.blotter.api;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.lifetime.blotter.model.Registro;
import br.com.lifetime.blotter.service.RegistroService;

@RestController
@RequestMapping("api/registros")
public class RegistroRestController {

	@Autowired
	private RegistroService registroService;

	@GetMapping(value = "/{id}", produces = "application/json")
	public Registro get(@PathVariable String id) {
		Registro registro = registroService.buscaRegistroUnico(id).orElse(new Registro());
		registro.getCliente();
		return registro;
	}

	@GetMapping(value = "/classificar", produces = "application/json")
	public List<Registro> getAllClassificadoFalse() {
		return registroService.buscaNaoClassificado();
	}

	@GetMapping(value = "", produces = "application/json")
	public List<Registro> getAll() {
		return registroService.buscaTodos();
	}

	@PostMapping("")
	public ResponseEntity<String> post(@RequestBody Registro registro) throws URISyntaxException {
		registroService.insereRegistroUnico(registro);
		URI uri = new URI("blotter/api/registros/" + registro.getId());
		return ResponseEntity.created(uri).build();
	}
	
}