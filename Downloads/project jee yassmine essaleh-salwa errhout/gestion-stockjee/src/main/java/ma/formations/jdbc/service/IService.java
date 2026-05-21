package ma.formations.jdbc.service;

import java.util.List;
import ma.formations.jdbc.service.model.Article;
import ma.formations.jdbc.service.model.Commande;
import ma.formations.jdbc.service.model.User;

public interface IService {
    Boolean checkAccount(String username, String password);
    List<Article> getAllArticle();
    
    void addArticle(Article a);
    void updateArticle(Article a);
    void removeArticle(Long id);
    Article getArticleById(Long id);
    List<Article> searchArticles(String keyword);
    User getUserByUsername(String username);
    
    
    
    void addCommande(Commande c);
    List<Commande> getAllCommandes();
    Commande getCommandeById(Long id);
    void deleteCommande(Long id);
}