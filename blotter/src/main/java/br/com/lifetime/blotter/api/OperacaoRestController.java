package br.com.lifetime.blotter.api;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
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
import br.com.lifetime.blotter.model.Operacao;
import br.com.lifetime.blotter.service.EstrategiaService;
import br.com.lifetime.blotter.service.OperacaoService;

@RestController
@RequestMapping("api/operacoes")
public class OperacaoRestController {

	@Autowired
	private OperacaoService opService;

	@Autowired
	private EstrategiaService estService;

	@GetMapping(value = "/{id}", produces = "application/json")
	public Operacao get(@PathVariable("id") Long id) {

		Operacao op = opService.buscaOperacaoUnica(id).orElse(new Operacao());

		SimpleDateFormat f = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		System.out.println(f.format(op.getDataInicio().getTime()) + "4");

		return op;
	}

	@GetMapping(value = "", produces = "application/json")
	public List<Operacao> get() {
		return opService.buscaLista();
	}

	@PostMapping(value = "")
	public ResponseEntity<String> post(@RequestBody Operacao op) throws URISyntaxException {

		SimpleDateFormat f = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		System.out.println(f.format(op.getDataInicio().getTime()) + "4");

		System.out.println(op.getEstrategia().getId());

		Estrategia est = estService.buscaEstrategiaUnica(op.getEstrategia().getId()).orElse(new Estrategia());

		op.setEstrategia(est);

		opService.insereOperacaoUnica(op);
		URI uri = new URI("blotter/api/operacoes/" + op.getId());
		return ResponseEntity.created(uri).body(op.toJson());

	}

	@PutMapping(value = "")
	public ResponseEntity<String> put(@RequestBody Operacao op) {

		Estrategia est = estService.buscaEstrategiaUnica(op.getEstrategia().getId()).orElse(new Estrategia());

		op.setEstrategia(est);

		opService.atualiza(op);
		return ResponseEntity.ok().body(op.toJson());
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<String> delete(@PathVariable("id") Long id) {
		opService.deleta(id);
		return ResponseEntity.ok().build();
	}

}
