package mn.edu.num.naranbat.email.controller;

import mn.edu.num.naranbat.email.model.Email;
import mn.edu.num.naranbat.email.model.EmailSender;
import mn.edu.num.naranbat.email.repository.EmailRepository;
import mn.edu.num.naranbat.email.service.EmailServiceNormalImpl;
import mn.edu.num.naranbat.email.service.EmailServiceSpecialImpl;
import mn.edu.num.naranbat.email.util.Utils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class EmailController
{
    private EmailSender emailSender;
    private EmailRepository emailRepo;

    public EmailController(EmailRepository emailRepo) {
        this.emailRepo = emailRepo;
        this.emailSender = new EmailSender(new EmailServiceSpecialImpl());
    }

    @PostMapping("/email")
    @ResponseBody
    public String addItem(@RequestBody Map<String, String> body) throws Exception {
        try {
            Email item = new Email(Utils.generateUniqueLong(), body.getOrDefault("email", ""));
            emailRepo.insert(item);
            return "success";
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @GetMapping("/email")
    public ResponseEntity<List<Email>> getItems() {
        return ResponseEntity.ok(emailRepo.findAll());
    }

    @PostMapping("/email/send/{id}")
    public ResponseEntity<String> sendEmailOnce(@PathVariable Long id) {
        Email email = emailRepo.findById(id).orElse(new Email(Long.getLong(""), "m.naranbat7@gmail.com"));
        emailSender.sendEmail(email.getEmail());
        return ResponseEntity.ok(email.getEmail() + "-руу цахим шуудан амжилттай илгээгдлээ");
    }

    @PostMapping("/email/send")
    public ResponseEntity<String> sendEmailAll(@RequestBody String body) {
        System.out.println("All Email + " + body);
        emailSender.setBody(body);
        List<Email> emails = emailRepo.findAll();
        emails.forEach(email -> {
            emailSender.sendEmail(email.getEmail());
        });
        return ResponseEntity.ok("Цахим шуудан амжилттай илгээгдлээ");
    }
}
