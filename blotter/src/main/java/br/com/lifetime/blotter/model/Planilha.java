package br.com.lifetime.blotter.model;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

/**
 * <h1>Planilha</h1>
 * <p>
 * Classe auxiliar, utilizada para manipular planilhas.
 * </p>
 * 
 * 
 * @author victor.correa
 */
public class Planilha {

	private static SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

	/**
	 * <h2>getRegistros</h2>
	 * <p>
	 * Método estático, que recebe um MultiPartFile - que deve ser um xlsx - faz
	 * conversões e utiliza a biblioteca do Apache POI para extrair os dado em
	 * objetos do tipo {@link Registro}.
	 * </p>
	 * 
	 * @param file Arquivo recebido que deve ser um xlsx.
	 * @return Lista de Registros retirados do arquivo.
	 * @throws InvalidFormatException
	 * @throws IOException
	 */
	public static List<Registro> getRegistros(MultipartFile file) throws InvalidFormatException, IOException {

		// Coleta os dados do MultipartFile, em stream.
		InputStream is = file.getInputStream();

		// Cria um arquivo xlsx vazio.
		File planilha = new File("planilha.xlsx");

		// Salva os dados coletados no arquivo criado.
		FileUtils.copyInputStreamToFile(is, planilha);

		List<Registro> list = new ArrayList<>();

		// Classe do Apache POI para manipulação de planilha Excel
		Workbook workbook = new XSSFWorkbook(planilha);

		Sheet sheet = workbook.getSheetAt(0);

		String situacao;

		for (Row row : sheet) {

			// Variável de texto que recebe o valor de uma célula da planilha, que é
			// utilizada para validar se a linha deve ser ignorada.
			situacao = row.getCell(10).getStringCellValue();

			// Ignora a primeira linha, que contém apenas os cabeçalhos da tabela
			// Ignora caso a situação = C || R
			if (row.getRowNum() > 0 && !situacao.equals("C") && !situacao.equals("R")) {
				try {
					Registro registro = criaRegistro(row);
					list.add(registro);
				} catch (ParseException e) {
					System.out.println("Planilha -> getRegistros(): " + e.getMessage());
					System.out.println("ID: " + row.getCell(16).getStringCellValue());
				}
			}

		}

		workbook.close();

		return list;
	}

	/**
	 * <h2>criaRegistro</h2>
	 * <p>
	 * Método utilizado para preencher os dados de um {@link Registro}, com base nos
	 * valores da linha recebida.
	 * </p>
	 * 
	 * @param row Row da planilha Excel
	 * @return Registro montado.
	 * @throws ParseException
	 */
	private static Registro criaRegistro(Row row) throws ParseException {

		Registro registro = new Registro();

		// Configuração da data
		Date data = format.parse(row.getCell(0).getStringCellValue());
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(data);
		registro.setData(calendar);

		// Configuração dos dados do cliente
		Cliente cliente = new Cliente();
		cliente.setCodigo(Long.parseLong(row.getCell(2).getStringCellValue()));
		cliente.setNome(row.getCell(3).getStringCellValue());
		registro.setCliente(cliente);

		// Config do ativo
		registro.setAtivo(row.getCell(5).getStringCellValue());

		// Config do tipo
		registro.setTipo(row.getCell(6).getStringCellValue());

		// Config da quantidade
		registro.setQuantidade(Integer.parseInt(row.getCell(8).getStringCellValue()));

		// Config do preço.
		String str = row.getCell(9).getStringCellValue().replace(",", ".");
		Double preco = Double.parseDouble(str);
		registro.setPreco(preco);

		// Config do id
		String id = row.getCell(16).getStringCellValue();
		registro.setId(id);

		// Verifica se o Id se enquadra na expressão regular, e define o valor de
		// classificado.
		registro.setClassificado(!id.matches(".*(\\.+A+[0-9]+\\.)+.*"));

		return registro;

	}

}
