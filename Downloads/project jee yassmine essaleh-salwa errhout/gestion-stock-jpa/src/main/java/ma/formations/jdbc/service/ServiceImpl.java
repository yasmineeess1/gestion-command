package ma.formations.jdbc.service;

import java.util.List;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import ma.formations.jdbc.service.model.Article;
import ma.formations.jdbc.service.model.Commande;
import ma.formations.jdbc.service.model.User;

public class ServiceImpl implements IService {

    // 1. Déclaration de la fabrique et du gestionnaire JPA
    // "gestion_stock_pu" doit correspondre exactement au nom dans votre fichier persistence.xml
    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("gestion_stock_jpa");

    // Méthode utilitaire pour obtenir un EntityManager propre à chaque action
    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public Boolean checkAccount(String username, String password) {
        User u = getUserByUsername(username);
        if (u == null) {
            return false;
        }
        return password.equals(u.getPassword());
    }

    @Override
    public User getUserByUsername(String username) {
        EntityManager em = getEntityManager();
        try {
            // Requête JPQL pour chercher par nom d'utilisateur (Sensible à la casse de la classe "User")
            return em.createQuery("SELECT u FROM User u WHERE u.username = :user", User.class)
                     .setParameter("user", username)
                     .getSingleResult();
        } catch (Exception e) {
            // Si aucun utilisateur n'est trouvé, getSingleResult() lève une exception, on renvoie null
            return null;
        } finally {
            em.close();
        }
    }

    @Override
    public List<Article> getAllArticle() {
        EntityManager em = getEntityManager();
        try {
            return em.createQuery("SELECT a FROM Article a", Article.class).getResultList();
        } finally {
            em.close();
        }
    }

    @Override
    public void addArticle(Article a) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(a); // Enregistre l'article
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    @Override
    public void updateArticle(Article a) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(a); // Met à jour l'article existant
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    @Override
    public void removeArticle(Long id) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Article a = em.find(Article.class, id);
            if (a != null) {
                em.remove(a); // Supprime l'article
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    @Override
    public Article getArticleById(Long id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Article.class, id);
        } finally {
            em.close();
        }
    }

    @Override
    public List<Article> searchArticles(String keyword) {
        EntityManager em = getEntityManager();
        try {
            return em.createQuery("SELECT a FROM Article a WHERE a.description LIKE :key", Article.class)
                     .setParameter("key", "%" + keyword + "%")
                     .getResultList();
        } finally {
            em.close();
        }
    }

    @Override
    public void addCommande(Commande c) {
        if (c.getLignes() == null || c.getLignes().isEmpty()) {
            throw new RuntimeException("Une commande doit contenir au moins un article");
        }
        
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            
            // Lier chaque ligne à la commande pour la cohérence des clés étrangères
            c.getLignes().forEach(ligne -> ligne.setCommande(c));
            
            em.persist(c); // Grâce au CascadeType.ALL sur la classe Commande, persister "c" va persister ses lignes en même temps !
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    @Override
    public List<Commande> getAllCommandes() {
        EntityManager em = getEntityManager();
        try {
            return em.createQuery("SELECT c FROM Commande c", Commande.class).getResultList();
        } finally {
            em.close();
        }
    }

    @Override
    public Commande getCommandeById(Long id) {
        EntityManager em = getEntityManager();
        try {
            Commande commande = em.find(Commande.class, id);
            if (commande != null) {
                // Force le chargement des lignes de commande en mémoire avant de fermer l'EntityManager
                commande.getLignes().size(); 
            }
            return commande;
        } finally {
            em.close();
        }
    }

    @Override
    public void deleteCommande(Long id) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Commande c = em.find(Commande.class, id);
            if (c != null) {
                em.remove(c); // Supprime la commande (et ses lignes grâce au CascadeType.ALL)
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
}