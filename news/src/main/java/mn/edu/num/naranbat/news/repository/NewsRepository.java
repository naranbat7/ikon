package mn.edu.num.naranbat.news.repository;

import mn.edu.num.naranbat.news.model.News;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends MongoRepository<News, Long> {
}
