package mn.edu.num.naranbat.email.service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;

public class EmailServiceSpecialImpl implements EmailService {
    @Override
    public Message getEmailBody(Session session, String email, String body) throws MessagingException {
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("iikon237@gmail.com", false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
        msg.setSubject("Шинэ мэдээ");
        msg.setContent("<div data-template-type=\"html\" style=\"height: auto; padding-bottom: 149px;\" class=\"ui-sortable\"> <table bgcolor=\"#F5F5F5\" align=\"center\" class=\"full\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" data-thumbnail=\"http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2020/03/22/9jhlVUzudcB8NtbnMg67SvA5/StampReady/thumbnails/thumb-1.png\" data-module=\"Module-1\" data-bgcolor=\"M1 Bgcolor 1\"> <tbody> <tr> <td> <table bgcolor=\"#304050\" align=\"center\" width=\"750\" class=\"margin-full ui-resizable\" style=\"background-size: cover; background-position: center center; border-radius: 6px 6px 0px 0px; background-image: url(\"http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2020/03/22/9jhlVUzudcB8NtbnMg67SvA5/StampReady/img/module01-bg01.png\");\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" background=\"http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2020/03/22/9jhlVUzudcB8NtbnMg67SvA5/StampReady/img/module01-bg01.png\" data-bgcolor=\"M1 Bgcolor 2\" data-background=\"M1 Background 1\"> <tbody> <tr> <td> <table width=\"600\" align=\"center\" class=\"margin-pad\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"> <tbody> <tr> <td height=\"70\" style=\"font-size:0px\"> </td> </tr> <tr> <td> <table align=\"center\" class=\"res-full\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"> <tbody> <tr> <td> <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"> <tbody> <tr> <td> <img width=\"65\" style=\"max-width: 65px; width: 100%; display: block; line-height: 0px; font-size: 0px; border: 0px;\" src=\"http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2020/03/22/9jhlVUzudcB8NtbnMg67SvA5/StampReady/img/module01-img02.png\"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td height=\"45\" style=\"font-size:0px\"> </td> </tr> <tr> <td class=\"res-center\" style=\"text-align: center; color: white; font-family: 'Raleway', Arial, Sans-serif; font-size: 26px; letter-spacing: 1.5px; word-break: break-word; font-weight: 300; padding-left: 1.5px;\" data-color=\"M1 Title 1\" data-size=\"M1 Title 1\" data-max=\"36\" data-min=\"16\"> " + body + " </td> </tr> <tr> <td height=\"12\" style=\"font-size:0px\"> </td> </tr> <tr> <td height=\"70\" style=\"font-size:0px\"> </td> </tr> </tbody> </table> </td> </tr> </tbody> <div class=\"ui-resizable-handle ui-resizable-s\" style=\"z-index: 90;\"></div> </table> </td> </tr> </tbody> </table> </div>", "text/html; charset=UTF-8");
        msg.setSentDate(new Date());
        return msg;
    }
}
