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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user") // Nom de la table dans MySQL
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrément pour l'ID
    private Long id;

    @Column(unique = true, nullable = false) // Garantit que le nom d'utilisateur est unique et obligatoire
    private String username;

    @Column(nullable = false) // Le mot de passe ne peut pas être vide
    private String password;

    private String role; // Exemple : "ADMIN", "USER"
}