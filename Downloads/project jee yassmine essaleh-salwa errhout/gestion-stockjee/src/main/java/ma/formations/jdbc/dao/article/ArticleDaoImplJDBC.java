package ma.formations.jdbc.dao.article;

import ma.formations.jdbc.dao.DatabaseManager;
import ma.formations.jdbc.service.model.Article;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ArticleDaoImplJDBC implements IArticleDao {

    // 🔥 Helper sécurisé pour convertir Date -> LocalDate
    private LocalDate toLocalDate(Date date) {
        return (date != null) ? date.toLocalDate() : null;
    }

    @Override
    public List<Article> findAll() {

        List<Article> articles = new ArrayList<>();

        String sql = "SELECT * FROM article";

        try (
                Connection connection = DatabaseManager.getInstance().getConnection();
                Statement stmt = connection.createStatement();
                ResultSet rs = stmt.executeQuery(sql)
        ) {

            while (rs.next()) {

                articles.add(new Article(
                        rs.getLong("id"),
                        rs.getString("description"),
                        rs.getDouble("quantite"),
                        rs.getDouble("price"),
                        toLocalDate(rs.getDate("date_expiration"))
                ));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return articles;
    }

    @Override
    public void save(Article a) {

        String sql = "INSERT INTO article(description, quantite, price, date_expiration) VALUES(?,?,?,?)";

        try (
                Connection conn = DatabaseManager.getInstance().getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)
        ) {

            ps.setString(1, a.getDescription());
            ps.setDouble(2, a.getQuantite());
            ps.setDouble(3, a.getPrice());

            if (a.getDateExpiration() != null) {
                ps.setDate(4, Date.valueOf(a.getDateExpiration()));
            } else {
                ps.setNull(4, Types.DATE);
            }

            ps.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void delete(Long id) {

        String sql = "DELETE FROM article WHERE id=?";

        try (
                Connection conn = DatabaseManager.getInstance().getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)
        ) {

            ps.setLong(1, id);
            ps.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(Article a) {

        String sql = "UPDATE article SET description=?, quantite=?, price=?, date_expiration=? WHERE id=?";

        try (
                Connection conn = DatabaseManager.getInstance().getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)
        ) {

            ps.setString(1, a.getDescription());
            ps.setDouble(2, a.getQuantite());
            ps.setDouble(3, a.getPrice());

            if (a.getDateExpiration() != null) {
                ps.setDate(4, Date.valueOf(a.getDateExpiration()));
            } else {
                ps.setNull(4, Types.DATE);
            }

            ps.setLong(5, a.getId());

            ps.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Article findById(Long id) {

        Article a = null;

        String sql = "SELECT * FROM article WHERE id=?";

        try (
                Connection conn = DatabaseManager.getInstance().getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)
        ) {

            ps.setLong(1, id);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {

                    a = new Article(
                            rs.getLong("id"),
                            rs.getString("description"),
                            rs.getDouble("quantite"),
                            rs.getDouble("price"),
                            toLocalDate(rs.getDate("date_expiration"))
                    );
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return a;
    }

    @Override
    public List<Article> search(String keyword) {

        List<Article> articles = new ArrayList<>();

        String sql = "SELECT * FROM article WHERE description LIKE ?";

        try (
                Connection conn = DatabaseManager.getInstance().getConnection();
                PreparedStatement ps = conn.prepareStatement(sql)
        ) {

            ps.setString(1, "%" + keyword + "%");

            try (ResultSet rs = ps.executeQuery()) {

                while (rs.next()) {

                    articles.add(new Article(
                            rs.getLong("id"),
                            rs.getString("description"),
                            rs.getDouble("quantite"),
                            rs.getDouble("price"),
                            toLocalDate(rs.getDate("date_expiration"))
                    ));
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return articles;
    }
}