package br.com.lifetime.blotter.controller;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import br.com.lifetime.blotter.dao.EstrategiaDAO;
import br.com.lifetime.blotter.dao.OperacaoDAO;
import br.com.lifetime.blotter.model.Estrategia;
import br.com.lifetime.blotter.model.Operacao;

@Controller
@RequestMapping("operacoes")
public class OperacaoController {

	@Autowired
	private OperacaoDAO dao;
	
	@Autowired
	private EstrategiaDAO estDao;

	@GetMapping("")
	public ModelAndView main() {
		ModelAndView mv = new ModelAndView("operacao/operacoes");

		List<Operacao> lista = dao.list();
		List<Estrategia> listaEst = estDao.list();

		lista.sort(Comparator.comparing(Operacao::getId).reversed());

		mv.addObject("operacoes", lista);
		mv.addObject("estrategias", listaEst);

		return mv;
	}

}
