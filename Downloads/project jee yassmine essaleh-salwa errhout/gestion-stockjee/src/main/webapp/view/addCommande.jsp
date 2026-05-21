<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer une Commande</title>

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

    /* Header personnalisé */
    .custom-header {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
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
       FORMULAIRES
    ========================= */
    .form-group-modern {
        margin-bottom: 25px;
    }

    label {
        font-weight: 600;
        color: #374151;
        margin-bottom: 10px;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    label i {
        color: #667eea;
        font-size: 14px;
    }

    .form-control-modern {
        width: 100%;
        padding: 12px 18px;
        border: 2px solid #e5e7eb;
        border-radius: 18px;
        font-size: 15px;
        font-weight: 500;
        transition: all 0.3s ease;
        background: #f9fafb;
        font-family: 'Inter', sans-serif;
    }

    .form-control-modern:focus {
        border-color: #667eea;
        outline: none;
        background: white;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    select.form-control-modern {
        cursor: pointer;
        appearance: none;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
        background-repeat: no-repeat;
        background-position: right 18px center;
    }

    /* =========================
       BOUTONS MODERNES
    ========================= */
    .btn-modern {
        padding: 12px 24px;
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

    .btn-success-modern {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }

    .btn-success-modern:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
    }

    /* =========================
       TABLEAU PANIER
    ========================= */
    .panier-title {
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

    .panier-title i {
        color: #667eea;
        font-size: 24px;
    }

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
        padding: 15px;
        font-weight: 600;
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
        padding: 15px;
        vertical-align: middle;
        color: #4b5563;
        font-weight: 500;
    }

    .badge-quantite {
        display: inline-block;
        padding: 5px 12px;
        background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
        color: #667eea;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
    }

    /* Panier vide */
    .empty-cart {
        text-align: center;
        padding: 60px 20px;
        background: #f9fafb;
        border-radius: 20px;
        margin: 20px 0;
    }

    .empty-cart i {
        font-size: 64px;
        color: #d1d5db;
        margin-bottom: 20px;
    }

    .empty-cart p {
        color: #9ca3af;
        font-size: 16px;
        margin: 0;
    }

    /* Section des boutons */
    .action-buttons {
        display: flex;
        gap: 15px;
        margin-top: 25px;
        justify-content: flex-end;
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
        
        .action-buttons {
            flex-direction: column;
        }
        
        .btn-modern {
            width: 100%;
            justify-content: center;
        }
        
        .table-modern {
            font-size: 14px;
        }
        
        .table-modern thead th,
        .table-modern tbody td {
            padding: 10px;
        }
    }

    /* Animation pour les éléments */
    .row > div {
        animation: fadeInUp 0.5s ease backwards;
    }
    
    .row > div:nth-child(1) { animation-delay: 0.1s; }
    .row > div:nth-child(2) { animation-delay: 0.2s; }
    .row > div:nth-child(3) { animation-delay: 0.3s; }

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

    hr {
        margin: 30px 0;
        border: 0;
        height: 2px;
        background: linear-gradient(to right, transparent, #e5e7eb, transparent);
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
                        <i class="fas fa-shopping-cart"></i>
                        Créer une commande
                    </h3>
                </div>
                
                <div class="card-body-custom">
                    <form action="${pageContext.request.contextPath}/commande.do" method="post">
                        
                        <!-- AJOUT ARTICLE -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group-modern">
                                    <label>
                                        <i class="fas fa-box"></i>
                                        Article
                                    </label>
                                    <select name="articleId" class="form-control-modern">
                                        <c:forEach items="${articles}" var="a">
                                            <option value="${a.id}">
                                                ${a.description} - ${a.price} DH
                                            </option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group-modern">
                                    <label>
                                        <i class="fas fa-cubes"></i>
                                        Quantité
                                    </label>
                                    <input type="number" 
                                           name="quantite" 
                                           class="form-control-modern" 
                                           value="1" 
                                           min="1">
                                </div>
                            </div>

                            <div class="col-md-3 d-flex align-items-end">
                                <div class="form-group-modern w-100">
                                    <button type="submit" name="action" value="addItem" class="btn-modern btn-primary-modern w-100">
                                        <i class="fas fa-plus-circle"></i>
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>

                        <hr>

                        <!-- PANIER -->
                        <div class="panier-title">
                            <i class="fas fa-shopping-basket"></i>
                            <span>Panier actuel</span>
                        </div>

                        <c:if test="${empty panier}">
                            <div class="empty-cart">
                                <i class="fas fa-shopping-cart"></i>
                                <p>Votre panier est vide</p>
                                <small style="color: #9ca3af;">Ajoutez des articles ci-dessus</small>
                            </div>
                        </c:if>

                        <c:if test="${not empty panier}">
                            <table class="table-modern">
                                <thead>
                                    <tr>
                                        <th><i class="fas fa-tag"></i> Article ID</th>
                                        <th><i class="fas fa-cubes"></i> Quantité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <c:forEach items="${panier}" var="p">
                                        <tr>
                                            <td>
                                                <i class="fas fa-box" style="color: #667eea; margin-right: 8px;"></i>
                                                ${p.articleId}
                                            </td>
                                            <td>
                                                <span class="badge-quantite">
                                                    <i class="fas fa-times" style="font-size: 10px;"></i>
                                                    ${p.quantite}
                                                </span>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </tbody>
                            </table>
                        </c:if>

                        <div class="action-buttons">
                            <button type="submit" name="action" value="valider" class="btn-modern btn-success-modern">
                                <i class="fas fa-check-circle"></i>
                                Valider la commande
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/webjars/jquery/3.6.0/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/js/bootstrap.bundle.min.js"></script>

<script>
    $(document).ready(function() {
        // Animation pour le tableau
        $('.table-modern tbody tr').each(function(index) {
            $(this).css('animation-delay', (index * 0.05) + 's');
        });
        
        // Validation de la quantité
        $('form').on('submit', function(e) {
            var quantite = parseInt($('input[name="quantite"]').val());
            if (quantite < 1) {
                e.preventDefault();
                alert('La quantité doit être au moins 1 !');
                return false;
            }
        });
        
        // Effet de focus sur les champs
        $('.form-control-modern').on('focus', function() {
            $(this).css('border-color', '#667eea');
        }).on('blur', function() {
            if (!$(this).val()) {
                $(this).css('border-color', '#e5e7eb');
            }
        });
    });
</script>

</body>
</html>