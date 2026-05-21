package ma.formations.jdbc.dao.commande;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import ma.formations.jdbc.dao.DatabaseManager;
import ma.formations.jdbc.service.model.Commande;
import ma.formations.jdbc.service.model.LigneCommande;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;



public class CommandeDaoImplJDBC implements ICommandeDao {

    @Override
    public void save(Commande c) {

        String sql =
                "INSERT INTO commande(user_id, statut, total) VALUES(?,?,?)";

        String sqlLigne =
                "INSERT INTO commande_article(commande_id, article_id, quantite) VALUES(?,?,?)";

        Connection conn = null;

        try {

            conn = DatabaseManager.getInstance().getConnection();

            conn.setAutoCommit(false);

            // INSERT COMMANDE

            PreparedStatement ps =
                    conn.prepareStatement(
                            sql,
                            Statement.RETURN_GENERATED_KEYS
                    );

            ps.setInt(1, c.getUserId());

            ps.setString(2, c.getStatut());

            ps.setDouble(3, c.getTotal());

            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();

            Long commandeId = null;

            if (rs.next()) {

                commandeId = rs.getLong(1);
            }

            if (commandeId == null) {

                conn.rollback();

                throw new RuntimeException(
                        "Impossible de récupérer l'ID commande"
                );
            }

            // INSERT LIGNES

            if (c.getLignes() != null) {

                for (LigneCommande l : c.getLignes()) {

                    PreparedStatement ps2 =
                            conn.prepareStatement(sqlLigne);

                    ps2.setLong(1, commandeId);

                    ps2.setLong(2, l.getArticleId());

                    ps2.setInt(3, l.getQuantite());

                    ps2.executeUpdate();
                }
            }

            conn.commit();

        } catch (SQLException e) {

            try {

                if (conn != null) {

                    conn.rollback();
                }

            } catch (SQLException ex) {

                ex.printStackTrace();
            }

            e.printStackTrace();
        }
    }

    @Override
    public List<Commande> findAll() {

        List<Commande> list = new ArrayList<>();

        String sql = "SELECT * FROM commande";

        try (

                Connection conn =
                        DatabaseManager.getInstance().getConnection();

                Statement st =
                        conn.createStatement();

                ResultSet rs =
                        st.executeQuery(sql)

        ) {

            while (rs.next()) {

                Commande c = new Commande();

                c.setId(rs.getLong("id"));

                c.setUserId(rs.getInt("user_id"));

                c.setStatut(rs.getString("statut"));

                c.setTotal(rs.getDouble("total"));

                c.setDateCommande(
                        rs.getTimestamp("date_commande")
                                .toLocalDateTime()
                );

                // 🔥 IMPORTANT
                c.setLignes(
                        findLignesByCommandeId(c.getId())
                );

                list.add(c);
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return list;
    }

    @Override
    public Commande findById(Long id) {

        Commande c = null;

        String sql =
                "SELECT * FROM commande WHERE id=?";

        try (

                Connection conn =
                        DatabaseManager.getInstance().getConnection();

                PreparedStatement ps =
                        conn.prepareStatement(sql)

        ) {

            ps.setLong(1, id);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                c = new Commande();

                c.setId(rs.getLong("id"));

                c.setUserId(rs.getInt("user_id"));

                c.setStatut(rs.getString("statut"));

                c.setTotal(rs.getDouble("total"));

                c.setDateCommande(
                        rs.getTimestamp("date_commande")
                                .toLocalDateTime()
                );

                // 🔥 IMPORTANT
                c.setLignes(
                        findLignesByCommandeId(c.getId())
                );
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return c;
    }

    @Override
    public void delete(Long id) {

        String sql1 =
                "DELETE FROM commande_article WHERE commande_id=?";

        String sql2 =
                "DELETE FROM commande WHERE id=?";

        try (

                Connection conn =
                        DatabaseManager.getInstance().getConnection()

        ) {

            conn.setAutoCommit(false);

            // DELETE LIGNES

            try (

                    PreparedStatement ps1 =
                            conn.prepareStatement(sql1)

            ) {

                ps1.setLong(1, id);

                ps1.executeUpdate();
            }

            // DELETE COMMANDE

            try (

                    PreparedStatement ps2 =
                            conn.prepareStatement(sql2)

            ) {

                ps2.setLong(1, id);

                ps2.executeUpdate();
            }

            conn.commit();

        } catch (SQLException e) {

            e.printStackTrace();
        }
    }

    @Override
    public List<LigneCommande> findLignesByCommandeId(
            Long commandeId
    ) {

        List<LigneCommande> lignes =
                new ArrayList<>();

        String sql = """
            SELECT ca.article_id,
                   ca.quantite,
                   a.price,
                   a.description
            FROM commande_article ca
            JOIN article a
            ON ca.article_id = a.id
            WHERE ca.commande_id = ?
            """;

        try (

                Connection conn =
                        DatabaseManager.getInstance().getConnection();

                PreparedStatement ps =
                        conn.prepareStatement(sql)

        ) {

            ps.setLong(1, commandeId);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                LigneCommande l =
                        new LigneCommande();

                l.setArticleId(
                        rs.getLong("article_id")
                );

                l.setQuantite(
                        rs.getInt("quantite")
                );

                l.setPrix(
                        rs.getDouble("price")
                );

                
                l.setDescription(
                        rs.getString("description")
                );

                lignes.add(l);
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return lignes;
    }
}
