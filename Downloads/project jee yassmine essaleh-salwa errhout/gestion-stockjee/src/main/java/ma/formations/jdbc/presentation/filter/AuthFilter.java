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
    public void init(FilterConfig filterConfig)
            throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest =
                (HttpServletRequest) request;

        HttpServletResponse httpResponse =
                (HttpServletResponse) response;

        String path = httpRequest.getServletPath();

        // login/logout autorisés
        if (path.equals("/login.do")
                || path.equals("/logout.do")) {

            chain.doFilter(request, response);
            return;
        }

        // vérifier session
        String username = (String)
                httpRequest.getSession()
                        .getAttribute("username");
        String role = (String)
                httpRequest.getSession()
                        .getAttribute("role");

        if (username == null) {

            httpResponse.sendRedirect(
                    httpRequest.getContextPath()
                            + "/login.do");
            return;
        }

        // ADMIN → accès article
        if (path.contains("articles.do")
                && !role.equalsIgnoreCase("admin")) {

            httpResponse.sendRedirect(
                    httpRequest.getContextPath()
                            + "/commande.do?action=create");
            return;
        }
     // USER → accès commande
        if (path.contains("commande.do")
                && role.equalsIgnoreCase("admin")) {

            httpResponse.sendRedirect(
                    httpRequest.getContextPath()
                            + "/article.do?action=list");
            return;
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }
}