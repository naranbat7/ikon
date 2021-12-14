package mn.edu.num.naranbat.email.service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;

public class EmailServiceNormalImpl implements EmailService {
    @Override
    public Message getEmailBody(Session session, String email, String body) throws MessagingException {
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("iikon237@gmail.com", false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
        msg.setSubject("Шинэ мэдээ");
        msg.setContent("'" + body + "' гэсэн гарчигтай шинэ мэдээ орлоо.", "text/plain; charset=UTF-8");
        msg.setSentDate(new Date());
        return msg;
    }
}
