<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Détail Commande</title>
    <link href="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<%@ include file="header.jsp" %>

<div class="container mt-4">

    <div class="card shadow mb-4">
        <div class="card-header bg-dark text-white">
            <h3 class="m-0">📦 Détail de la commande n° ${commande.id}</h3>
        </div>
        
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <p><strong>ID Commande :</strong> ${commande.id}</p>
                    <p><strong>ID Client :</strong> ${commande.userId}</p>
                </div>
                <div class="col-md-4">
                    <p><strong>Date :</strong> ${commande.dateCommande != null ? commande.dateCommande : 'Non spécifiée'}</p>
                    <p><strong>Statut :</strong>
                        <span class="badge badge-info px-3 py-2">
                            ${commande.statut}
                        </span>
                    </p>
                </div>
                <div class="col-md-4 text-right">
                    <h4 class="text-success"><strong>Total :</strong> ${commande.total} DH</h4>
                </div>
            </div>
        </div>
    </div>

    <h5 class="mb-3">🧾 Produits commandés</h5>

    <table class="table table-bordered table-striped bg-white shadow-sm">
        <thead class="thead-dark">
            <tr>
                <th>Désignation de l'Article</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Sous-total</th>
            </tr>
        </thead>

        <tbody>
            <c:forEach items="${commande.lignes}" var="l">
                <tr>
                    <td><strong>${l.article.description}</strong></td>

                    <td>${l.quantite}</td>

                    <td>${l.prix} DH</td>

                    <td>
                        <strong>${l.quantite * l.prix} DH</strong>
                    </td>
                </tr>
            </c:forEach>

            <c:if test="${empty commande.lignes}">
                <tr>
                    <td colspan="4" class="text-center text-muted">
                        Aucune ligne de commande trouvée pour cette référence.
                    </td>
                </tr>
            </c:if>
        </tbody>
    </table>

    <div class="mt-4">
        <a href="${pageContext.request.contextPath}/commande.do?action=list" class="btn btn-secondary shadow-sm">
            ⬅ Retour à la liste
        </a>
    </div>

</div>

</body>
</html>