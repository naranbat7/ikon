package mn.edu.num.naranbat.email.controller;

import mn.edu.num.naranbat.email.model.Email;
import mn.edu.num.naranbat.email.repository.EmailRepository;
import mn.edu.num.naranbat.email.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class EmailController
{
    @Autowired
    private EmailRepository emailRepo;

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
}
