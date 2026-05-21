package ma.formations.jdbc.dao;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
public class DatabaseManager {
	private static final String CONF_FILE = "database.properties";
	private static Properties databaseConfig = new Properties();
	private static DatabaseManager instance;
	private static Connection connection;
	private DatabaseManager() {
	}
	public static DatabaseManager getInstance() {
	if (instance != null)
	return instance;
	instance = new DatabaseManager();
	instance.loadDriver();
	return instance;
	}
	private void loadDriver() {
	try {
		databaseConfig.load(this.getClass().getClassLoader().getResourceAsStream(CONF_FILE));
		Class.forName(databaseConfig.getProperty("database.driver"));
		} catch (ClassNotFoundException e) {
		e.printStackTrace();
		} catch (IOException e) {
		e.printStackTrace();
		}
		}
		public Connection getConnection() {
		try {
		connection=DriverManager.getConnection(databaseConfig.getProperty("database.url"),
		databaseConfig.getProperty("database.username"),
		databaseConfig.getProperty("database.password"));
		} catch (SQLException e) {
		e.printStackTrace();
		}
		return connection;
		}
	}

