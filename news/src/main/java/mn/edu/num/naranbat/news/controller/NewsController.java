package mn.edu.num.naranbat.news.controller;

import mn.edu.num.naranbat.news.model.News;
import mn.edu.num.naranbat.news.repository.NewsRepository;
import mn.edu.num.naranbat.news.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class NewsController
{
    @Autowired
    private NewsRepository newsRepo;

    @GetMapping("/news")
    public List<News> getItems()
    {
        return newsRepo.findAll();
    }

    @GetMapping("/news/{id}")
    @ResponseBody
    public News getItem(@PathVariable Long id) throws Exception
    {
        try {
            News item = newsRepo.findById(id).get();
            item.setViews(item.getViews() + 1);
            newsRepo.save(item);
            return item;
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @PostMapping("/news")
    @ResponseBody
    public News addItem(@RequestBody Map<String, Object> body) throws Exception {
        try {
            News item = new News();
            item.setId(Utils.generateUniqueLong());
            item.setName((String)body.get("name"));
            item.setCovid((Boolean) body.get("isCovid"));
            item.setSponsored((Boolean) body.get("isSponsored"));
            item.setImageUrl((String) body.get("imageUrl"));
            item.setPublishedDate(LocalDateTime.now());
            item.setAdminId((int) body.get("adminId"));
            item.setAdminName((String) body.get("adminName"));
            item.setCategoryId((Long) body.get("categoryId"));
            item.setAdminUrl((String) body.get("adminUrl"));
            item.setViews(0);
            item.setContent((String) body.get("content"));
            newsRepo.insert(item);
            return item;
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @DeleteMapping("/news/{id}")
    @ResponseBody
    public String deleteItem(@PathVariable Long id) throws Exception {
        try {
            newsRepo.deleteById(id);
            return "success";
        } catch (Exception e) {
            throw new Exception();
        }
    }
}
