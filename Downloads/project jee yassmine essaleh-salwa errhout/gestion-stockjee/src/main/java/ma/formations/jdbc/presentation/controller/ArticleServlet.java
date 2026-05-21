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
    private final IService service = new ServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");
        String idParam = request.getParameter("id");

        // 🔴 DELETE
        if ("delete".equals(action)) {

            try {
                if (idParam != null && !idParam.isBlank()) {
                    Long id = Long.parseLong(idParam);
                    service.removeArticle(id);
                }
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }

            response.sendRedirect("articles.do");
            return;
        }

        // ✏ EDIT
        if ("edit".equals(action)) {

            try {
                if (idParam != null && !idParam.isBlank()) {

                    Long id = Long.parseLong(idParam);
                    Article art = service.getArticleById(id);

                    if (art == null) {
                        response.sendRedirect("articles.do");
                        return;
                    }

                    request.setAttribute("articleToEdit", art);
                    request.getRequestDispatcher("/view/editArticle.jsp")
                           .forward(request, response);
                    return;
                }

            } catch (NumberFormatException e) {
                e.printStackTrace();
            }

            response.sendRedirect("articles.do");
            return;
        }

        // 📄 LIST + SEARCH
        String keyword = request.getParameter("keyword");

        List<Article> articles;

        if (keyword != null && !keyword.isBlank()) {
            articles = service.searchArticles(keyword);
        } else {
            articles = service.getAllArticle();
        }

        request.setAttribute("articles", articles);
        request.getRequestDispatcher("/view/welcome.jsp")
               .forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {
            String idStr = request.getParameter("id");
            String desc = request.getParameter("description");
            String qteStr = request.getParameter("quantite");
            String prixStr = request.getParameter("price");

            if (desc == null || desc.isBlank()) {
                throw new IllegalArgumentException("Description obligatoire");
            }

            double qte = (qteStr != null && !qteStr.isBlank())
                    ? Double.parseDouble(qteStr)
                    : 0;

            double prix = (prixStr != null && !prixStr.isBlank())
                    ? Double.parseDouble(prixStr)
                    : 0;

            Article art = new Article();
            art.setDescription(desc);
            art.setQuantite(qte);
            art.setPrice(prix);

            if (idStr == null || idStr.isBlank()) {
                service.addArticle(art);
            } else {
                art.setId(Long.parseLong(idStr));
                service.updateArticle(art);
            }

        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_BAD_REQUEST,
                    "Erreur lors du traitement de l'article");
            return;
        }

        response.sendRedirect("articles.do");
    }
}