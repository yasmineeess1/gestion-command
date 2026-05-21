package ma.formations.jdbc.presentation.controller;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ma.formations.jdbc.service.IService;
import ma.formations.jdbc.service.ServiceImpl;
import ma.formations.jdbc.service.model.User;
@WebServlet("/login.do")
public class AuthenticationServlet extends HttpServlet {
private static final long serialVersionUID = 1L;
private IService service=new ServiceImpl();
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
ServletException, IOException {
request.getRequestDispatcher("/view/login.jsp").forward(request, response);
}
protected void doPost(HttpServletRequest request,
        HttpServletResponse response)
throws ServletException, IOException {

String username = request.getParameter("username");
String password = request.getParameter("password");

if (!service.checkAccount(username, password)) {

request.setAttribute(
  "AccountIncorrect",
  "Login or password incorrect !");

request.getRequestDispatcher("/view/login.jsp")
  .forward(request, response);

} else {

    // récupérer user
    User user = service.getUserByUsername(username);

    // sauvegarder dans la session
    request.getSession().setAttribute("username", username);
    request.getSession().setAttribute("role", user.getRole());

    // redirection selon rôle
    if (user.getRole().equalsIgnoreCase("admin")) {

        response.sendRedirect(
                request.getContextPath()
                + "/articles.do?action=list");

    } else {

        response.sendRedirect(
                request.getContextPath()
                + "/commande.do?action=create");
    }
}
}
}