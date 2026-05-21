<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Commandes</title>

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

    .card-header-custom h3 {
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

    .card-header-custom h3 i {
        font-size: 32px;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }

    /* Corps de la carte */
    .card-body-custom {
        padding: 35px;
    }

    /* =========================
       STATISTIQUES
    ========================= */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 35px;
    }

    .stat-card {
        background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
        border-radius: 20px;
        padding: 20px;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid rgba(102, 126, 234, 0.1);
    }

    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
    }

    .stat-icon i {
        font-size: 24px;
        color: #667eea;
    }

    .stat-value {
        font-size: 28px;
        font-weight: 800;
        color: #374151;
        margin-bottom: 5px;
    }

    .stat-label {
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        color: #9ca3af;
        letter-spacing: 0.5px;
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
        padding: 20px 15px;
        vertical-align: middle;
        color: #4b5563;
        font-weight: 500;
    }

    /* Badges de statut */
    .badge-statut {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .badge-statut.en-cours {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        color: #d97706;
    }

    .badge-statut.livre {
        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        color: #059669;
    }

    .badge-statut.annule {
        background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
        color: #dc2626;
    }

    /* Badge total */
    .total-badge {
        display: inline-block;
        padding: 6px 14px;
        background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
        border-radius: 12px;
        font-weight: 800;
        color: #667eea;
    }

    /* Liste des produits */
    .products-list {
        margin: 0;
        padding-left: 20px;
        list-style: none;
    }

    .products-list li {
        padding: 6px 0;
        font-size: 13px;
        border-bottom: 1px solid #f3f4f6;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
    }

    .products-list li:last-child {
        border-bottom: none;
    }

    .product-badge {
        display: inline-block;
        padding: 2px 8px;
        background: #f3f4f6;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 600;
        color: #667eea;
    }

    /* Boutons d'action */
    .action-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .btn-action {
        padding: 8px 16px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: none;
        cursor: pointer;
    }

    .btn-view {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    .btn-view:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        color: white;
        text-decoration: none;
    }

    .btn-delete {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
    }

    .btn-delete:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        color: white;
        text-decoration: none;
    }

    /* État vide */
    .empty-state {
        text-align: center;
        padding: 80px 20px;
        background: #f9fafb;
        border-radius: 20px;
    }

    .empty-state i {
        font-size: 80px;
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
    @media (max-width: 1200px) {
        .table-modern {
            display: block;
            overflow-x: auto;
        }
    }

    @media (max-width: 768px) {
        .card-body-custom {
            padding: 25px;
        }
        
        .card-header-custom h3 {
            font-size: 24px;
        }
        
        .stats-grid {
            grid-template-columns: 1fr;
            gap: 15px;
        }
        
        .table-modern tbody td {
            padding: 15px 10px;
        }
        
        .action-buttons {
            flex-direction: column;
        }
        
        .btn-action {
            width: 100%;
            justify-content: center;
        }
    }

    /* Animation pour les lignes */
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
        <div class="col-lg-12">
            <div class="main-card">
                <div class="card-header-custom">
                    <h3>
                        <i class="fas fa-list-alt"></i>
                        Liste des commandes
                    </h3>
                </div>
                
                <div class="card-body-custom">
                    <!-- Statistiques -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <div class="stat-value">${commandes.size()}</div>
                            <div class="stat-label">Total commandes</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="stat-value">
                                <c:set var="total" value="0" />
                                <c:forEach items="${commandes}" var="c">
                                    <c:set var="total" value="${total + c.total}" />
                                </c:forEach>
                                ${total} DH
                            </div>
                            <div class="stat-label">Chiffre d'affaires</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="stat-value">
                                <c:set var="livrees" value="0" />
                                <c:forEach items="${commandes}" var="c">
                                    <c:if test="${c.statut == 'LIVRE'}">
                                        <c:set var="livrees" value="${livrees + 1}" />
                                    </c:if>
                                </c:forEach>
                                ${livrees}
                            </div>
                            <div class="stat-label">Commandes livrées</div>
                        </div>
                    </div>

                    <!-- Tableau des commandes -->
                    <c:choose>
                        <c:when test="${empty commandes}">
                            <div class="empty-state">
                                <i class="fas fa-inbox"></i>
                                <p>Aucune commande trouvée</p>
                                <small style="color: #9ca3af;">Les commandes apparaîtront ici</small>
                            </div>
                        </c:when>
                        <c:otherwise>
                            <table class="table-modern">
                                <thead>
                                    <tr>
                                        <th><i class="fas fa-hashtag"></i> ID</th>
                                        <th><i class="fas fa-user"></i> Utilisateur</th>
                                        <th><i class="fas fa-calendar"></i> Date</th>
                                        <th><i class="fas fa-tag"></i> Statut</th>
                                        <th><i class="fas fa-coins"></i> Total</th>
                                        <th><i class="fas fa-boxes"></i> Produits</th>
                                        <th><i class="fas fa-cog"></i> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <c:forEach items="${commandes}" var="c">
                                        <tr>
                                            <td>
                                                <span class="product-badge">#${c.id}</span>
                                            </td>
                                            <td>
                                                <i class="fas fa-user-circle" style="color: #667eea; margin-right: 5px;"></i>
                                                ${c.userId}
                                            </td>
                                            <td>
                                                <i class="far fa-calendar-alt" style="color: #667eea; margin-right: 5px;"></i>
                                                ${c.dateCommande}
                                            </td>
                                            <td>
                                                <span class="badge-statut ${c.statut == 'EN_COURS' ? 'en-cours' : (c.statut == 'LIVRE' ? 'livre' : 'annule')}">
                                                    <i class="fas ${c.statut == 'EN_COURS' ? 'fa-clock' : (c.statut == 'LIVRE' ? 'fa-check-circle' : 'fa-times-circle')}"></i>
                                                    ${c.statut}
                                                </span>
                                            </td>
                                            <td>
                                                <span class="total-badge">
                                                    <i class="fas fa-coins"></i> ${c.total} DH
                                                </span>
                                            </td>
                                            <!-- PRODUITS -->
                                            <td>
                                                <c:if test="${empty c.lignes}">
                                                    <span style="color: #9ca3af; font-size: 13px;">
                                                        <i class="fas fa-box-open"></i> Aucun produit
                                                    </span>
                                                </c:if>
                                                <ul class="products-list">
                                                    <c:forEach items="${c.lignes}" var="l">
                                                        <li>
                                                            <i class="fas fa-box" style="color: #667eea; font-size: 11px;"></i>
                                                            <span class="product-badge">ID ${l.articleId}</span>
                                                            <i class="fas fa-times" style="font-size: 10px; color: #9ca3af;"></i>
                                                            <strong>${l.quantite}</strong>
                                                            <i class="fas fa-euro-sign" style="font-size: 10px; color: #9ca3af;"></i>
                                                            <strong>${l.prix} DH</strong>
                                                        </li>
                                                    </c:forEach>
                                                </ul>
                                             </td>
                                            <td>
                                                <div class="action-buttons">
                                                    <a href="${pageContext.request.contextPath}/commande.do?action=view&id=${c.id}"
                                                       class="btn-action btn-view">
                                                        <i class="fas fa-eye"></i>
                                                        Voir
                                                    </a>
                                                    <a href="${pageContext.request.contextPath}/commande.do?action=delete&id=${c.id}"
                                                       class="btn-action btn-delete"
                                                       onclick="return confirm('⚠️ Supprimer définitivement cette commande ? Cette action est irréversible !')">
                                                        <i class="fas fa-trash-alt"></i>
                                                        Supprimer
                                                    </a>
                                                </div>
                                             </td>
                                        </td>
                                    </c:forEach>
                                </tbody>
                            </table>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/webjars/jquery/3.6.0/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/js/bootstrap.bundle.min.js"></script>

<script>
    $(document).ready(function() {
        // Animation pour les lignes du tableau
        $('.table-modern tbody tr').each(function(index) {
            $(this).css('animation-delay', (index * 0.05) + 's');
        });
        
        // Animation pour les cartes statistiques
        $('.stat-card').each(function(index) {
            $(this).css('animation', 'fadeInUp 0.5s ease backwards');
            $(this).css('animation-delay', (index * 0.1) + 's');
        });
        
        // Confirmation de suppression améliorée
        $('.btn-delete').on('click', function(e) {
            if (!confirm('⚠️ Attention !\n\nVoulez-vous vraiment supprimer cette commande ?\nCette action est définitive et irréversible.')) {
                e.preventDefault();
            }
        });
    });
</script>

</body>
</html>