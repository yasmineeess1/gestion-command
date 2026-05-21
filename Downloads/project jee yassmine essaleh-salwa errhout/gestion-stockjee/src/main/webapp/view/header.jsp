<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="fr">
<head>
    <style>
    /* =========================
       NAVBAR PREMIUM
    ========================= */
    .navbar-premium {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        padding: 1rem 2rem;
        transition: all 0.3s ease;
        border-bottom: 1px solid rgba(102, 126, 234, 0.2);
    }

    .navbar-premium.scrolled {
        padding: 0.7rem 2rem;
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    /* Brand / Logo */
    .navbar-brand-premium {
        font-size: 24px;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .navbar-brand-premium:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        -webkit-background-clip: text;
        background-clip: text;
    }

    .navbar-brand-premium i {
        font-size: 28px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    /* Toggle button */
    .navbar-toggler-premium {
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        padding: 8px 12px;
        transition: all 0.3s ease;
    }

    .navbar-toggler-premium:hover {
        border-color: #667eea;
        background: rgba(102, 126, 234, 0.1);
    }

    .navbar-toggler-premium .navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(102, 126, 234, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }

    /* Navigation links */
    .navbar-nav-premium .nav-link {
        font-weight: 600;
        font-size: 15px;
        padding: 10px 18px;
        margin: 0 5px;
        border-radius: 12px;
        transition: all 0.3s ease;
        color: #4b5563;
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .navbar-nav-premium .nav-link i {
        font-size: 16px;
        transition: all 0.3s ease;
    }

    .navbar-nav-premium .nav-link:hover {
        color: #667eea;
        background: rgba(102, 126, 234, 0.1);
        transform: translateY(-2px);
    }

    .navbar-nav-premium .nav-link.active {
        color: #667eea;
        background: rgba(102, 126, 234, 0.15);
    }

    /* Dropdown menu */
    .dropdown-premium {
        position: relative;
    }

    .dropdown-toggle-premium::after {
        transition: transform 0.3s ease;
    }

    .dropdown-premium.show .dropdown-toggle-premium::after {
        transform: rotate(180deg);
    }

    .dropdown-menu-premium {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(102, 126, 234, 0.2);
        border-radius: 16px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        padding: 8px;
        margin-top: 8px;
        animation: dropdownFadeIn 0.3s ease;
    }

    @keyframes dropdownFadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .dropdown-item-premium {
        padding: 10px 20px;
        border-radius: 12px;
        transition: all 0.3s ease;
        font-weight: 500;
        font-size: 14px;
        color: #4b5563;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .dropdown-item-premium i {
        font-size: 14px;
        color: #667eea;
        width: 20px;
    }

    .dropdown-item-premium:hover {
        background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
        color: #667eea;
        transform: translateX(5px);
    }

    /* Bouton Logout */
    .logout-btn {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white !important;
        border-radius: 12px;
        padding: 8px 20px !important;
        margin-left: 15px;
        box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
    }

    .logout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
    }

    .logout-btn i {
        color: white !important;
    }

    /* User info badge */
    .user-info {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-right: 20px;
        padding: 5px 15px;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 50px;
    }

    .user-info i {
        font-size: 18px;
        color: #667eea;
    }

    .user-info span {
        font-weight: 600;
        color: #374151;
        font-size: 14px;
    }

    .user-role {
        font-size: 11px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        margin-left: 8px;
    }

    /* Responsive */
    @media (max-width: 992px) {
        .navbar-premium {
            padding: 1rem;
        }
        
        .navbar-nav-premium {
            margin-top: 15px;
        }
        
        .navbar-nav-premium .nav-link {
            padding: 8px 15px;
        }
        
        .logout-btn {
            margin-left: 0;
            margin-top: 10px;
            text-align: center;
            justify-content: center;
        }
        
        .user-info {
            margin-right: 0;
            margin-bottom: 10px;
            justify-content: center;
        }
        
        .dropdown-menu-premium {
            background: rgba(255, 255, 255, 0.98);
            border: none;
            box-shadow: none;
            padding-left: 20px;
        }
    }

    @media (max-width: 768px) {
        .navbar-brand-premium {
            font-size: 20px;
        }
        
        .navbar-brand-premium i {
            font-size: 24px;
        }
    }

    /* Animation d'entrée */
    @keyframes navSlideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .navbar-premium {
        animation: navSlideDown 0.5s ease;
    }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-premium">
    <div class="container-fluid">
        <!-- Brand / Logo -->
        <a class="navbar-brand-premium" href="#">
            <i class="fas fa-store"></i>
            <span>Gestion Stock</span>
        </a>

        <!-- Toggle button -->
        <button class="navbar-toggler navbar-toggler-premium" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarPremiumContent" 
                aria-controls="navbarPremiumContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation content -->
        <div class="collapse navbar-collapse" id="navbarPremiumContent">
            <ul class="navbar-nav mr-auto navbar-nav-premium">
                
                <!-- ADMIN MENU -->
                <c:if test="${sessionScope.role == 'ADMIN'}">
                    <li class="nav-item dropdown dropdown-premium">
                        <a class="nav-link dropdown-toggle dropdown-toggle-premium" 
                           href="#" 
                           id="navbarDropdownArticle" 
                           role="button" 
                           data-toggle="dropdown" 
                           aria-haspopup="true" 
                           aria-expanded="false">
                            <i class="fas fa-boxes"></i>
                            Gestion des articles
                        </a>
                        <div class="dropdown-menu dropdown-menu-premium" aria-labelledby="navbarDropdownArticle">
                            <a class="dropdown-item dropdown-item-premium" 
                               href="${pageContext.request.contextPath}/article.do?action=list">
                                <i class="fas fa-list"></i>
                                Consulter les articles
                            </a>
                            <a class="dropdown-item dropdown-item-premium" 
                               href="${pageContext.request.contextPath}/view/addArticle.jsp">
                                <i class="fas fa-plus-circle"></i>
                                Ajouter un article
                            </a>
                        </div>
                    </li>
                </c:if>

                <!-- USER MENU -->
                <c:if test="${sessionScope.role == 'USER'}">
                    <li class="nav-item dropdown dropdown-premium">
                        <a class="nav-link dropdown-toggle dropdown-toggle-premium" 
                           href="#" 
                           id="navbarDropdownCommande" 
                           role="button" 
                           data-toggle="dropdown" 
                           aria-haspopup="true" 
                           aria-expanded="false">
                            <i class="fas fa-shopping-cart"></i>
                            Gestion des commandes
                        </a>
                        <div class="dropdown-menu dropdown-menu-premium" aria-labelledby="navbarDropdownCommande">
                            <a class="dropdown-item dropdown-item-premium" 
                               href="${pageContext.request.contextPath}/commande.do?action=create">
                                <i class="fas fa-plus-circle"></i>
                                Nouvelle commande
                            </a>
                            <a class="dropdown-item dropdown-item-premium" 
                               href="${pageContext.request.contextPath}/commande.do?action=list">
                                <i class="fas fa-history"></i>
                                Historique des commandes
                            </a>
                        </div>
                    </li>
                </c:if>

            </ul>

            <!-- Right side content -->
            <ul class="navbar-nav navbar-nav-premium ml-auto">
                
                <!-- User info (si connecté) -->
                <c:if test="${not empty sessionScope.username}">
                    <li class="nav-item">
                        <div class="user-info">
                            <i class="fas fa-user-circle"></i>
                            <span>${sessionScope.username}</span>
                            <span class="user-role">${sessionScope.role}</span>
                        </div>
                    </li>
                </c:if>

                <!-- Logout button -->
                <li class="nav-item">
                    <a class="nav-link logout-btn" 
                       href="${pageContext.request.contextPath}/logout.do">
                        <i class="fas fa-sign-out-alt"></i>
                        Déconnexion
                    </a>
                </li>

            </ul>
        </div>
    </div>
</nav>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    // Effet de scroll sur la navbar
    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                $('.navbar-premium').addClass('scrolled');
            } else {
                $('.navbar-premium').removeClass('scrolled');
            }
        });
        
        // Gestion active des liens
        var currentUrl = window.location.href;
        $('.nav-link, .dropdown-item-premium').each(function() {
            if (currentUrl.indexOf($(this).attr('href')) !== -1 && $(this).attr('href') !== '#') {
                $(this).addClass('active');
            }
        });
    });
</script>

</body>
</html>