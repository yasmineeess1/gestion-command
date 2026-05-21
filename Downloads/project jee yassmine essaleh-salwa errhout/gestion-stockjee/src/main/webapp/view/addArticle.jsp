<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter un Article</title>
    <link href="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>

    /* =========================
       RESET & BASE
    ========================= */

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'Inter', sans-serif;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        position: relative;
        overflow-x: hidden;
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
       MAIN CARD
    ========================= */

    .container {
        position: relative;
        z-index: 10;
        padding: 40px 20px;
    }

    .card {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        border-radius: 30px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.3);
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card:hover {
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
    .card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 30px 30px 25px 30px;
        border: none;
        position: relative;
        overflow: hidden;
    }

    .card-header::before {
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

    .card-header h3 {
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

    .card-header h3 i {
        font-size: 32px;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }

    /* Corps de la carte */
    .card-body {
        padding: 40px;
    }

    /* =========================
       FORMULAIRES STYLISÉS
    ========================= */

    .form-group {
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

    .form-control {
        width: 100%;
        padding: 14px 18px;
        border: 2px solid #e5e7eb;
        border-radius: 18px;
        font-size: 15px;
        font-weight: 500;
        transition: all 0.3s ease;
        background: #f9fafb;
        font-family: 'Inter', sans-serif;
    }

    .form-control:focus {
        border-color: #667eea;
        outline: none;
        background: white;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    /* Input avec icône */
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

    .input-with-icon .form-control {
        padding-left: 48px;
    }

    .input-with-icon .form-control:focus + i {
        color: #667eea;
    }

    /* =========================
       BOUTONS MODERNES
    ========================= */

    .btn {
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

    .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:active {
        transform: translateY(0);
    }

    .btn-secondary {
        background: #f3f4f6;
        color: #4b5563;
        border: 2px solid #e5e7eb;
    }

    .btn-secondary:hover {
        background: #e5e7eb;
        transform: translateY(-2px);
        border-color: #d1d5db;
    }

    /* Section des boutons */
    .mt-4 {
        display: flex;
        gap: 15px;
        margin-top: 35px !important;
        padding-top: 10px;
    }

    /* =========================
       RESPONSIVE
    ========================= */

    @media (max-width: 768px) {
        .container {
            padding: 20px 15px;
        }
        
        .card-body {
            padding: 30px 25px;
        }
        
        .card-header h3 {
            font-size: 24px;
        }
        
        .card-header h3 i {
            font-size: 28px;
        }
        
        .btn {
            padding: 12px 24px;
            font-size: 14px;
        }
    }

    @media (max-width: 576px) {
        .card-body {
            padding: 25px 20px;
        }
        
        .mt-4 {
            flex-direction: column;
        }
        
        .btn {
            width: 100%;
            justify-content: center;
        }
    }

    /* Animation pour les champs */
    .form-control {
        animation: fadeInUp 0.5s ease backwards;
    }

    .form-group:nth-child(1) .form-control { animation-delay: 0.1s; }
    .form-group:nth-child(2) .form-control { animation-delay: 0.2s; }
    .form-group:nth-child(3) .form-control { animation-delay: 0.3s; }

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

    /* Toast notification style (optionnel) */
    .toast-custom {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
    }

    </style>
</head>
<body>

<!-- Floating shapes -->
<div class="shape shape-1"></div>
<div class="shape shape-2"></div>
<div class="shape shape-3"></div>

<%@ include file="header.jsp" %>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="card">
                <div class="card-header">
                    <h3>
                        <i class="fas fa-plus-circle"></i>
                        Ajouter un Article
                    </h3>
                </div>

                <div class="card-body">
                    <form action="${pageContext.request.contextPath}/articles.do" method="post" id="articleForm">
                        
                        <!-- Description -->
                        <div class="form-group">
                            <label>
                                <i class="fas fa-tag"></i>
                                Description
                            </label>
                            <div class="input-with-icon">
                                <i class="fas fa-pen"></i>
                                <input type="text" 
                                       name="description" 
                                       class="form-control" 
                                       placeholder="Nom de l'article"
                                       required>
                            </div>
                        </div>

                        <!-- Quantité -->
                        <div class="form-group">
                            <label>
                                <i class="fas fa-boxes"></i>
                                Quantité
                            </label>
                            <div class="input-with-icon">
                                <i class="fas fa-cubes"></i>
                                <input type="number" 
                                       step="0.1" 
                                       name="quantite" 
                                       class="form-control" 
                                       placeholder="Ex: 10, 15.5"
                                       required>
                            </div>
                        </div>

                        <!-- Prix -->
                        <div class="form-group">
                            <label>
                                <i class="fas fa-euro-sign"></i>
                                Prix
                            </label>
                            <div class="input-with-icon">
                                <i class="fas fa-money-bill-wave"></i>
                                <input type="number" 
                                       step="0.01" 
                                       name="price" 
                                       class="form-control" 
                                       placeholder="Ex: 29.99"
                                       required>
                            </div>
                        </div>

                        <!-- Boutons -->
                        <div class="mt-4">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i>
                                Ajouter l'article
                            </button>
                            <a href="${pageContext.request.contextPath}/articles.do" class="btn btn-secondary">
                                <i class="fas fa-times"></i>
                                Annuler
                            </a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/webjars/jquery/3.6.0/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/webjars/bootstrap/4.6.1/js/bootstrap.min.js"></script>

<script>
    // Animation supplémentaire au chargement
    $(document).ready(function() {
        // Validation supplémentaire pour le prix
        $('form').on('submit', function(e) {
            var price = parseFloat($('input[name="price"]').val());
            var quantite = parseFloat($('input[name="quantite"]').val());
            
            if (price < 0) {
                e.preventDefault();
                alert('Le prix ne peut pas être négatif !');
                return false;
            }
            
            if (quantite < 0) {
                e.preventDefault();
                alert('La quantité ne peut pas être négative !');
                return false;
            }
        });
        
        // Effet de focus élégant
        $('.form-control').on('focus', function() {
            $(this).closest('.input-with-icon').find('i').css('color', '#667eea');
        }).on('blur', function() {
            if (!$(this).val()) {
                $(this).closest('.input-with-icon').find('i').css('color', '#9ca3af');
            }
        });
    });
</script>

</body>
</html>