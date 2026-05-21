package ma.formations.jdbc.presentation.controller;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/logout.do")
public class LogoutServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 1. On détruit complètement la session actuelle (efface le username, rôle, panier, etc.)
        request.getSession().invalidate();
        
        // 2. On renvoie proprement l'utilisateur vers la page de connexion
        request.getRequestDispatcher("/view/login.jsp").forward(request, response);
    }
}