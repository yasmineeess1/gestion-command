package ma.formations.jdbc.presentation.filter;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebFilter(urlPatterns = "*.do")
public class AuthFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String path = httpRequest.getServletPath();

        // 1. Pages de connexion/déconnexion autorisées sans vérification
        if (path.equals("/login.do") || path.equals("/logout.do")) {
            chain.doFilter(request, response);
            return;
        }

        // 2. Vérification de l'existence de la session
        String username = (String) httpRequest.getSession().getAttribute("username");
        String role = (String) httpRequest.getSession().getAttribute("role");

        if (username == null) {
            httpResponse.sendRedirect(httpRequest.getContextPath() + "/login.do");
            return;
        }

        // 3. Restriction : Seul l'ADMIN a accès aux articles
        if (path.contains("articles.do") && !role.equalsIgnoreCase("admin")) {
            httpResponse.sendRedirect(httpRequest.getContextPath() + "/commande.do?action=create");
            return;
        }

        // 4. Restriction : L'ADMIN est redirigé s'il tente d'aller sur les commandes d'un client
        if (path.contains("commande.do") && role.equalsIgnoreCase("admin")) {
            // CORRECTION DE LA TYPO ICI : "articles.do" au lieu de "article.do"
            httpResponse.sendRedirect(httpRequest.getContextPath() + "/articles.do?action=list");
            return;
        }

        // Si tout est OK, on laisse passer la requête vers la Servlet demandée
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }
}