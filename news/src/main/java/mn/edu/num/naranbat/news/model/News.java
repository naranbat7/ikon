package mn.edu.num.naranbat.news.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "news")
public class News {
    @Id
    private Long id;
    private Long categoryId;
    private int adminId, views;
    private String name, imageUrl, adminName;
    private Boolean isCovid, isSponsored;
    private LocalDateTime publishedDate;
    private String content;
    private String adminUrl;

    public News() {}

    public News(Long id, Long categoryId, int adminId, int views, String name, String imageUrl, String adminName, Boolean isCovid, Boolean isSponsored, LocalDateTime publishedDate, String content, String adminUrl) {
        this.id = id;
        this.categoryId = categoryId;
        this.adminId = adminId;
        this.views = views;
        this.name = name;
        this.imageUrl = imageUrl;
        this.adminName = adminName;
        this.isCovid = isCovid;
        this.isSponsored = isSponsored;
        this.publishedDate = publishedDate;
        this.content = content;
        this.adminUrl = adminUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public Boolean getCovid() {
        return isCovid;
    }

    public void setCovid(Boolean covid) {
        isCovid = covid;
    }

    public Boolean getSponsored() {
        return isSponsored;
    }

    public void setSponsored(Boolean sponsored) {
        isSponsored = sponsored;
    }

    public LocalDateTime getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(LocalDateTime publishedDate) {
        this.publishedDate = publishedDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAdminUrl() {
        return adminUrl;
    }

    public void setAdminUrl(String adminUrl) {
        this.adminUrl = adminUrl;
    }
}
