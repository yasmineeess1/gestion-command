<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Articles</title>
    
    <link href="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <style>
    /* =========================
       RESET & BASE
    ========================= */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Inter', sans-serif;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        position: relative;
        overflow-x: hidden;
        padding-bottom: 40px;
    }

    /* Animated background */
    body::before {
        content: '';
        position: fixed;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: shift 20s linear infinite;
        opacity: 0.5;
        pointer-events: none;
    }

    @keyframes shift {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
    }

    /* Floating shapes */
    .shape {
        position: fixed;
        filter: blur(60px);
        opacity: 0.3;
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
        pointer-events: none;
    }

    .shape-1 {
        width: 300px;
        height: 300px;
        background: #ff6b6b;
        top: -100px;
        left: -100px;
    }

    .shape-2 {
        width: 400px;
        height: 400px;
        background: #4ecdc4;
        bottom: -150px;
        right: -150px;
        animation-delay: 1s;
    }

    .shape-3 {
        width: 250px;
        height: 250px;
        background: #ffe66d;
        top: 50%;
        left: 20%;
        animation-delay: 2s;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
    }

    /* =========================
       MAIN CONTAINER
    ========================= */
    .container {
        position: relative;
        z-index: 10;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    /* =========================
       CARD PRINCIPALE
    ========================= */
    .main-card {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        border-radius: 30px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.3);
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .main-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Header de la carte */
    .card-header-custom {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 30px 35px;
        border: none;
        position: relative;
        overflow: hidden;
    }

    .card-header-custom::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 30px 30px;
        animation: shift 20s linear infinite;
    }

    .card-header-custom h2 {
        margin: 0;
        font-size: 28px;
        font-weight: 800;
        color: white;
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .card-header-custom h2 i {
        font-size: 32px;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }

    /* Corps de la carte */
    .card-body-custom {
        padding: 35px;
    }

    /* =========================
       BARRE DE RECHERCHE
    ========================= */
    .search-section {
        background: #f9fafb;
        padding: 25px;
        border-radius: 20px;
        margin-bottom: 30px;
        transition: all 0.3s ease;
    }

    .search-section:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    }

    .search-form {
        display: flex;
        gap: 15px;
        align-items: flex-end;
    }

    .search-input-wrapper {
        flex: 1;
        position: relative;
    }

    .search-input-wrapper i {
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        font-size: 18px;
    }

    .search-input {
        width: 100%;
        padding: 14px 18px 14px 48px;
        border: 2px solid #e5e7eb;
        border-radius: 18px;
        font-size: 15px;
        font-weight: 500;
        transition: all 0.3s ease;
        background: white;
        font-family: 'Inter', sans-serif;
    }

    .search-input:focus {
        border-color: #667eea;
        outline: none;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    /* =========================
       BOUTONS MODERNES
    ========================= */
    .btn-modern {
        padding: 14px 28px;
        border-radius: 18px;
        font-weight: 700;
        font-size: 14px;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
    }

    .btn-primary-modern {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .btn-primary-modern:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .btn-danger-modern {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
    }

    .btn-danger-modern:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
    }

    .btn-edit-modern {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        box-shadow: 0 2px 10px rgba(245, 158, 11, 0.3);
    }

    .btn-edit-modern:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
    }

    .btn-add-modern {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 12px 24px;
        font-size: 14px;
    }

    .btn-add-modern:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
    }

    /* =========================
       TABLEAU MODERNE
    ========================= */
    .table-modern {
        width: 100%;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        margin-bottom: 25px;
    }

    .table-modern thead {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .table-modern thead th {
        padding: 18px 15px;
        font-weight: 700;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border: none;
    }

    .table-modern tbody tr {
        transition: all 0.3s ease;
        border-bottom: 1px solid #f3f4f6;
    }

    .table-modern tbody tr:hover {
        background: #f9fafb;
        transform: scale(1.01);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .table-modern tbody td {
        padding: 16px 15px;
        vertical-align: middle;
        color: #4b5563;
        font-weight: 500;
    }

    .table-modern tbody th {
        padding: 16px 15px;
        vertical-align: middle;
        color: #667eea;
        font-weight: 700;
        background: transparent;
    }

    /* Badges pour les quantités et prix */
    .badge-quantite {
        display: inline-block;
        padding: 6px 14px;
        background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
        color: #667eea;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
    }

    .badge-prix {
        display: inline-block;
        padding: 6px 14px;
        background: linear-gradient(135deg, #10b98120 0%, #05966920 100%);
        color: #059669;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
    }

    /* Actions container */
    .actions-container {
        display: flex;
        gap: 10px;
    }

    /* Footer avec bouton ajout */
    .footer-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 25px;
        padding-top: 20px;
        border-top: 2px solid #e5e7eb;
    }

    /* Message quand aucun résultat */
    .empty-state {
        text-align: center;
        padding: 60px 20px;
        background: #f9fafb;
        border-radius: 20px;
        margin: 20px 0;
    }

    .empty-state i {
        font-size: 64px;
        color: #d1d5db;
        margin-bottom: 20px;
    }

    .empty-state p {
        color: #9ca3af;
        font-size: 16px;
        margin: 0;
    }

    /* =========================
       RESPONSIVE
    ========================= */
    @media (max-width: 768px) {
        .card-body-custom {
            padding: 25px;
        }
        
        .card-header-custom h2 {
            font-size: 24px;
        }
        
        .search-form {
            flex-direction: column;
        }
        
        .btn-modern {
            width: 100%;
            justify-content: center;
        }
        
        .table-modern {
            font-size: 13px;
        }
        
        .table-modern thead th,
        .table-modern tbody td,
        .table-modern tbody th {
            padding: 12px 10px;
        }
        
        .actions-container {
            flex-direction: column;
        }
        
        .btn-modern {
            padding: 8px 16px;
            font-size: 12px;
        }
    }

    @media (max-width: 576px) {
        .table-modern {
            display: block;
            overflow-x: auto;
        }
        
        .badge-quantite,
        .badge-prix {
            font-size: 12px;
            padding: 4px 10px;
        }
    }

    /* Animation pour les lignes du tableau */
    .table-modern tbody tr {
        animation: fadeInUp 0.5s ease backwards;
    }
    
    .table-modern tbody tr:nth-child(1) { animation-delay: 0.05s; }
    .table-modern tbody tr:nth-child(2) { animation-delay: 0.1s; }
    .table-modern tbody tr:nth-child(3) { animation-delay: 0.15s; }
    .table-modern tbody tr:nth-child(4) { animation-delay: 0.2s; }
    .table-modern tbody tr:nth-child(5) { animation-delay: 0.25s; }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    </style>
</head>
<body>

<!-- Floating shapes -->
<div class="shape shape-1"></div>
<div class="shape shape-2"></div>
<div class="shape shape-3"></div>

<%@ include file="header.jsp" %>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-11">
            <div class="main-card">
                <div class="card-header-custom">
                    <h2>
                        <i class="fas fa-boxes"></i>
                        Gestion des Articles
                    </h2>
                </div>
                
                <div class="card-body-custom">
                    <!-- SECTION RECHERCHE -->
                    <div class="search-section">
                        <form method="get" action="${pageContext.request.contextPath}/articles.do" class="search-form">
                            <div class="search-input-wrapper">
                                <i class="fas fa-search"></i>
                                <input type="text" 
                                       name="keyword" 
                                       placeholder="Rechercher un article..." 
                                       class="search-input"
                                       value="${param.keyword}">
                            </div>
                            <button type="submit" class="btn-modern btn-primary-modern">
                                <i class="fas fa-search"></i>
                                Rechercher
                            </button>
                        </form>
                    </div>

                    <!-- TABLEAU DES ARTICLES -->
                    <c:choose>
                        <c:when test="${empty articles}">
                            <div class="empty-state">
                                <i class="fas fa-inbox"></i>
                                <p>Aucun article trouvé</p>
                                <small style="color: #9ca3af;">Ajoutez votre premier article !</small>
                            </div>
                        </c:when>
                        <c:otherwise>
                            <table class="table-modern">
                                <thead>
                                    <tr>
                                        <th><i class="fas fa-hashtag"></i> ID</th>
                                        <th><i class="fas fa-tag"></i> Description</th>
                                        <th><i class="fas fa-cubes"></i> Quantité</th>
                                        <th><i class="fas fa-euro-sign"></i> Prix</th>
                                        <th><i class="fas fa-cog"></i> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <c:forEach items="${articles}" var="article">
                                        <tr>
                                            <th scope="row">${article.id}</th>
                                            <td>
                                                <i class="fas fa-box" style="color: #667eea; margin-right: 8px;"></i>
                                                ${article.description}
                                            </td>
                                            <td>
                                                <span class="badge-quantite">
                                                    <i class="fas fa-times" style="font-size: 10px;"></i>
                                                    ${article.quantite}
                                                </span>
                                            </td>
                                            <td>
                                                <span class="badge-prix">
                                                    <i class="fas fa-coins" style="font-size: 10px;"></i>
                                                    ${article.price} DH
                                                </span>
                                            </td>
                                            <td>
                                                <div class="actions-container">
                                                    <a href="${pageContext.request.contextPath}/articles.do?action=delete&id=${article.id}" 
                                                       class="btn-modern btn-danger-modern"
                                                       onclick="return confirm('Supprimer définitivement cet article ?')">
                                                        <i class="fas fa-trash-alt"></i>
                                                        Supprimer
                                                    </a>
                                                    <a href="${pageContext.request.contextPath}/articles.do?action=edit&id=${article.id}" 
                                                       class="btn-modern btn-edit-modern">
                                                        <i class="fas fa-edit"></i>
                                                        Modifier
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </tbody>
                            </table>
                        </c:otherwise>
                    </c:choose>

                    <!-- BOUTON AJOUTER -->
                    <div class="footer-actions">
                        <a href="${pageContext.request.contextPath}/view/addArticle.jsp" class="btn-modern btn-add-modern">
                            <i class="fas fa-plus-circle"></i>
                            Ajouter un article
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/webjars/jquery/3.6.0/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/js/bootstrap.bundle.min.js"></script>

<script>
    $(document).ready(function() {
        // Animation au chargement
        $('.table-modern tbody tr').each(function(index) {
            $(this).css('animation-delay', (index * 0.05) + 's');
        });
        
        // Confirmation de suppression avec effet
        $('.btn-danger-modern').on('click', function(e) {
            var confirmMessage = $(this).hasClass('btn-danger-modern') ? 
                                '⚠️ Supprimer cet article ? Cette action est irréversible !' : 
                                'Supprimer cet article ?';
            if (!confirm(confirmMessage)) {
                e.preventDefault();
            }
        });
        
        // Animation sur la barre de recherche
        $('.search-input').on('focus', function() {
            $(this).parent().find('i').css('color', '#667eea');
        }).on('blur', function() {
            if (!$(this).val()) {
                $(this).parent().find('i').css('color', '#9ca3af');
            }
        });
        
        // Effet de survol sur les lignes du tableau
        $('.table-modern tbody tr').hover(
            function() {
                $(this).css('cursor', 'pointer');
            }
        );
    });
</script>

</body>
</html>