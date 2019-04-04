package br.com.lifetime.blotter.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.lifetime.blotter.model.Operacao;

@Controller
public class MainController {

	@GetMapping("/")
	public String index(Model model) {
		System.out.println("Página principal");
		return "home";
	}

	@PostMapping("/")
	public ResponseEntity<HttpStatus> post(@RequestBody Operacao est) {
		return ResponseEntity.ok(HttpStatus.OK);
	}

}
