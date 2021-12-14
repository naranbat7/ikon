package mn.edu.num.naranbat.email.model;

import mn.edu.num.naranbat.email.service.EmailService;

import javax.mail.*;
import java.util.Properties;

public class EmailSender {
    private String body;
    private EmailService service;
    private Properties props;
    private Session session;

    public EmailSender(EmailService service) {
        this.service = service;
        this.body = "";
        props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("iikon237@gmail.com", "ikon1234@");
            }
        });
    }

    public void sendEmail(String email) {
        try {
            Transport.send(service.getEmailBody(session, email, body));
        } catch (MessagingException ex) {
            System.out.println(ex.getMessage());
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
