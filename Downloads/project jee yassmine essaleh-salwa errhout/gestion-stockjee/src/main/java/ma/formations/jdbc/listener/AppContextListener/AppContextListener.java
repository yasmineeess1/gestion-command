package ma.formations.jdbc.listener.AppContextListener;


import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;

@WebListener

public class AppContextListener
        implements ServletContextListener {

    @Override
    public void contextInitialized(
            ServletContextEvent sce
    ) {

        System.out.println("Application démarrée");
    }

    @Override
    public void contextDestroyed(
            ServletContextEvent sce
    ) {

        try {

            AbandonedConnectionCleanupThread.checkedShutdown();

            System.out.println(
                    "MySQL Cleanup Thread stopped"
            );

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}