package ma.formations.jdbc.dao.article;

import java.util.List;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import ma.formations.jdbc.service.model.Article;

// On garde STRICTEMENT le nom de classe d'origine
public class ArticleDaoImplJDBC implements IArticleDao {

    // Initialisation de la fabrique JPA (le nom doit correspondre au persistence.xml)
    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("gestion_stock_pu");

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public List<Article> findAll() {
        EntityManager em = getEntityManager();
        try {
            // Requête JPQL sur l'entité Article
            return em.createQuery("SELECT a FROM Article a", Article.class).getResultList();
        } finally {
            em.close();
        }
    }

    @Override
    public void save(Article a) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(a); // Remplace le INSERT INTO
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            em.close();
        }
    }

    @Override
    public void update(Article a) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(a); // Remplace le UPDATE
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            em.close();
        }
    }

    @Override
    public void delete(Long id) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Article a = em.find(Article.class, id);
            if (a != null) {
                em.remove(a); // Remplace le DELETE FROM
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            em.close();
        }
    }

    @Override
    public Article findById(Long id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Article.class, id); // Remplace le SELECT WHERE ID=?
        } finally {
            em.close();
        }
    }

    @Override
    public List<Article> search(String keyword) {
        EntityManager em = getEntityManager();
        try {
            // Requête JPQL sécurisée avec LIKE
            return em.createQuery("SELECT a FROM Article a WHERE a.description LIKE :key", Article.class)
                     .setParameter("key", "%" + keyword + "%")
                     .getResultList();
        } finally {
            em.close();
        }
    }
}