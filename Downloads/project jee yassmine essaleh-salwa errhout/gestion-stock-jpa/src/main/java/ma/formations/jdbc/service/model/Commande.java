package ma.formations.jdbc.service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity // 1. Déclare la classe comme table gérée par JPA
@Table(name = "commande") // 2. Nom de la table SQL
public class Commande {

    @Id // 3. Clé primaire
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 4. Auto-incrément MySQL
    private Long id;

    @Column(name = "user_id") // Optionnel : pour correspondre au standard SQL user_id
    private Integer userId;

    private String statut;

    private Double total;

    @Column(name = "date_commande") // Optionnel : évite les conflits de majuscules en SQL
    private java.time.LocalDateTime dateCommande;

    // 5. Relation d'une commande vers plusieurs lignes de commande
    // mappedBy = "commande" signifie que c'est la classe LigneCommande qui aura le champ @ManyToOne private Commande commande;
    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LigneCommande> lignes;
}