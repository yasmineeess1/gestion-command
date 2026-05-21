package ma.formations.jdbc.dao.commande;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import ma.formations.jdbc.service.model.Commande;
import ma.formations.jdbc.service.model.LigneCommande;

// On conserve STRICTEMENT le nom imposé de la classe
public class CommandeDaoImplJDBC implements ICommandeDao {

    // Initialisation de la fabrique JPA (nom correspondant au persistence.xml)
    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("gestion_stock_pu");

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public void save(Commande c) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();

            // En JPA, il faut lier bidirectionnellement chaque ligne à sa commande
            if (c.getLignes() != null) {
                for (LigneCommande ligne : c.getLignes()) {
                    ligne.setCommande(c);
                }
            }

            // Grâce à cascade = CascadeType.ALL positionné sur l'entité Commande,
            // persist(c) va insérer la commande ET générer automatiquement les inserts pour toutes ses lignes !
            em.persist(c);

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
    public List<Commande> findAll() {
        EntityManager em = getEntityManager();
        try {
            // Requête JPQL simple sur l'entité Commande
            return em.createQuery("SELECT c FROM Commande c", Commande.class).getResultList();
        } finally {
            em.close();
        }
    }

    @Override
    public Commande findById(Long id) {
        EntityManager em = getEntityManager();
        try {
            Commande commande = em.find(Commande.class, id);
            if (commande != null) {
                // Force le chargement des lignes en mémoire (FetchType.LAZY) avant de fermer l'EntityManager
                commande.getLignes().size();
            }
            return commande;
        } finally {
            em.close();
        }
    }

    @Override
    public void delete(Long id) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            
            Commande c = em.find(Commande.class, id);
            if (c != null) {
                // Grâce à CascadeType.ALL, supprimer la commande va supprimer automatiquement 
                // toutes les lignes associées dans 'commande_article' en base de données.
                em.remove(c);
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
    public List<LigneCommande> findLignesByCommandeId(Long commandeId) {
        EntityManager em = getEntityManager();
        try {
            // Requête JPQL pour charger les lignes rattachées à une commande spécifique
            return em.createQuery("SELECT l FROM LigneCommande l WHERE l.commande.id = :cmdId", LigneCommande.class)
                     .setParameter("cmdId", commandeId)
                     .getResultList();
        } finally {
            em.close();
        }
    }
}