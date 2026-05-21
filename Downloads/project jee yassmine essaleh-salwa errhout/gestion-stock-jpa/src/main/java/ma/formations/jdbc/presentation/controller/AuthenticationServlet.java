package ma.formations.jdbc.presentation.controller;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ma.formations.jdbc.service.IService;
import ma.formations.jdbc.service.ServiceImpl;
import ma.formations.jdbc.service.model.User;

@WebServlet("/login.do")
public class AuthenticationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    // Appel du service générique (qui tourne maintenant sous JPA)
    private IService service = new ServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Affiche la page de connexion
        request.getRequestDispatcher("/view/login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // 1. Vérification des identifiants (via JPA SELECT u FROM User u...)
        if (!service.checkAccount(username, password)) {
            request.setAttribute("AccountIncorrect", "Login or password incorrect !");
            request.getRequestDispatcher("/view/login.jsp").forward(request, response);
            return; // On arrête l'exécution ici pour éviter les bugs de double redirection
        } 
        
        // 2. Si le compte est correct, on récupère l'objet User complet
        User user = service.getUserByUsername(username);

        if (user != null) {
            // Sauvegarde des informations importantes dans la session HTTP
            request.getSession().setAttribute("username", username);
            request.getSession().setAttribute("role", user.getRole());

            // 3. Redirection automatique selon le rôle de l'utilisateur
            if (user.getRole().equalsIgnoreCase("admin")) {
                response.sendRedirect(request.getContextPath() + "/articles.do?action=list");
            } else {
                response.sendRedirect(request.getContextPath() + "/commande.do?action=create");
            }
        } else {
            // Sécurité au cas où l'utilisateur aurait disparu entre-temps
            request.setAttribute("AccountIncorrect", "Une erreur est survenue lors de la connexion.");
            request.getRequestDispatcher("/view/login.jsp").forward(request, response);
        }
    }
}