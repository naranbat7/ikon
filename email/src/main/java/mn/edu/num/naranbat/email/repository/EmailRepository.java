package mn.edu.num.naranbat.email.repository;

import mn.edu.num.naranbat.email.model.Email;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository extends MongoRepository<Email, Long> {
}
