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
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" href='<spring:url value="/resources/css/style.min.css" />'>
    <title>LFTM Consulta - Blotter</title>
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
                        <a class="nav-link" href="<spring:url value="/estrategias"></spring:url>">Estratégias</a>
                    </li>
                	<li class="nav-item mx-3">
                        <a class="nav-link" href='<spring:url value="/operacoes"></spring:url>'>Operações</a>
                    </li>
                    <li class="nav-item mx-3">
                        <a class="nav-link active" href="<spring:url value="/blotter"></spring:url>">Blotter</a>
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

	<main class="container-fluid px-5">
		<div class="row py-3">
			<h1>Blotter</h1>
		</div>

		<!--  BOTÕES  -->
		<div class="row">
			<div class="col-12 col-md-8 text-md-left text-center">
				<button class="btn btn-primary rounded-pill px-5" data-acao="Classificar" data-toggle="modal" data-target="#modalCl">Classificar Selecionados</button>
				<button class="btn btn-primary rounded-pill px-5" id="btn-filtro" data-acao="Filtrar">Filtrar</button>
			</div>
			<div class="col-12 col-md-4 text-md-right text-center ">
				<button class="btn btn-primary rounded-pill px-5" data-acao="Importar" data-toggle="modal" data-target="#modalImport">Importar <i class="far fa-file-excel fa-sm"></i></button>
				<button class="btn btn-success rounded-pill px-5" data-acao="Salvar" id="btn-salvar">Salvar</button>
			</div>
		</div>

		<!--  FILTRO   -->
		<form class="mt-3 d-none" action="" id="form_filtro-registros">
			<div class="form-row mx-auto align-items-center">
				<div class="col-auto" id="form_filtro-select">
					<label for="filtro" class="sr-only">Filtrar por:</label>
					<select name="filtro" id="form_select--filtro" class="">
						<option value="2">Cliente</option>
						<option value="3">Ativo</option>
						<option value="4">Tipo</option>
						<option value="5">Qtd</option>
						<option value="6">Preço</option>
						<option value="7">CodCliente</option>
						<option value="8">Data</option>
					</select>
				</div>
				<div class="col">
					<input type="search" class="form-control" name="busca" id="input_filtra-registro">
				</div>
			</div>
		</form>

		<!-- TABELA -->
		<div class="row mt-3 table-responsive mx-auto">
			<table class="table table-hover table-striped table-bordered" id="table_registros">
				<thead class="thead-dark">
					<tr class="text-center">
						<th scope="col"> <input type="checkbox" name="checkbox-master"> </th>
						<th scope="col">Operação</th>
						<th scope="col">Cliente</th>
						<th scope="col">Ativo</th>
						<th scope="col">Tipo</th>
						<th scope="col">Qtd</th>
						<th scope="col">Preço</th>
						<th scope="col">CodCliente</th>
						<th scope="col">Data</th>
					</tr>
				</thead>
				<tbody id="table_tbody--registros">

					<c:forEach items="${ registros }" var="reg">
						<tr class="text-center" data-registro="${ reg.id }">
							<td> <input type="checkbox"> </td>
							<td class="td-200 py-0"> <input class="form-control table_td--input-operacao" type="text" list="table_input--list-operacoes"> </td>
							<td class="td-300"> ${ reg.cliente.nome } </td>
							<td> ${ reg.ativo } </td>
							<td> ${ reg.tipo } </td>
							<td> ${ reg.quantidade } </td>
							<td> <fmt:formatNumber value="${ reg.preco }" pattern="R$ #.00" type="currency"/></td>
							<td> ${ reg.cliente.codigo } </td>
							<td class="td-200"> <fmt:formatDate value="${ reg.data.time }" pattern="dd/MM/yyyy HH:mm:ss"/>   </td>
						</tr>
					</c:forEach>

				</tbody>
			</table>
		</div>

	</main>

	<!-- MODAL CLASSIFICAR -->
	<div class="modal fade" id="modalCl" tabindex="-1" role="dialog" aria-labelledby="modalClLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalClLabel">Classificar Selecionados</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form id="form_modal" name="form_modal" action="#" method="get">
						<div class="form-group">
							<label for="form_modal--input-operacao" class="col-form-label">Operação:</label>
							<input class="form-control" type="text" list="table_input--list-operacoes" id="form_modal--input-operacao">
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
					<button type="submit" id="form_modal--classify-button" class="btn btn-primary">Classificar</button>
				</div>
			</div>
		</div>
	</div>

	<!-- MODAL IMPORT -->
	<div class="modal fade" id="modalImport" tabindex="-1" role="dialog" aria-labelledby="modalImportLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalImportLabel">Importar Planilha</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form id="form_modal-import" name="form_modal-import" action="#" method="post" enctype="multipart/form-data">
					<div class="modal-body">
						<div class="input-group">
							<input type="file" id="form_modal-import--input-file" name="file">
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						<button type="submit" id="form_modal-import--upload-button" class="btn btn-primary">Enviar</button>
					</div>
				</form>
			</div>
		</div>
	</div>

    
    <datalist id="table_input--list-operacoes">
    	<c:forEach items="${ operacoes }" var="op">
    	<option value="${ op.nome }" data-op="${ op.id }">
    	</c:forEach>
    </datalist>

    <script src='<spring:url value="/resources/js/jquery.min.js" />'></script>
    <script src='<spring:url value="/resources/js/bootstrap.bundle.min.js" />'></script>
    <script src='<spring:url value="/resources/js/requisicao.js" />'></script>
    <script src='<spring:url value="/resources/js/blotter.js" />'></script>
    
</body>

</html>
