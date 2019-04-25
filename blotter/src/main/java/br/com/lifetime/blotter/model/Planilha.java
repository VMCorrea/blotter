package br.com.lifetime.blotter.model;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.commons.io.FileUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public class Planilha {

	private static SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

	public static List<Registro> getRegistros(MultipartFile file) throws InvalidFormatException, IOException {

		InputStream is = file.getInputStream();

		File planilha = new File("planilha.xlsx");

		FileUtils.copyInputStreamToFile(is, planilha);

		List<Registro> list = new ArrayList<>();

		Workbook workbook = new XSSFWorkbook(planilha);

		Sheet sheet = workbook.getSheetAt(0);

		String situacao;

		for (Row row : sheet) {

			situacao = row.getCell(10).getStringCellValue();

			if (row.getRowNum() > 0 && !situacao.equals("C") && !situacao.equals("R")) {

				try {
					Registro registro = criaRegistro(row);
					list.add(registro);
				} catch (ParseException e) {
					System.out.println("Planilha -> getRegistros(): " + e.getMessage());
				}

			}

		}

		workbook.close();

		return list;
	}

	private static Registro criaRegistro(Row row) throws ParseException {

		Registro registro = new Registro();

		Date data = format.parse(row.getCell(0).getStringCellValue());
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(data);
		registro.setData(calendar);

		Cliente cliente = new Cliente();
		cliente.setCodigo(Long.parseLong(row.getCell(2).getStringCellValue()));
		cliente.setNome(row.getCell(3).getStringCellValue());
		registro.setCliente(cliente);

		registro.setAtivo(row.getCell(5).getStringCellValue());

		registro.setTipo(row.getCell(6).getStringCellValue());

		registro.setQuantidade(Integer.parseInt(row.getCell(8).getStringCellValue()));

		NumberFormat nf = NumberFormat.getInstance(new Locale("Portuguese", "Brazil"));
		Number n = nf.parse(row.getCell(9).getStringCellValue());
		registro.setPreco(n.doubleValue());

		String id = row.getCell(16).getStringCellValue();

		registro.setClassificado(!id.matches(".*(\\.+A+[0-9]+\\.)+.*"));

		registro.setId(id);

		return registro;

	}

}
