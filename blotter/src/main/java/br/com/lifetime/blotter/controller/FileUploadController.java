package br.com.lifetime.blotter.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("file-upload")
public class FileUploadController {

//	@Autowired
//	private RegistroService regService;
//
//	@GetMapping("")
//	public ModelAndView main() {
//
//		ModelAndView modelAndView = new ModelAndView("teste/file");
//
//		return modelAndView;
//	}
//
//	@PostMapping("")
//	public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws IOException {
//
//		System.out.println(file.getOriginalFilename());
//
//		InputStream is = file.getInputStream();
//
//		File planilha = new File("planilha.xlsx");
//
//		FileUtils.copyInputStreamToFile(is, planilha);
//
//		System.out.println(planilha.getCanonicalPath());
//
//		try {
//
//			List<Registro> registros = Planilha.getRegistros(planilha);
//
//			File text = new File("texto.txt");
//
//			FileWriter fw = new FileWriter(text);
//			PrintWriter pw = new PrintWriter(fw);
//
//			for (Registro registro : registros) {
//
//				regService.adicionar(registro);
//
//				pw.printf("ID: %s | Cliente: %d - %s | Data: %s | Classificado: %b \n", registro.getId(),
//						registro.getCliente().getCodigo(), registro.getCliente().getNome(), registro.getDataText(),
//						registro.getClassificado());
//				pw.println();
//
//			}
//
//			pw.close();
//
//		} catch (InvalidFormatException e) {
//
//			return ResponseEntity.status(500).build();
//
//		}
//
//		return ResponseEntity.ok().build();
//
//	}

}
