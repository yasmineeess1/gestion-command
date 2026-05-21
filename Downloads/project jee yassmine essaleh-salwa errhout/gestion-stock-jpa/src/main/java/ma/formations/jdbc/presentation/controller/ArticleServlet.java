package ma.formations.jdbc.presentation.controller;

import java.io.IOException;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ma.formations.jdbc.service.IService;
import ma.formations.jdbc.service.ServiceImpl;
import ma.formations.jdbc.service.model.Article;

@WebServlet("/articles.do")
public class ArticleServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    // Le contrôleur appelle l'interface, et c'est notre ServiceImpl JPA qui va répondre !
    private IService service = new ServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String action = request.getParameter("action");
        String idParam = request.getParameter("id"); 

        // 1. SUPPRIMER UN ARTICLE
        if ("delete".equals(action)) {
            if (idParam != null && !idParam.isEmpty()) { 
                Long id = Long.parseLong(idParam);
                service.removeArticle(id); 
            }
            response.sendRedirect("articles.do"); 
            return;
        } 
        
        // 2. PRÉPARER LA MODIFICATION
        else if ("edit".equals(action)) {
            if (idParam != null && !idParam.isEmpty()) {
                Long id = Long.parseLong(idParam);
                Article art = service.getArticleById(id);
                request.setAttribute("articleToEdit", art);
                
                request.getRequestDispatcher("/view/editArticle.jsp").forward(request, response);
            } else {
                response.sendRedirect("articles.do");
            }
            return;
        }

        // 3. AFFICHAGE DE LA LISTE / RECHERCHE
        String keyword = request.getParameter("keyword");
        List<Article> articles;

        if (keyword != null && !keyword.isEmpty()) {
            articles = service.searchArticles(keyword); // Utilise la requête JPQL avec LIKE %keyword%
        } else {
            articles = service.getAllArticle(); // Utilise SELECT a FROM Article a
        }

        request.setAttribute("articles", articles);
        request.getRequestDispatcher("/view/welcome.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        try {
            String idStr = request.getParameter("id");
            String desc = request.getParameter("description");
            String qteStr = request.getParameter("quantite");
            String prixStr = request.getParameter("price");

            // 🛠️ CORRECTION : Parser directement en Double pour accepter les valeurs comme "12.0" ou "12.5"
            double qte = (qteStr != null && !qteStr.isEmpty()) ? Double.parseDouble(qteStr) : 0.0;
            double prix = (prixStr != null && !prixStr.isEmpty()) ? Double.parseDouble(prixStr) : 0.0;

            Article art = new Article();
            art.setDescription(desc);
            art.setQuantite(qte); // 🛠️ Plus besoin de cast (double), qte est déjà un type double !
            art.setPrice(prix);

            if (idStr == null || idStr.isEmpty()) {
                service.addArticle(art); // Va appeler em.persist(art)
            } else {
                art.setId(Long.parseLong(idStr));
                service.updateArticle(art); // Va appeler em.merge(art)
            }
        } catch (Exception e) {
            e.printStackTrace(); 
        }

        response.sendRedirect("articles.do");
    }
}