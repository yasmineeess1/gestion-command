package ma.formations.jdbc.dao;
import java.util.List;
import ma.formations.jdbc.service.model.User;
public interface IDao {
List<User> findAllUsers();
User getUserByUsername(String username);
}
