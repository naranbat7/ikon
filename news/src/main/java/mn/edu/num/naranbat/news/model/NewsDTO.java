package mn.edu.num.naranbat.news.model;

import lombok.*;
import mn.edu.num.naranbat.news.service.NewsService;
import mn.edu.num.naranbat.news.util.Utils;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsDTO {
    private Long categoryId;
    private int adminId;
    private String name, imageUrl, adminName;
    private Boolean isCovid;
    private Boolean isSponsored;
    private String content;
    private String adminUrl;

    public static News mapper(NewsDTO dto) {
        if (dto == null) return null;
        return News.builder()
                .id(Utils.generateUniqueLong())
                .categoryId(dto.getCategoryId())
                .adminId(dto.getAdminId())
                .views(0)
                .name(dto.getName())
                .imageUrl(dto.getImageUrl())
                .adminName(dto.getAdminName())
                .isCovid(dto.getIsCovid())
                .isSponsored(dto.getIsSponsored())
                .publishedDate(LocalDateTime.now())
                .content(dto.getContent())
                .adminUrl(dto.getAdminUrl())
                .build();
    }
}
