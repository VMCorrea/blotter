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

import br.com.lifetime.blotter.dao.EstrategiaDAO;
import br.com.lifetime.blotter.dao.OperacaoDAO;
import br.com.lifetime.blotter.model.Estrategia;
import br.com.lifetime.blotter.model.Operacao;

@RestController
@RequestMapping("api/operacoes")
public class OperacaoRestController {

	@Autowired
	private OperacaoDAO dao;
	
	@Autowired
	private EstrategiaDAO estDao;

	@GetMapping(value = "/{id}", produces = "application/json")
	public Operacao get(@PathVariable("id") Long id) {
		
		Operacao op = dao.read(id);
		
		SimpleDateFormat f = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		System.out.println(f.format(op.getDataInicio().getTime()) + "4");
		
		return op;
	}

	@GetMapping(value = "", produces = "application/json")
	public List<Operacao> get() {
		return dao.list();
	}

	@PostMapping(value = "")
	public ResponseEntity<String> post(@RequestBody Operacao op) throws URISyntaxException {
		
		SimpleDateFormat f = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		System.out.println(f.format(op.getDataInicio().getTime()) + "4");
		
		System.out.println(op.getEstrategia().getId());
		
		Estrategia est = estDao.read(op.getEstrategia().getId());
		
		op.setEstrategia(est);
		
		dao.create(op);
		URI uri = new URI("blotter/api/operacoes/" + op.getId());
		return ResponseEntity.created(uri).body(op.toJson());
		
	}

	@PutMapping(value = "")
	public ResponseEntity<String> put(@RequestBody Operacao op) {
		
		Estrategia est = estDao.read(op.getEstrategia().getId());
		
		op.setEstrategia(est);
		
		dao.update(op);
		return ResponseEntity.ok().body(op.toJson());
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<String> delete(@PathVariable("id") Long id) {
		dao.delete(id);
		return ResponseEntity.ok().build();
	}

}
