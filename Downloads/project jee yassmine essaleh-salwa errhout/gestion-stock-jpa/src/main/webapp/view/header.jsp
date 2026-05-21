<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <a class="navbar-brand" href="#">📦 Gestion Stock</a>
    
    <button class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <c:if test="${sessionScope.role == 'ADMIN' || sessionScope.role == 'admin'}">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle"
                       href="#"
                       id="navbarDropdownArticle"
                       role="button"
                       data-toggle="dropdown"
                       aria-haspopup="true" 
                       aria-expanded="false">
                        Gestion des articles
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownArticle">
                        <a class="dropdown-item"
                           href="${pageContext.request.contextPath}/articles.do?action=list">
                            Consulter la liste
                        </a>
                    </div>
                </li>
            </ul>
        </c:if>

        <c:if test="${sessionScope.role == 'USER' || sessionScope.role == 'user'}">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle"
                       href="#"
                       id="navbarDropdownCommande"
                       role="button"
                       data-toggle="dropdown"
                       aria-haspopup="true" 
                       aria-expanded="false">
                        Gestion des commandes
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownCommande">
                        <a class="dropdown-item"
                           href="${pageContext.request.contextPath}/commande.do?action=create">
                            Ajouter une commande
                        </a>
                        <a class="dropdown-item"
                           href="${pageContext.request.contextPath}/commande.do?action=list">
                            Liste des commandes
                        </a>
                    </div>
                </li>
            </ul>
        </c:if>

        <ul class="navbar-nav ml-auto">
            <c:if test="${not empty sessionScope.username}">
                <span class="navbar-text mr-3 text-light">
                    👤 Connecté : <strong>${sessionScope.username}</strong>
                </span>
            </c:if>
            <li class="nav-item">
                <a class="btn btn-outline-danger btn-sm"
                   href="${pageContext.request.contextPath}/logout.do">
                    Déconnexion
                </a>
            </li>
        </ul>

    </div>
</nav>