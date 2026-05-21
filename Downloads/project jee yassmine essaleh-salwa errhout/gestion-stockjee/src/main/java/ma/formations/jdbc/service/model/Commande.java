package ma.formations.jdbc.service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Commande {
    private Long id;
    private Integer userId;
    private String statut;
    private Double total;
    private java.time.LocalDateTime dateCommande;
    private List<LigneCommande> lignes;
    
}
