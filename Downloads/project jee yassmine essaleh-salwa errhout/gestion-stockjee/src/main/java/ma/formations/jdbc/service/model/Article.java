package ma.formations.jdbc.service.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Article {

    private Long id;

    private String description;

    private Double quantite;

    private Double price;

    private LocalDate dateExpiration;
}