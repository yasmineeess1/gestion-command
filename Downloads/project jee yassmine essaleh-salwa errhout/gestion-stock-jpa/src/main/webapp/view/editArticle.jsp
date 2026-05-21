<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Modifier l'Article</title>
    <link href="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h3>Modifier l'article #${articleToEdit.id}</h3>
            </div>
            <div class="card-body">
                <form action="${pageContext.request.contextPath}/articles.do" method="post">
                    
                    <!-- CHAMP CACHÉ : Très important pour que la Servlet sache quel article modifier -->
                    <input type="hidden" name="id" value="${articleToEdit.id}">

                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" name="description" class="form-control" 
                               value="${articleToEdit.description}" required>
                    </div>

                    <div class="form-group">
                        <label>Quantité</label>
                        <input type="number" step="0.1" name="quantite" class="form-control" 
                               value="${articleToEdit.quantite}" required>
                    </div>

                    <div class="form-group">
                        <label>Prix</label>
                        <input type="number" step="0.01" name="price" class="form-control" 
                               value="${articleToEdit.price}" required>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-success">Enregistrer les modifications</button>
                        <a href="${pageContext.request.contextPath}/articles.do" class="btn btn-secondary">Annuler</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>