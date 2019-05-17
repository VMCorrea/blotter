package br.com.lifetime.blotter.api;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.lifetime.blotter.model.Estrategia;
import br.com.lifetime.blotter.service.EstrategiaService;

@RestController
@RequestMapping("api/estrategias")
public class EstrategiaRestController {

	@Autowired
	private EstrategiaService estService;

	@GetMapping(value = "/{id}", produces = "application/json")
	public Estrategia get(@PathVariable("id") Long id) {
		return estService.buscaEstrategiaUnica(id).orElse(new Estrategia());
	}

	@GetMapping(value = "", produces = "application/json")
	public List<Estrategia> get() {
		return estService.buscaLista();
	}

	@PostMapping(value = "")
	public ResponseEntity<String> post(@RequestBody Estrategia est) throws URISyntaxException {

		estService.insereEstrategiaUnica(est);
		URI uri = new URI("blotter/api/estrategias/" + est.getId());
		return ResponseEntity.created(uri).body(est.toJson());
	}

	@PostMapping(value = "/lista")
	public ResponseEntity<String> cadastraLista(@RequestBody List<Estrategia> list) {

		for (Estrategia estrategia : list) {
			estService.insereEstrategiaUnica(estrategia);
		}

		return ResponseEntity.ok().build();
	}

	@PutMapping(value = "")
	public ResponseEntity<String> put(@RequestBody Estrategia est) {
		System.out.println(est.getId());
		estService.atualiza(est);
		return ResponseEntity.ok().body(est.toJson());
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<String> delete(@PathVariable("id") Long id) {
		estService.deleta(id);
		return ResponseEntity.ok().build();
	}

}
