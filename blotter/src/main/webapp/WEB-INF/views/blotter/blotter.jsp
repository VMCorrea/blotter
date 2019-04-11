<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="java.util.List,java.lang.String" %>
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
            <div class="col-auto col-md-8 text-left">
                <button class="btn btn-primary rounded-pill px-5" data-acao="Classificar" data-toggle="modal" data-target="#modalCl">Classificar Selecionados</button>
                <button class="btn btn-primary rounded-pill px-5" data-acao="Filtrar" onclick="">Filtrar</button>
            </div>
            <div class="col-auto col-md-4 text-right">
            	<button class="btn btn-primary rounded-pill px-5" data-acao="Importar" onclick="">Importar <i class="far fa-file-excel fa-sm"></i></button>
                <button class="btn btn-success rounded-pill px-5" data-acao="Salvar" onclick="">Salvar</button>
            </div>
        </div>

        <!--  FILTRO   -->
        <form class="mt-3" action="" id="form_filtro-registros">
            <div class="form-row mx-auto align-items-center">
                <div class="col-auto" id="form_filtro-select">
                    <label for="filtro" class="sr-only">Filtrar por:</label>
                    <select name="filtro" id="filtro" class="">
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
                    	<th scope="col"> <input type="checkbox"> </th>
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

					<tr class="text-center">
                        <td> <input type="checkbox"> </td>
                        <td class="td-200 py-0"> <input class="form-control table_td--input-operacao" type="text" list="table_input--list-operacoes"> </td>
						<td class="td-300"> VICTOR MORAIS CORRÊA </td>
						<td> GGBR4 </td>
						<td> C </td>
						<td> 350 </td>
						<td> 12,65 </td>
						<td> 4522367 </td>
						<td class="td-200"> 10/04/2019 14:44 </td>
                    </tr>
                    
					<tr class="text-center">
						<td> <input type="checkbox"> </td>
                        <td> <input class="form-control table_td--input-operacao" type="text" list="table_input--list-operacoes"> </td>
						<td> GIOVANNI DE ALMEIDA MARAZZI </td>
						<td> CCRO3 </td>
						<td> V </td>
						<td> 800 </td>
						<td> 14,93 </td>
						<td> 544651 </td>
						<td> 10/04/2019 14:53 </td>
                    </tr>
                    
					<tr class="text-center">
						<td> <input type="checkbox"> </td>
                        <td> <input class="form-control table_td--input-operacao" type="text" list="table_input--list-operacoes"> </td>
 						<td> WALLACE BRITO DO NASCIMENTO </td>
						<td> VVAR3 </td>
						<td> V </td>
						<td> 0 </td>
						<td> 6,75 </td>
						<td> 651654 </td>
						<td> 10/04/2019 15:32 </td>
                    </tr>

                </tbody>
            </table>
        </div>

    </main>
    
    <!-- MODAL -->
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
	                <button type="submit" id="form_modal--classify-button" class="btn btn-primary" data-acao=''>Classificar</button>
                </div>
            </div>
        </div>
    </div>
    
    <datalist id="table_input--list-operacoes">
    	<option value="Operação 1">
    	<option value="Operação 2">
    	<option value="Operação 3">
    	<option value="Operação 4">
    	<option value="Operação 5">
    	<option value="Operação 6">
    	<option value="Operação 7">
    </datalist>

    <script src='<spring:url value="/resources/js/jquery.min.js" />'></script>
    <script src='<spring:url value="/resources/js/popper.min.js" />'></script>
    <script src='<spring:url value="/resources/js/bootstrap.min.js" />'></script>
</body>

</html>
