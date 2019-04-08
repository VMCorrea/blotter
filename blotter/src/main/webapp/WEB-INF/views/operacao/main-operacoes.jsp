<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="java.util.List,java.lang.String,br.com.lifetime.blotter.model.Operacao,java.util.Date,br.com.lifetime.blotter.model.Estrategia" %>
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
    <title>LFTM Consulta - Operações</title>
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
                        <a class="nav-link active" href="#">Operações</a>
                    </li>
                    <li class="nav-item mx-3">
                        <a class="nav-link" href="#">Estratégias</a>
                    </li>
                    <li class="nav-item mx-3">
                        <a class="nav-link" href="#">Blotter</a>
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
            <h1>Operações</h1>
        </div>

        <!--  BOTÕES  -->
        <div class="row">
            <div class="col-auto ml-auto">
                <button class="btn btn-primary ml-auto rounded-pill px-5" data-toggle="modal" data-target="#modalEdit" data-acao="Criar">Criar</button>
            </div>
            <div class="col-auto mr-auto">
                <button class="btn btn-primary rounded-pill px-5" data-acao="Buscar" onclick="hideShowElement('form_busca-estrategia')">Buscar</button>
            </div>
        </div>

        <!--  BUSCA   -->
        <form class="mt-3 d-none" action="" id="form_busca-estrategia">
            <div class="form-row mx-auto align-items-center">
                <div class="col-auto" id="filtro-select">
                    <label for="filtro" class="sr-only">Filtrar por:</label>
                    <select name="filtro" id="filtro" class="">
                        <option value="0">Estratégia</option>
                        <option value="1">Operação</option>
                        <option value="2">Data</option>
                    </select>
                </div>
                <div class="col">
                    <input type="search" class="form-control" placeholder="Procurar" name="busca" id="input_filtra-operacao">
                </div>
            </div>
        </form>

        <!-- TABELA -->
        <div class="row mt-3">
            <table class="table table-hover table-striped table-bordered" id="table_operacoes">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Estratégia</th>
                        <th scope="col">Operação</th>
                        <th scope="col">Data de Ínicio</th>
                    </tr>
                </thead>
                <tbody>
              		<c:forEach items="${ operacoes }" var="op">

					<tr class="editavel" data-toggle="modal" data-target="#modalEdit" data-id="${ op.id }" data-estrategia="${ op.estrategia.nome }" data-operacao="${ op.nome }" data-inicio='<fmt:formatDate value="${ op.dataInicio.time }" pattern="yyyy-MM-dd" />' data-acao="Editar">
                        <td>${ op.estrategia.nome }</td>
                        <td>${ op.nome }</td>
                        <td><fmt:formatDate value="${ op.dataInicio.time }" pattern="dd/MM/yyyy" /> </td>
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
                            <label for="estrategia-edit" class="col-form-label">Estratégia:</label>
                            <input type="text" class="form-control" id="estrategia-edit" name="estrategia" list="form_modal--list-estrategias" required>
                            <datalist id="form_modal--list-estrategias">
								
								<c:forEach items="${ estrategias }" var="est">
								
									<option value="${ est.nome }" data-permalink="${ est.permalink }"></option>
								
								</c:forEach>
								
                            </datalist>
                        </div>
                        <div class="form-group">
                            <label for="operacao-edit" class="col-form-label">Operação:</label>
                            <input class="form-control" type="text" id="operacao-edit" name="operacao" required>
                        </div>
                        <div class="form-group">
                            <label for="data-edit" class="col-form-label">Data de ínicio:</label>
                            <input class="form-control" type="date" id="data-edit" name="data" required>
                        </div>
                        <input type="hidden" name="id" value="" id="id-edit">
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
    <script src='<spring:url value="/resources/js/app.js" />'></script>
</body>

</html>
