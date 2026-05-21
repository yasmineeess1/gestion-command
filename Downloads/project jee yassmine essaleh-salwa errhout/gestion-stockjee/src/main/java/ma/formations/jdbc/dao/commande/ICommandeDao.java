package ma.formations.jdbc.dao.commande;
import java.util.List;

import ma.formations.jdbc.service.model.Commande;
import ma.formations.jdbc.service.model.LigneCommande;

public interface ICommandeDao {
    void save(Commande c);
    List<Commande> findAll();
    Commande findById(Long id);
    void delete(Long id);
    List<LigneCommande> findLignesByCommandeId(Long commandeId);
}
