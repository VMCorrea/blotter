package br.com.lifetime.blotter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import br.com.lifetime.blotter.dao.EstrategiaDAO;
import br.com.lifetime.blotter.model.Estrategia;

@Controller
@RequestMapping("estrategias")
public class EstrategiaController {

	@Autowired
	EstrategiaDAO dao;
	
	@GetMapping("")
	public ModelAndView main() {
		ModelAndView mv = new ModelAndView("estrategia/estrategias");
		
		List<Estrategia> list = dao.list();
		
		mv.addObject("estrategias", list);
		
		return mv;
	}
	
	
}
