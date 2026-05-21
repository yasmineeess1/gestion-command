package ma.formations.jdbc.service;

import java.util.List;
import ma.formations.jdbc.dao.DaoImplJDBC;
import ma.formations.jdbc.dao.IDao;
import ma.formations.jdbc.dao.article.ArticleDaoImplJDBC;
import ma.formations.jdbc.dao.article.IArticleDao;
import ma.formations.jdbc.dao.commande.CommandeDaoImplJDBC;
import ma.formations.jdbc.service.model.Article;
import ma.formations.jdbc.service.model.User;
import ma.formations.jdbc.dao.commande.ICommandeDao;
import ma.formations.jdbc.service.model.Commande;
import ma.formations.jdbc.service.model.LigneCommande;

public class ServiceImpl implements IService {
    private IDao dao = new DaoImplJDBC();
    private IArticleDao daoArticle = new ArticleDaoImplJDBC();

    @Override
    public Boolean checkAccount(String username, String password) {
        User u = dao.getUserByUsername(username);
        if (u == null)
            return false;
        return (password.equals(u.getPassword()));
    }

    @Override
    public List<Article> getAllArticle() {
        return daoArticle.findAll();
    }

    // Implémentation du CRUD
    @Override
    public void addArticle(Article a) {
        daoArticle.save(a);
    }

    @Override
    public void updateArticle(Article a) {
        daoArticle.update(a);
    }

    @Override
    public void removeArticle(Long id) {
        daoArticle.delete(id);
    }

    @Override
    public Article getArticleById(Long id) {
        return daoArticle.findById(id);
    }
    @Override
    public List<Article> searchArticles(String keyword) {
        return daoArticle.search(keyword);
    }







    private ICommandeDao daoCommande; // Déclaration simple[cite: 1]

    public ServiceImpl() {
        this.daoCommande = new CommandeDaoImplJDBC(); // Initialisation ici[cite: 1]
    }

    @Override
    public void addCommande(Commande c) {

        if (c.getLignes() == null || c.getLignes().isEmpty()) {
            throw new RuntimeException("Une commande doit contenir au moins un article");
        }

        daoCommande.save(c);
    }

    @Override
    public List<Commande> getAllCommandes() {
        return daoCommande.findAll();
    }

    public Commande getCommandeById(Long id) {

        Commande commande = daoCommande.findById(id);

        if (commande != null) {

            List<LigneCommande> lignes =
                    daoCommande.findLignesByCommandeId(id);

            commande.setLignes(lignes);
        }

        return commande;
    }

    @Override
    public void deleteCommande(Long id) {
        daoCommande.delete(id);
    }
    
    @Override
    public User getUserByUsername(String username) {
        return dao.getUserByUsername(username);
    }
}