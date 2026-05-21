<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier l'Article</title>
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

    /* Header personnalisé si nécessaire */
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
        margin-top: 50px;
        margin-bottom: 50px;
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

    .article-badge {
        background: rgba(255, 255, 255, 0.2);
        padding: 8px 18px;
        border-radius: 50px;
        font-size: 16px;
        font-weight: 600;
        margin-left: 15px;
    }

    /* Corps de la carte */
    .card-body-custom {
        padding: 40px;
    }

    /* =========================
       FORMULAIRES STYLISÉS
    ========================= */
    .form-group-modern {
        margin-bottom: 28px;
        position: relative;
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
        font-size: 16px;
    }

    .input-with-icon {
        position: relative;
    }

    .input-with-icon i {
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        transition: all 0.3s ease;
        z-index: 1;
        font-size: 18px;
    }

    .form-control-modern {
        width: 100%;
        padding: 14px 18px 14px 48px;
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

    .form-control-modern:focus + i {
        color: #667eea;
    }

    /* Pour les champs number */
    input[type=number].form-control-modern {
        -moz-appearance: textfield;
    }

    input[type=number].form-control-modern::-webkit-inner-spin-button,
    input[type=number].form-control-modern::-webkit-outer-spin-button {
        opacity: 0.5;
    }

    /* =========================
       BOUTONS MODERNES
    ========================= */
    .btn-modern {
        padding: 14px 28px;
        border-radius: 18px;
        font-weight: 700;
        font-size: 15px;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
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

    .btn-success-modern:active {
        transform: translateY(0);
    }

    .btn-secondary-modern {
        background: #f3f4f6;
        color: #4b5563;
        border: 2px solid #e5e7eb;
    }

    .btn-secondary-modern:hover {
        background: #e5e7eb;
        transform: translateY(-2px);
        border-color: #d1d5db;
    }

    /* Section des boutons */
    .action-buttons {
        display: flex;
        gap: 15px;
        margin-top: 35px;
        padding-top: 10px;
    }

    /* =========================
       INFO SUPPLEMENTAIRE
    ========================= */
    .info-note {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border-radius: 15px;
        padding: 15px 20px;
        margin-top: 25px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 13px;
        color: #92400e;
    }

    .info-note i {
        font-size: 20px;
    }

    /* =========================
       RESPONSIVE
    ========================= */
    @media (max-width: 768px) {
        .container {
            margin-top: 30px;
            margin-bottom: 30px;
            padding: 0 20px;
        }
        
        .card-body-custom {
            padding: 30px 25px;
        }
        
        .card-header-custom h3 {
            font-size: 22px;
            flex-wrap: wrap;
        }
        
        .card-header-custom h3 i {
            font-size: 26px;
        }
        
        .article-badge {
            font-size: 14px;
            margin-left: 0;
            margin-top: 5px;
        }
        
        .action-buttons {
            flex-direction: column;
        }
        
        .btn-modern {
            width: 100%;
            justify-content: center;
        }
        
        .form-control-modern {
            padding: 12px 15px 12px 45px;
            font-size: 14px;
        }
    }

    @media (max-width: 576px) {
        .card-body-custom {
            padding: 25px 20px;
        }
        
        label {
            font-size: 12px;
        }
        
        .info-note {
            font-size: 11px;
            padding: 12px 15px;
        }
    }

    /* Animation pour les champs */
    .form-group-modern {
        animation: fadeInUp 0.5s ease backwards;
    }

    .form-group-modern:nth-child(1) { animation-delay: 0.1s; }
    .form-group-modern:nth-child(2) { animation-delay: 0.2s; }
    .form-group-modern:nth-child(3) { animation-delay: 0.3s; }

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
        <div class="col-md-8 col-lg-6">
            <div class="main-card">
                <div class="card-header-custom">
                    <h3>
                        <i class="fas fa-edit"></i>
                        Modifier l'article
                        <span class="article-badge">
                            <i class="fas fa-hashtag"></i> ${articleToEdit.id}
                        </span>
                    </h3>
                </div>

                <div class="card-body-custom">
                    <form action="${pageContext.request.contextPath}/articles.do" method="post">
                        
                        <!-- CHAMP CACHÉ : Pour que la Servlet sache quel article modifier -->
                        <input type="hidden" name="id" value="${articleToEdit.id}">
                        <input type="hidden" name="action" value="update">

                        <!-- Description -->
                        <div class="form-group-modern">
                            <label>
                                <i class="fas fa-tag"></i>
                                Description
                            </label>
                            <div class="input-with-icon">
                                <i class="fas fa-pen"></i>
                                <input type="text" 
                                       name="description" 
                                       class="form-control-modern" 
                                       value="${articleToEdit.description}" 
                                       placeholder="Nom de l'article"
                                       required>
                            </div>
                        </div>

                        <!-- Quantité -->
                        <div class="form-group-modern">
                            <label>
                                <i class="fas fa-boxes"></i>
                                Quantité
                            </label>
                            <div class="input-with-icon">
                                <i class="fas fa-cubes"></i>
                                <input type="number" 
                                       step="0.1" 
                                       name="quantite" 
                                       class="form-control-modern" 
                                       value="${articleToEdit.quantite}" 
                                       placeholder="Ex: 10, 15.5"
                                       required>
                            </div>
                        </div>

                        <!-- Prix -->
                        <div class="form-group-modern">
                            <label>
                                <i class="fas fa-euro-sign"></i>
                                Prix
                            </label>
                            <div class="input-with-icon">
                                <i class="fas fa-money-bill-wave"></i>
                                <input type="number" 
                                       step="0.01" 
                                       name="price" 
                                       class="form-control-modern" 
                                       value="${articleToEdit.price}" 
                                       placeholder="Ex: 29.99"
                                       required>
                            </div>
                        </div>

                        <!-- Boutons -->
                        <div class="action-buttons">
                            <button type="submit" class="btn-modern btn-success-modern">
                                <i class="fas fa-save"></i>
                                Enregistrer les modifications
                            </button>
                            <a href="${pageContext.request.contextPath}/articles.do" class="btn-modern btn-secondary-modern">
                                <i class="fas fa-times"></i>
                                Annuler
                            </a>
                        </div>

                        <!-- Note informative -->
                        <div class="info-note">
                            <i class="fas fa-info-circle"></i>
                            <span>Les modifications seront immédiatement appliquées à votre inventaire.</span>
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
        // Validation supplémentaire pour le prix et la quantité
        $('form').on('submit', function(e) {
            var price = parseFloat($('input[name="price"]').val());
            var quantite = parseFloat($('input[name="quantite"]').val());
            var description = $('input[name="description"]').val().trim();
            
            if (description === "") {
                e.preventDefault();
                alert('La description ne peut pas être vide !');
                return false;
            }
            
            if (isNaN(price) || price < 0) {
                e.preventDefault();
                alert('Le prix doit être un nombre valide et non négatif !');
                return false;
            }
            
            if (isNaN(quantite) || quantite < 0) {
                e.preventDefault();
                alert('La quantité doit être un nombre valide et non négative !');
                return false;
            }
            
            // Confirmation avant modification
            return confirm('Confirmez-vous la modification de cet article ?');
        });
        
        // Effet de focus élégant
        $('.form-control-modern').on('focus', function() {
            $(this).closest('.input-with-icon').find('i').css('color', '#667eea');
        }).on('blur', function() {
            if (!$(this).val()) {
                $(this).closest('.input-with-icon').find('i').css('color', '#9ca3af');
            }
        });
        
        // Animation au chargement des valeurs
        $('.form-control-modern').each(function() {
            if ($(this).val()) {
                $(this).closest('.input-with-icon').find('i').css('color', '#667eea');
            }
        });
    });
</script>

</body>
</html>