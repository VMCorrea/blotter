package br.com.lifetime.blotter.controller;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import br.com.lifetime.blotter.model.Operacao;
import br.com.lifetime.blotter.model.Planilha;
import br.com.lifetime.blotter.model.Registro;
import br.com.lifetime.blotter.service.OperacaoService;
import br.com.lifetime.blotter.service.RegistroService;

@Controller
@RequestMapping("/")
public class BlotterController {

	@Autowired
	private OperacaoService opService;

	@Autowired
	private RegistroService regService;

//	@Autowired
//	private ClienteService clienteService;

	@GetMapping("")
	public ModelAndView main() {

		ModelAndView mv = new ModelAndView("blotter/blotter");

		List<Operacao> listOp = opService.buscaLista();
		List<Registro> regList = regService.buscaNaoClassificado();
		regList.sort(Comparator.comparing(Registro::getData).reversed());

		mv.addObject("operacoes", listOp);
		mv.addObject("registros", regList);

		return mv;

	}

	@PostMapping("upload")
	public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {

		try {
			List<Registro> lista = Planilha.getRegistros(file);
			regService.insereLista(lista);
		} catch (InvalidFormatException | IOException e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}

		return ResponseEntity.ok().build();
	}

}
