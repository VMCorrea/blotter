<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<form:form method="post" action="/blotter/estrategia" modelAttribute="estrategia">
	
		<label for="nome">Nome: <input type="text" name="nome"></label>
		<br>
		<br>
		<label for="operacao">Operação: <input type="text" name="operacao"></label>
		<br>
		<br>
		<button type="submit">Enviar</button>
	</form:form>
</body>
</html>