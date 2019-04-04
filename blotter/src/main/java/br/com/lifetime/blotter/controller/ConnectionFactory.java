package br.com.lifetime.blotter.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.mysql.jdbc.PreparedStatement;

/**
 * Classe utilizada para gerenciar as conexões com o banco de dados MySQL.
 * 
 * @author Victor.correa
 */
public class ConnectionFactory {

	private static final String DRIVER = "com.mysql.jdbc.Driver";
	private static final String URL = "jdbc:mysql://192.168.1.4:3306/alocacao?useTimezone=true&serverTimezone=UTC";
	private static final String USER = "alocacao";
	private static final String PASS = "alocacao@2018";

	/**
	 * Classe que valida o driver e conecta ao banco de dados.
	 * 
	 * @return Objeto Connection, com os dados da conexão.
	 */
	public static Connection getConnection() {

		try {

			Class.forName(DRIVER);
			return DriverManager.getConnection(URL, USER, PASS);

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return null;
	}

	/**
	 * Classe que fecha a conexão com o banco de dados.
	 * 
	 * @param con Connection
	 */
	public static void closeConnection(Connection con) {

		try {
			if (con != null)
				con.close();
		} catch (SQLException e) {
			System.out.println("Erro ao fechar Connection: " + e.getMessage());
		}

	}

	/**
	 * Classe que fecha a conexão com o banco de dados.
	 * 
	 * 
	 * @param con  Connection
	 * @param stmt PreparedStatement
	 */
	public static void closeConnection(Connection con, PreparedStatement stmt) {

		closeConnection(con);
		try {
			if (stmt != null)
				stmt.close();
		} catch (SQLException e) {
			System.out.println("Erro ao fechar PreparedStatement: " + e.getMessage());
		}

	}

	/**
	 * Classe que fecha a conexão com o banco de dados.
	 * 
	 * @param con  Connection
	 * @param stmt PreparedStatement
	 * @param rs   ResultSet
	 */
	public static void closeConnection(Connection con, PreparedStatement stmt, ResultSet rs) {

		closeConnection(con, stmt);
		try {
			if (rs != null)
				rs.close();
		} catch (SQLException e) {
			System.out.println("Erro ao fechar PreparedStatement: " + e.getMessage());
		}

	}
}
