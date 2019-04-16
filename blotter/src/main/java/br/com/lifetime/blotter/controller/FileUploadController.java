package br.com.lifetime.blotter.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("file-upload")
public class FileUploadController {

	@GetMapping("")
	public ModelAndView main() {

		ModelAndView modelAndView = new ModelAndView("teste/file");

		return modelAndView;
	}
	
	@PostMapping("")
	public ResponseEntity<String> upload( @RequestParam("file") MultipartFile file ) {
		
		System.out.println(file.getOriginalFilename());
		
		return ResponseEntity.ok().build();
		
	}

}
