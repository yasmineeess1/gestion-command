package ma.formations.jdbc.dao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import ma.formations.jdbc.service.model.User;
public class DaoImplJDBC implements IDao {
@Override
public List<User> findAllUsers() {
List<User> users=new ArrayList<>();
try {
Connection connection=DatabaseManager.getInstance().getConnection();
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery("select * from user");
while (rs.next()) {
users.add(new User(rs.getLong("id"), rs.getString("username"), rs.getString("password"),rs.getString("role")));
}
rs.close();
stmt.close();
connection.close();
} catch (SQLException e) {
System.out.println("SQLException: " + e.getMessage());
System.out.println("SQLState: " + e.getSQLState());
System.out.println("VendorError: " + e.getErrorCode());
}
return users;
}
@Override
public User getUserByUsername(String username) {
User user = null;
try {
Connection connection=DatabaseManager.getInstance().getConnection();
PreparedStatement stmt = connection.prepareStatement("select * from user where username=?");
stmt.setString(1, username);
ResultSet resultats = stmt.executeQuery();
while (resultats.next()) {
user = new User(resultats.getLong("id"), resultats.getString("username"), resultats.getString("password"),resultats.getString("role"));
}
resultats.close();
stmt.close();
connection.close();
} catch (SQLException e) {
System.out.println("SQLException: " + e.getMessage());
System.out.println("SQLState: " + e.getSQLState());
System.out.println("VendorError: " + e.getErrorCode());
}
return user;
}
}