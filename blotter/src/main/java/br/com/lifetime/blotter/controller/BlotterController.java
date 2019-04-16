package br.com.lifetime.blotter.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import br.com.lifetime.blotter.dao.OperacaoDAO;
import br.com.lifetime.blotter.model.Operacao;

@Controller
@RequestMapping("blotter")
public class BlotterController {

	@Autowired
	OperacaoDAO opDao;

	@GetMapping("")
	public ModelAndView main() {

		ModelAndView mv = new ModelAndView("blotter/blotter");

		List<Operacao> listOp = opDao.list();

		mv.addObject("operacoes", listOp);

		return mv;

	}

}
