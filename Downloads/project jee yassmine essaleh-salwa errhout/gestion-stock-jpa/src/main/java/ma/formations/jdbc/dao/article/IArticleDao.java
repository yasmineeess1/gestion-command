package ma.formations.jdbc.dao.article;
import java.util.List;
import ma.formations.jdbc.service.model.Article;

public interface IArticleDao {
List<Article> findAll();
void save(Article article);
void update(Article article);
void delete(Long id);
Article findById(Long id);
List<Article> search(String keyword);
}