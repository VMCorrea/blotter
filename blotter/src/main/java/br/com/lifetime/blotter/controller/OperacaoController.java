package br.com.lifetime.blotter.controller;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import br.com.lifetime.blotter.model.Estrategia;
import br.com.lifetime.blotter.model.Operacao;
import br.com.lifetime.blotter.service.EstrategiaService;
import br.com.lifetime.blotter.service.OperacaoService;

@Controller
@RequestMapping("operacoes")
public class OperacaoController {

	@Autowired
	private OperacaoService opService;

	@Autowired
	private EstrategiaService estService;

	@GetMapping("")
	public ModelAndView main() {
		ModelAndView mv = new ModelAndView("operacao/operacoes");

		List<Operacao> lista = opService.buscaLista();
		List<Estrategia> listaEst = estService.buscaLista();

		lista.sort(Comparator.comparing(Operacao::getId).reversed());

		mv.addObject("operacoes", lista);
		mv.addObject("estrategias", listaEst);

		return mv;
	}

}
