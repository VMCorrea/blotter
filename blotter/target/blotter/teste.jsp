<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.List,br.com.lifetime.blotter.model.Operacao" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<c:url value="resources/css" var="cssPath"></c:url>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="${ cssPath }/style.css">
    <title>Blotter</title>
</head>

<body>

<c:forEach items="${ estrategias }" var="estrategia">

${ estrategia.nome }

</c:forEach>
   
</body>

</html>
