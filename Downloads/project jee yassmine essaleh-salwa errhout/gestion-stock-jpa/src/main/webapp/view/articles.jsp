<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="container">
<form method="get" action="${pageContext.request.contextPath}/articles.do">
    <input type="text" name="keyword" placeholder="Rechercher..." class="form-control">
    <button type="submit" class="btn btn-primary mt-2">Rechercher</button>
</form>
<table class="table">
<thead class="thead-dark">
<tr>
<th scope="col">Id</th>
<th scope="col">Description</th>
<th scope="col">Quantité</th>
<th scope="col">Prix</th>
</tr>
</thead>
<tbody>
<c:forEach items="${articles}" var="article">
<tr>
<th scope="row">${article.id}</th>
<td>${article.description}</td>
<td>${article.quantite}</td>
<td>${article.price}</td>
<td>
    <a href="${pageContext.request.contextPath}/articles.do?action=delete&id=${article.id}" 
   class="btn btn-danger" 
   onclick="return confirm('Supprimer cet article ?')">Supprimer</a>

<a href="${pageContext.request.contextPath}/articles.do?action=edit&id=${article.id}">
   Modifier</a>
   </td> </tr>
</c:forEach>
</tbody>
</table>
<a href="${pageContext.request.contextPath}/view/addArticle.jsp">
    Ajouter un article
</a>
</div>