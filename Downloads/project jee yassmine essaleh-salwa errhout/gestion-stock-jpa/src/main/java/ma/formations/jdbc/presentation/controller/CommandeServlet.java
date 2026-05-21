package ma.formations.jdbc.presentation.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import ma.formations.jdbc.service.IService;
import ma.formations.jdbc.service.ServiceImpl;
import ma.formations.jdbc.service.model.Article;
import ma.formations.jdbc.service.model.Commande;
import ma.formations.jdbc.service.model.LigneCommande;
import ma.formations.jdbc.service.model.User;

@WebServlet("/commande.do")
public class CommandeServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private IService service = new ServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");
        if (action == null) {
            action = "create";
        }

        switch (action) {
            case "create":
                List<Article> articles = service.getAllArticle();
                request.setAttribute("articles", articles);

                HttpSession session = request.getSession();
                request.setAttribute("panier", session.getAttribute("panier"));

                request.getRequestDispatcher("/view/addCommande.jsp").forward(request, response);
                break;
                
            case "view":
                Long idView = Long.parseLong(request.getParameter("id"));
                Commande commande = service.getCommandeById(idView);
                request.setAttribute("commande", commande);

                request.getRequestDispatcher("/view/detailCommande.jsp").forward(request, response);
                break;
                
            case "delete":
                Long idDelete = Long.parseLong(request.getParameter("id"));
                service.deleteCommande(idDelete);

                response.sendRedirect(request.getContextPath() + "/commande.do?action=list");
                break;

            case "list":
                List<Commande> commandes = service.getAllCommandes();
                request.setAttribute("commandes", commandes);

                request.getRequestDispatcher("/view/listCommandes.jsp").forward(request, response);
                break;

            default:
                response.sendRedirect(request.getContextPath() + "/commande.do?action=create");
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession();
        List<LigneCommande> panier = (List<LigneCommande>) session.getAttribute("panier");

        if (panier == null) {
            panier = new ArrayList<>();
            session.setAttribute("panier", panier);
        }

        String action = request.getParameter("action");

        // ==========================================
        // AJOUTER UN ARTICLE AU PANIER (Modifié pour JPA)
        // ==========================================
        if ("addItem".equals(action)) {
            Long articleId = Long.parseLong(request.getParameter("articleId"));
            int quantite = Integer.parseInt(request.getParameter("quantite"));

            // Récupération de l'objet Article complet via JPA
            Article article = service.getArticleById(articleId);

            if (article != null) {
                LigneCommande ligne = new LigneCommande();
                
                // AJUSTEMENT JPA : On passe l'objet Article complet au lieu de l'ID uniquement
                ligne.setArticle(article); 
                ligne.setQuantite(quantite);
                ligne.setPrix(article.getPrice());

                panier.add(ligne);
            }

            response.sendRedirect(request.getContextPath() + "/commande.do?action=create");
            return;
        }

        // ==========================================
        // VALIDER LA COMMANDE
        // ==========================================
        if ("valider".equals(action)) {
            if (panier.isEmpty()) {
                response.sendRedirect(request.getContextPath() + "/commande.do?action=create");
                return;
            }

            String username = (String) session.getAttribute("username");
            User user = service.getUserByUsername(username);

            if (user == null) {
                response.sendRedirect(request.getContextPath() + "/login.do");
                return;
            }

            Commande c = new Commande();
            // Utilise l'ID de l'utilisateur connecté
            c.setUserId(user.getId().intValue());
            c.setStatut("EN_COURS");
            c.setDateCommande(java.time.LocalDateTime.now()); // Ajout automatique de la date actuelle
            c.setLignes(panier);

            // Calcul du montant total
            double total = 0;
            for (LigneCommande l : panier) {
                total += l.getQuantite() * l.getPrix();
            }
            c.setTotal(total);

            // Envoi au service JPA (L'EntityManager va propager la persistence aux lignes automatiquement)
            service.addCommande(c);

            // Nettoyage du panier après validation
            session.removeAttribute("panier");

            response.sendRedirect(request.getContextPath() + "/commande.do?action=list");
            return;
        }

        response.sendRedirect(request.getContextPath() + "/commande.do?action=create");
    }
}