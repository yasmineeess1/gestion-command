<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="fr">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Authentification </title>
<link href="webjars/bootstrap/4.6.1/css/bootstrap.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<style>

/* =========================
   RESET & BASE
========================= */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family: 'Inter', sans-serif;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow:hidden;
}

/* Animated background */
body::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: shift 20s linear infinite;
    opacity: 0.5;
}

@keyframes shift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
}

/* Floating shapes */
.shape {
    position: absolute;
    filter: blur(60px);
    opacity: 0.3;
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
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
   LOGIN CARD
========================= */

#formContent {
    position: relative;
    width: 480px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    padding: 50px 45px;
    border-radius: 30px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    text-align: center;
    z-index: 10;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

#formContent:hover {
    transform: translateY(-5px);
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}

/* =========================
   ICON SECTION
========================= */

.icon-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 25px;
}

#icon {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
    box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.4);
    transition: transform 0.3s ease;
}

#icon:hover {
    transform: scale(1.05);
}

/* =========================
   TITLE
========================= */

h2 {
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
}

.subtitle {
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 30px;
    font-weight: 400;
}

/* =========================
   ERROR MESSAGE
========================= */

#error {
    background: linear-gradient(135deg, #fee 0%, #ffe 100%);
    color: #dc2626;
    padding: 12px;
    border-radius: 15px;
    margin-bottom: 20px;
    font-size: 13px;
    font-weight: 500;
    border-left: 4px solid #dc2626;
    text-align: left;
    display: ${empty AccountIncorrect ? 'none' : 'block'};
}

/* =========================
   INPUTS MODERNES
========================= */

.input-group {
    position: relative;
    margin-bottom: 25px;
}

.input-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    transition: all 0.3s ease;
    z-index: 1;
}

input[type=text],
input[type=password] {
    width: 100%;
    padding: 15px 15px 15px 45px;
    border: 2px solid #e5e7eb;
    border-radius: 18px;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.3s ease;
    background: #f9fafb;
    font-family: 'Inter', sans-serif;
}

input[type=text]:focus,
input[type=password]:focus {
    border-color: #667eea;
    outline: none;
    background: white;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

input[type=text]:focus + .input-icon,
input[type=password]:focus + .input-icon {
    color: #667eea;
}

/* =========================
   BUTTON MODERNE
========================= */

.login-btn {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    border: none;
    border-radius: 18px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
}

.login-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.login-btn:hover::before {
    width: 300px;
    height: 300px;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.5);
}

.login-btn:active {
    transform: translateY(0);
}

/* =========================
   FOOTER
========================= */

#formFooter {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #e5e7eb;
}

#formFooter a {
    color: #6b7280;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

#formFooter a i {
    font-size: 12px;
    transition: transform 0.3s ease;
}

#formFooter a:hover {
    color: #667eea;
}

#formFooter a:hover i {
    transform: translateX(3px);
}

/* Options supplémentaires */
.options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    font-size: 13px;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    cursor: pointer;
}

.remember-me input {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #667eea;
}

.forgot-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
}

.forgot-link:hover {
    text-decoration: underline;
}

/* Social login */
.social-login {
    margin-top: 25px;
}

.social-login p {
    color: #9ca3af;
    font-size: 12px;
    margin-bottom: 15px;
    position: relative;
}

.social-login p::before,
.social-login p::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: #e5e7eb;
}

.social-login p::before {
    left: 0;
}

.social-login p::after {
    right: 0;
}

.social-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.social-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid #e5e7eb;
}

.social-icon i {
    font-size: 20px;
    transition: all 0.3s ease;
}

.social-icon:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-icon.google:hover {
    background: #db4437;
    border-color: #db4437;
}

.social-icon.google:hover i {
    color: white;
}

.social-icon.github:hover {
    background: #333;
    border-color: #333;
}

.social-icon.github:hover i {
    color: white;
}

/* =========================
   RESPONSIVE
========================= */

@media(max-width: 580px) {
    #formContent {
        width: 92%;
        padding: 35px 25px;
        margin: 20px;
    }
    
    h2 {
        font-size: 28px;
    }
    
    #icon {
        width: 70px;
        height: 70px;
        padding: 15px;
    }
}

/* Animation d'entrée */
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

#formContent {
    animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

</style>

</head>

<body>

<!-- Animated background shapes -->
<div class="shape shape-1"></div>
<div class="shape shape-2"></div>
<div class="shape shape-3"></div>

<div id="formContent">

    <!-- ICON SECTION -->
    <div class="icon-wrapper">
        <img src="static/images/login.jpg" id="icon" alt="User Icon">
    </div>

    <!-- TITLE -->
    <h2>Bienvenue</h2>
    <div class="subtitle">Connectez-vous à votre compte</div>

    <!-- ERROR MESSAGE -->
    <div id="error">
        <i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>
        ${AccountIncorrect}
    </div>

    <!-- LOGIN FORM -->
    <form action="${pageContext.request.contextPath}/login.do" method="post">
        
        <div class="input-group">
            <i class="fas fa-user input-icon"></i>
            <input type="text" 
                   name="username" 
                   placeholder="Nom d'utilisateur" 
                   required>
        </div>

        <div class="input-group">
            <i class="fas fa-lock input-icon"></i>
            <input type="password" 
                   name="password" 
                   placeholder="Mot de passe" 
                   required>
        </div>

        <div class="options">
            <label class="remember-me">
                <input type="checkbox" name="remember"> Se souvenir de moi
            </label>
            <a href="#" class="forgot-link">Mot de passe oublié ?</a>
        </div>

        <button type="submit" class="login-btn">
            Se connecter <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
        </button>

    </form>

    <!-- SOCIAL LOGIN -->
    <div class="social-login">
        <p>Ou continuer avec</p>
        <div class="social-icons">
            <div class="social-icon google">
                <i class="fab fa-google"></i>
            </div>
            <div class="social-icon github">
                <i class="fab fa-github"></i>
            </div>
        </div>
    </div>

    <!-- FOOTER -->
    <div id="formFooter">
        <a href="#">
            <i class="fas fa-user-plus"></i> Créer un compte
        </a>
    </div>

</div>

<script src="webjars/jquery/3.6.0/jquery.min.js"></script>
<script src="webjars/bootstrap/4.6.1/js/bootstrap.min.js"></script>

</body>
</html>