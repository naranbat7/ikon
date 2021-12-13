package mn.edu.num.naranbat.news.model;

import lombok.*;
import mn.edu.num.naranbat.news.service.NewsService;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "news")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class News {
    @Id
    private Long id;
    private Long categoryId;
    private int adminId, views;
    private String name, imageUrl, adminName;
    private Boolean isCovid;
    private Boolean isSponsored;
    private LocalDateTime publishedDate;
    private String content;
    private String adminUrl;
    private String dateLbl;
    private NewsService service;
}
