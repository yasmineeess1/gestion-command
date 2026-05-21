<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Liste des Commandes</title>

    <link href="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<script src="${pageContext.request.contextPath}/webjars/jquery/3.6.0/jquery.min.js"></script>

<script src="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/js/bootstrap.bundle.min.js"></script>

<body>

<%@ include file="header.jsp" %>

<div class="container mt-4">

    <h3>📋 Liste des commandes</h3>

    <table class="table table-striped table-bordered">

        <thead class="thead-dark">
            <tr>
                <th>ID</th>
                <th>Utilisateur</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Total</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>

            <!-- ✅ Si vide -->
            <c:if test="${empty commandes}">
                <tr>
                    <td colspan="6" class="text-center">
                        Aucune commande trouvée
                    </td>
                </tr>
            </c:if>

            <!-- ✅ Liste -->
            <c:forEach items="${commandes}" var="c">
                <tr>
                    <td>${c.id}</td>
                    <td>${c.userId}</td>

                    <td>
                        <c:choose>
                            <c:when test="${not empty c.dateCommande}">
                                ${c.dateCommande}
                            </c:when>
                            <c:otherwise>
                                -
                            </c:otherwise>
                        </c:choose>
                    </td>

                    <td>
                        <span class="badge badge-info">
                            ${c.statut}
                        </span>
                    </td>

                    <td>${c.total} DH</td>

                    <td>
                        <a href="${pageContext.request.contextPath}/commande.do?action=view&id=${c.id}"
                           class="btn btn-sm btn-primary">
                            Voir
                        </a>

                        <a href="${pageContext.request.contextPath}/commande.do?action=delete&id=${c.id}"
                           class="btn btn-sm btn-danger"
                           onclick="return confirm('Supprimer cette commande ?')">
                            Supprimer
                        </a>
                    </td>
                </tr>
            </c:forEach>

        </tbody>

    </table>

</div>



</body>
</html>