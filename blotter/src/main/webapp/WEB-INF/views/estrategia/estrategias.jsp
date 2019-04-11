<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="java.util.List,java.lang.String,java.util.Date,br.com.lifetime.blotter.model.Estrategia" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" href='<spring:url value="/resources/css/style.min.css" />'>
    <title>LFTM Consulta - Estratégias</title>
</head>

<body>

    <!--  NAVBAR  -->
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <span class="navbar-brand" href="#">LFTM Consulta</span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarPrincipal" aria-controls="navbarPrincipal" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbarPrincipal" class="navbar-collapse collapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item mx-3">
                        <a class="nav-link active" href="<spring:url value="/estrategias"></spring:url>">Estratégias</a>
                    </li>
                	<li class="nav-item mx-3">
                        <a class="nav-link" href='<spring:url value="/operacoes"></spring:url>'>Operações</a>
                    </li>
                    <li class="nav-item mx-3">
                        <a class="nav-link" href="<spring:url value="/blotter"></spring:url>">Blotter</a>
                    </li>
                    <li class="nav-item mx-3">
                        <a class="nav-link" href="#">Consulta Cliente</a>
                    </li>
                    <li class="nav-item mx-3">
                        <a class="nav-link" href="#">Consulta Operação</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>


    <main class="container">
        <div class="row py-3">
            <h1>Estratégias</h1>
        </div>

        <!--  BOTÕES  -->
        <div class="row">
            <div class="col-auto mx-auto">
                <button class="btn btn-primary mx-auto rounded-pill px-5" data-toggle="modal" data-target="#modalEdit" data-acao="Criar">Criar</button>
            </div>
        </div>
        
        <!-- TABELA -->
        <div class="row mt-3">
            <table class="table table-hover table-striped table-bordered col-auto col-md-6 mx-auto" id="table_estrategias">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Estratégia</th>
                    </tr>
                </thead>
                <tbody>
              		<c:forEach items="${ estrategias }" var="est">

					<tr class="editavel" data-toggle="modal" data-target="#modalEdit" data-id="${ est.id }" data-nome="${ est.nome }" data-acao="Editar">
                        <td>${ est.nome }</td>
                    </tr>

					</c:forEach>
                </tbody>
            </table>
        </div>

    </main>

    <!-- MODAL -->
    <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="modalEditLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_modal" name="form_modal" action="#" method="get">
                        <div class="form-group">
                            <label for="operacao-edit" class="col-form-label">Nome:</label>
                            <input class="form-control" type="text" id="form_modal--name-input" name="nome" required>
                        </div>
                        <input type="hidden" name="id" value="" id="form_modal--id-input">
                    </form>
                </div>
                <div class="modal-footer">
                	<button type="button" id="form_modal--delete-button" class="btn btn-danger" data-delete="" >Deletar</button>
	                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
	                <button type="submit" id="form_modal--save-button" class="btn btn-primary" data-acao=''>Salvar</button>
                </div>
            </div>
        </div>
    </div>

    <script src='<spring:url value="/resources/js/jquery.min.js" />'></script>
    <script src='<spring:url value="/resources/js/popper.min.js" />'></script>
    <script src='<spring:url value="/resources/js/bootstrap.min.js" />'></script>
    <script src='<spring:url value="/resources/js/estrategia.js" />'></script>
</body>

</html>
