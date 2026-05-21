package ma.formations.jdbc.dao;


import java.sql.Connection;

import ma.formations.jdbc.dao.DatabaseManager;

public class TestConnection {

    public static void main(String[] args) {

        try {

            Connection cn =
                    DatabaseManager
                    .getInstance()
                    .getConnection();

            if(cn != null) {

                System.out.println(
                        "Connexion réussie 🎉"
                );

            } else {

                System.out.println(
                        "Connexion null"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}