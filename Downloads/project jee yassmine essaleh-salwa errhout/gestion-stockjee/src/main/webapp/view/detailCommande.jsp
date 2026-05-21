<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Détail Commande</title>

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
       INFO COMMANDE CARD
    ========================= */
    .info-card {
        background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
        border-radius: 20px;
        padding: 25px;
        margin-bottom: 35px;
        border: 1px solid rgba(102, 126, 234, 0.1);
        transition: all 0.3s ease;
    }

    .info-card:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
    }

    .info-title {
        font-size: 18px;
        font-weight: 700;
        color: #374151;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .info-title i {
        color: #667eea;
        font-size: 20px;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .info-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px;
        background: white;
        border-radius: 15px;
        transition: all 0.3s ease;
    }

    .info-item:hover {
        transform: translateX(5px);
    }

    .info-icon {
        width: 45px;
        height: 45px;
        background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .info-icon i {
        font-size: 22px;
        color: #667eea;
    }

    .info-content {
        flex: 1;
    }

    .info-label {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        color: #9ca3af;
        letter-spacing: 0.5px;
        margin-bottom: 5px;
    }

    .info-value {
        font-size: 18px;
        font-weight: 800;
        color: #374151;
    }

    .badge-statut {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .badge-statut.en-cours {
        background: linear-gradient(135deg, #f59e0b20 0%, #d9770620 100%);
        color: #d97706;
    }

    .badge-statut.livre {
        background: linear-gradient(135deg, #10b98120 0%, #05966920 100%);
        color: #059669;
    }

    .badge-statut.annule {
        background: linear-gradient(135deg, #ef444420 0%, #dc262620 100%);
        color: #dc2626;
    }

    .total-value {
        font-size: 24px;
        font-weight: 800;
        color: #667eea;
    }

    /* =========================
       TABLEAU DES PRODUITS
    ========================= */
    .products-title {
        font-size: 20px;
        font-weight: 700;
        color: #374151;
        margin: 30px 0 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        padding-bottom: 10px;
        border-bottom: 2px solid #e5e7eb;
    }

    .products-title i {
        color: #667eea;
        font-size: 24px;
    }

    .table-modern {
        width: 100%;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        margin-bottom: 30px;
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
    }

    .table-modern tbody td {
        padding: 16px 15px;
        vertical-align: middle;
        color: #4b5563;
        font-weight: 500;
    }

    /* Badges dans le tableau */
    .badge-article {
        display: inline-block;
        padding: 6px 14px;
        background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
        color: #667eea;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
    }

    .badge-quantite {
        display: inline-block;
        padding: 6px 14px;
        background: linear-gradient(135deg, #f59e0b20 0%, #d9770620 100%);
        color: #d97706;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
    }

    .prix-unitaire {
        font-weight: 700;
        color: #059669;
    }

    .sous-total {
        font-weight: 800;
        color: #667eea;
        font-size: 16px;
    }

    /* État vide */
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
       BOUTON RETOUR
    ========================= */
    .btn-back {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 14px 28px;
        background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
        color: white;
        border-radius: 18px;
        font-weight: 700;
        font-size: 14px;
        transition: all 0.3s ease;
        text-decoration: none;
        border: none;
        cursor: pointer;
    }

    .btn-back:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(107, 114, 128, 0.4);
        color: white;
        text-decoration: none;
    }

    .footer-actions {
        margin-top: 25px;
        padding-top: 20px;
        border-top: 2px solid #e5e7eb;
    }

    /* =========================
       RESPONSIVE
    ========================= */
    @media (max-width: 768px) {
        .card-body-custom {
            padding: 25px;
        }
        
        .card-header-custom h3 {
            font-size: 24px;
        }
        
        .info-grid {
            grid-template-columns: 1fr;
            gap: 15px;
        }
        
        .info-value {
            font-size: 16px;
        }
        
        .total-value {
            font-size: 20px;
        }
        
        .table-modern {
            font-size: 13px;
        }
        
        .table-modern thead th,
        .table-modern tbody td {
            padding: 12px 10px;
        }
    }

    @media (max-width: 576px) {
        .table-modern {
            display: block;
            overflow-x: auto;
        }
        
        .badge-article,
        .badge-quantite {
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
        <div class="col-lg-10">
            <div class="main-card">
                <div class="card-header-custom">
                    <h3>
                        <i class="fas fa-receipt"></i>
                        Détail de la commande
                    </h3>
                </div>
                
                <div class="card-body-custom">
                    <!-- INFO COMMANDE -->
                    <div class="info-card">
                        <div class="info-title">
                            <i class="fas fa-info-circle"></i>
                            <span>Informations générales</span>
                        </div>
                        
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-hashtag"></i>
                                </div>
                                <div class="info-content">
                                    <div class="info-label">ID Commande</div>
                                    <div class="info-value">#${commande.id}</div>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="info-content">
                                    <div class="info-label">Utilisateur</div>
                                    <div class="info-value">${commande.userId}</div>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-tag"></i>
                                </div>
                                <div class="info-content">
                                    <div class="info-label">Statut</div>
                                    <div class="info-value">
                                        <span class="badge-statut ${commande.statut == 'EN_COURS' ? 'en-cours' : (commande.statut == 'LIVRE' ? 'livre' : 'annule')}">
                                            <i class="fas ${commande.statut == 'EN_COURS' ? 'fa-clock' : (commande.statut == 'LIVRE' ? 'fa-check-circle' : 'fa-times-circle')}"></i>
                                            ${commande.statut}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-coins"></i>
                                </div>
                                <div class="info-content">
                                    <div class="info-label">Total</div>
                                    <div class="total-value">${commande.total} DH</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- LIGNES COMMANDE -->
                    <div class="products-title">
                        <i class="fas fa-boxes"></i>
                        <span>Produits commandés</span>
                    </div>

                    <c:choose>
                        <c:when test="${empty commande.lignes}">
                            <div class="empty-state">
                                <i class="fas fa-box-open"></i>
                                <p>Aucune ligne de commande</p>
                                <small style="color: #9ca3af;">Cette commande ne contient aucun produit</small>
                            </div>
                        </c:when>
                        <c:otherwise>
                            <table class="table-modern">
                                <thead>
                                    <tr>
                                        <th><i class="fas fa-tag"></i> Article ID</th>
                                        <th><i class="fas fa-cubes"></i> Quantité</th>
                                        <th><i class="fas fa-euro-sign"></i> Prix unitaire</th>
                                        <th><i class="fas fa-chart-line"></i> Sous-total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <c:forEach items="${commande.lignes}" var="l">
                                        <tr>
                                            <td>
                                                <span class="badge-article">
                                                    <i class="fas fa-box" style="font-size: 11px;"></i>
                                                    ${l.articleId}
                                                </span>
                                            </td>
                                            <td>
                                                <span class="badge-quantite">
                                                    <i class="fas fa-times" style="font-size: 10px;"></i>
                                                    ${l.quantite}
                                                </span>
                                            </td>
                                            <td>
                                                <span class="prix-unitaire">
                                                    <i class="fas fa-coins" style="font-size: 11px;"></i>
                                                    ${l.prix} DH
                                                </span>
                                            </td>
                                            <td>
                                                <span class="sous-total">
                                                    <i class="fas fa-calculator" style="font-size: 11px;"></i>
                                                    ${l.quantite * l.prix} DH
                                                </span>
                                            </td>
                                        </table>
                                    </c:forEach>
                                </tbody>
                            </table>
                        </c:otherwise>
                    </c:choose>

                    <!-- RETOUR -->
                    <div class="footer-actions">
                        <a href="${pageContext.request.contextPath}/commande.do?action=list" class="btn-back">
                            <i class="fas fa-arrow-left"></i>
                            Retour à la liste
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
        // Animation pour les lignes du tableau
        $('.table-modern tbody tr').each(function(index) {
            $(this).css('animation-delay', (index * 0.05) + 's');
        });
        
        // Animation pour les info items
        $('.info-item').each(function(index) {
            $(this).css('animation', 'fadeInUp 0.5s ease backwards');
            $(this).css('animation-delay', (index * 0.1) + 's');
        });
        
        // Effet de survol sur les cartes d'info
        $('.info-item').hover(
            function() {
                $(this).find('.info-icon').css('transform', 'scale(1.05)');
            },
            function() {
                $(this).find('.info-icon').css('transform', 'scale(1)');
            }
        );
    });
</script>

</body>
</html>