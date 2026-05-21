package ma.formations.jdbc.service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LigneCommande {
    private Long articleId;
    private Long commandeId;
    private int quantite;
    private double prix;
    private String description;
}