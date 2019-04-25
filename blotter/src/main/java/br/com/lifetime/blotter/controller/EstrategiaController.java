package br.com.lifetime.blotter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import br.com.lifetime.blotter.model.Estrategia;
import br.com.lifetime.blotter.service.EstrategiaService;

@Controller
@RequestMapping("estrategias")
public class EstrategiaController {

	@Autowired
	private EstrategiaService estService;

	@GetMapping("")
	public ModelAndView main() {
		ModelAndView mv = new ModelAndView("estrategia/estrategias");

		List<Estrategia> list = estService.buscaLista();

		mv.addObject("estrategias", list);

		return mv;
	}

}
