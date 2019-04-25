<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="java.util.List,java.lang.String,br.com.lifetime.blotter.model.Operacao" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    
    <title>Blotter</title>
    
    <link href='<spring:url value="/resources/css/style.css" />' rel="stylesheet">
</head>

<body>

<c:forEach items="${ estrategias }" var="estrategia">

${ estrategia.nome }

</c:forEach>
   
</body>

</html>
