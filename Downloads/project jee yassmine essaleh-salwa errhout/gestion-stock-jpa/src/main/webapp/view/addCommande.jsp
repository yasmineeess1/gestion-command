<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Créer Commande</title>
    <link href="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<%@ include file="header.jsp" %>

<div class="container mt-4">
    <div class="card shadow">
        <div class="card-header bg-primary text-white">
            <h3>Créer une commande</h3>
        </div>

        <div class="card-body">
            <form action="${pageContext.request.contextPath}/commande.do" method="post">

                <div class="row form-group">
                    <div class="col-md-6">
                        <label>**Sélectionner un Article**</label>
                        <select name="articleId" class="form-control">
                            <c:forEach items="${articles}" var="a">
                                <option value="${a.id}">
                                    ${a.description} - ${a.price} DH
                                </option>
                            </c:forEach>
                        </select>
                    </div>

                    <div class="col-md-3">
                        <label>**Quantité**</label>
                        <input type="number" name="quantite" class="form-control" value="1" min="1">
                    </div>

                    <div class="col-md-3 d-flex align-items-end">
                        <button type="submit" name="action" value="addItem" class="btn btn-primary w-100">
                            ➕ Ajouter au panier
                        </button>
                    </div>
                </div>

                <hr>

                <h5 class="mb-3">📦 Contenu du Panier</h5>

                <table class="table table-bordered table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Désignation de l'Article</th>
                            <th>Prix Unitaire</th>
                            <th>Quantité</th>
                            <th>Sous-total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <c:if test="${empty panier}">
                            <tr>
                                <td colspan="4" class="text-center text-muted">Votre panier est vide</td>
                            </tr>
                        </c:if>

                        <c:forEach items="${panier}" var="p">
                            <tr>
                                <td>**${p.article.description}**</td>
                                <td>${p.prix} DH</td>
                                <td>${p.quantite}</td>
                                <td>**${p.quantite * p.prix} DH**</td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>

                <div class="mt-4">
                    <button type="submit" name="action" value="valider" class="btn btn-success" ${empty panier ? 'disabled' : ''}>
                        💾 Valider et enregistrer la commande
                    </button>
                    <a href="${pageContext.request.contextPath}/commande.do?action=list" class="btn btn-secondary">Retour à la liste</a>
                </div>

            </form>
        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/webjars/jquery/3.6.0/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/js/bootstrap.bundle.min.js"></script>
</body>
</html>