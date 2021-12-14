package mn.edu.num.naranbat.email.service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.AddressException;

public interface EmailService {
    Message getEmailBody(Session session, String email, String body) throws MessagingException;
}
