<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="java.util.List,java.lang.String,br.com.lifetime.blotter.model.Operacao" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	
	<form:form method="post" action="/blotter/estrategia/busca" modelAttribute="estrategia">
	
		<label for="id">ID: <input type="number" name="id"></label>
		<br>
		<br>
		<button type="submit">Enviar</button>
		
	</form:form>
	
	<c:if test="${ estrategia != null }">
		
		<p>${ estrategia.nome }</p>
		
	</c:if>
</body>
</html>