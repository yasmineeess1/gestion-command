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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ligne_commande")
public class LigneCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Ajout d'une clé primaire auto-incrémentée pour la ligne

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false) // Remplace private Long articleId;
    private Article article;

    @ManyToOne
    @JoinColumn(name = "commande_id", nullable = false) // Remplace private Long commandeId;
    private Commande commande;

    @Column(nullable = false)
    private int quantite;

    @Column(nullable = false)
    private double prix;
}