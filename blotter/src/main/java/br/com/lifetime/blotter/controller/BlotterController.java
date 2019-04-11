package br.com.lifetime.blotter.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("blotter")
public class BlotterController {

	@GetMapping("")
	public ModelAndView main() {
		
		ModelAndView mv = new ModelAndView("blotter/blotter");
		
		return mv;
		
	}
	
	
}
