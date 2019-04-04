package br.com.lifetime.blotter.controller;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Before;
import org.junit.Test;

import com.mysql.jdbc.PreparedStatement;

public class TestConnectionFactory {

	private Connection con;
	private PreparedStatement stmt;
	private ResultSet rs;

	@Test
	public void testaCriacaoEFechamentoDeConexao() throws SQLException {

		con = ConnectionFactory.getConnection();
		assertFalse(con.isClosed());

		ConnectionFactory.closeConnection(con);
		assertTrue(con.isClosed());
		
	}
	

}
