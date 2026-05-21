package ma.formations.jdbc.service.model; // Vous pourrez renommer "jdbc" en "jpa" plus tard si vous le souhaitez !

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity // 1. Indique que cette classe est une entité JPA liée à une table
@Table(name = "article") // 2. Optionnel : Précise le nom de la table dans la base de données
public class Article {

	@Id // 3. Indique que ce champ est la clé primaire
	@GeneratedValue(strategy = GenerationType.IDENTITY) // 4. Active l'auto-incrément (comme en SQL)
	private Long id;

	@Column(name = "description", nullable = false, length = 255) // 5. Optionnel : Donne des détails sur la colonne
	private String description;

	private Double quantite; // JPA créera automatiquement une colonne "quantite"
	
	@Column(name = "price")
	private Double price;
}