<style>
/* =========================
   FOOTER PREMIUM
   ========================= */
.footer-premium {
    position: relative;
    background: linear-gradient(135deg, #1a1c2e 0%, #2d1b3e 100%);
    color: #ffffff;
    padding: 60px 0 30px 0;
    margin-top: 60px;
    overflow: hidden;
}

/* Effet de particules animées */
.footer-premium::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #667eea);
    background-size: 200% 100%;
    animation: gradientMove 3s linear infinite;
}

@keyframes gradientMove {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
}

.footer-premium::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: shift 20s linear infinite;
    opacity: 0.3;
    pointer-events: none;
}

/* Conteneur principal */
.footer-container {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Section sociale */
.footer-social {
    text-align: center;
    padding-bottom: 35px;
    margin-bottom: 25px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.social-title {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 20px;
    font-weight: 600;
}

.social-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.social-icon {
    width: 45px;
    height: 45px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: white;
    text-decoration: none;
    font-size: 22px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-icon:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.4);
    color: white;
    text-decoration: none;
}

/* Navigation */
.footer-nav {
    text-align: center;
    margin-bottom: 30px;
}

.footer-nav ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
}

.footer-nav li a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    padding: 5px 0;
    font-family: 'Inter', sans-serif;
}

.footer-nav li a::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
}

.footer-nav li a:hover {
    color: white;
    text-decoration: none;
}

.footer-nav li a:hover::before {
    width: 100%;
}

/* Newsletter (optionnel) */
.footer-newsletter {
    text-align: center;
    margin-bottom: 35px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    backdrop-filter: blur(10px);
}

.newsletter-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    color: white;
}

.newsletter-form {
    display: flex;
    justify-content: center;
    gap: 10px;
    max-width: 450px;
    margin: 0 auto;
    flex-wrap: wrap;
}

.newsletter-input {
    flex: 1;
    padding: 12px 18px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;
}

.newsletter-input:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.15);
}

.newsletter-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.newsletter-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 15px;
    color: white;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.newsletter-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Copyright */
.footer-copyright {
    text-align: center;
    margin-top: 30px;
    padding-top: 25px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-copyright p {
    margin: 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.5px;
}

.footer-copyright p i {
    margin: 0 5px;
    font-size: 12px;
}

/* Responsive */
@media (max-width: 768px) {
    .footer-premium {
        padding: 40px 0 25px 0;
    }
    
    .social-icon {
        width: 40px;
        height: 40px;
        font-size: 18px;
    }
    
    .footer-nav ul {
        gap: 20px;
    }
    
    .footer-nav li a {
        font-size: 13px;
    }
    
    .newsletter-form {
        flex-direction: column;
        padding: 0 20px;
    }
    
    .newsletter-btn {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 576px) {
    .footer-nav ul {
        gap: 15px;
        flex-direction: column;
        align-items: center;
    }
    
    .social-icons {
        gap: 12px;
    }
}

/* Animation d'entrée */
.footer-premium {
    animation: footerSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes footerSlideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<div class="footer-premium">
    <div class="footer-container">
        <!-- Section Social Media -->
        <div class="footer-social">
            <div class="social-title">
                <i class="fas fa-share-alt" style="margin-right: 8px;"></i>
                SUIVEZ-NOUS
            </div>
            <div class="social-icons">
                <a href="#" class="social-icon" title="Facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon" title="Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon" title="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="social-icon" title="LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="social-icon" title="GitHub">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>

        <!-- Section Newsletter (optionnelle) -->
        <div class="footer-newsletter">
            <div class="newsletter-title">
                <i class="fas fa-envelope" style="margin-right: 8px;"></i>
                RESTEZ INFORMÉ
            </div>
            <form class="newsletter-form" onsubmit="return false;">
                <input type="email" class="newsletter-input" placeholder="Votre adresse email" required>
                <button type="submit" class="newsletter-btn">
                    <i class="fas fa-paper-plane"></i>
                    S'abonner
                </button>
            </form>
        </div>

        <!-- Navigation Links -->
        <div class="footer-nav">
            <ul>
                <li><a href="#"><i class="fas fa-home" style="margin-right: 5px;"></i>Accueil</a></li>
                <li><a href="#"><i class="fas fa-boxes" style="margin-right: 5px;"></i>Articles</a></li>
                <li><a href="#"><i class="fas fa-shopping-cart" style="margin-right: 5px;"></i>Commandes</a></li>
                <li><a href="#"><i class="fas fa-info-circle" style="margin-right: 5px;"></i>À propos</a></li>
                <li><a href="#"><i class="fas fa-gavel" style="margin-right: 5px;"></i>Conditions</a></li>
                <li><a href="#"><i class="fas fa-lock" style="margin-right: 5px;"></i>Confidentialité</a></li>
            </ul>
        </div>

        <!-- Copyright -->
        <div class="footer-copyright">
            <p>
                <i class="far fa-copyright"></i> 
                2024 Formation Servlets | Tous droits réservés
                <i class="fas fa-heart" style="color: #ef4444; margin: 0 5px;"></i>
                Développé avec passion
            </p>
        </div>
    </div>
</div>

<script>
// Animation de newsletter (optionnel)
$(document).ready(function() {
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        var email = $(this).find('.newsletter-input').val();
        if (email) {
            alert('Merci pour votre abonnement ! Vous recevrez nos actualités prochainement.');
            $(this).find('.newsletter-input').val('');
        }
    });
});
</script>