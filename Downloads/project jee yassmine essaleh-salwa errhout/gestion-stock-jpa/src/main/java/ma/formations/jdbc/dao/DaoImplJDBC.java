package ma.formations.jdbc.dao;

import java.util.List;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.NoResultException;
import ma.formations.jdbc.service.model.User;

// On conserve STRICTEMENT le nom de la classe d'origine
public class DaoImplJDBC implements IDao {

    // Initialisation de la fabrique JPA (le nom doit être identique à celui du persistence.xml)
    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("gestion_stock_pu");

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public List<User> findAllUsers() {
        EntityManager em = getEntityManager();
        try {
            // Requête JPQL basée sur la classe Entité "User" (attention à la casse)
            return em.createQuery("SELECT u FROM User u", User.class).getResultList();
        } finally {
            em.close(); // Libération systématique des ressources
        }
    }

    @Override
    public User getUserByUsername(String username) {
        EntityManager em = getEntityManager();
        try {
            // Requête JPQL sécurisée avec un paramètre nommé (:user) pour contrer les injections SQL
            return em.createQuery("SELECT u FROM User u WHERE u.username = :user", User.class)
                     .setParameter("user", username)
                     .getSingleResult(); // Récupère directement l'unique ligne correspondante
        } catch (NoResultException e) {
            // JPA lève une exception NoResultException si aucun utilisateur ne correspond, on retourne null proprement
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            em.close();
        }
    }
}