<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ajouter un Article</title>
    <link href="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<%@ include file="header.jsp" %>
<div class="container mt-5">
    <div class="card shadow">
        <div class="card-header bg-success text-white">
            <h3>Ajouter un Article</h3>
        </div>

        <div class="card-body">
            <form action="${pageContext.request.contextPath}/articles.do" method="post">

                <!-- Description -->
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" name="description" class="form-control" required>
                </div>

                <!-- Quantité -->
                <div class="form-group">
                    <label>Quantité</label>
                    <input type="number" step="0.1" name="quantite" class="form-control" required>
                </div>

                <!-- Prix -->
                <div class="form-group">
                    <label>Prix</label>
                    <input type="number" step="0.01" name="price" class="form-control" required>
                </div>

                <!-- Boutons -->
                <div class="mt-4">
                    <button type="submit" class="btn btn-primary">Ajouter</button>
                    <a href="${pageContext.request.contextPath}/articles.do" class="btn btn-secondary">Annuler</a>
                </div>

            </form>
        </div>
    </div>
</div>

</body>
</html>