package mn.edu.num.naranbat.news.controller;

import mn.edu.num.naranbat.news.model.News;
import mn.edu.num.naranbat.news.model.NewsDTO;
import mn.edu.num.naranbat.news.repository.NewsRepository;
import mn.edu.num.naranbat.news.service.NewsServiceImplRelative;
import mn.edu.num.naranbat.news.util.Utils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("news")
public class NewsController {

    private final NewsRepository newsRepo;

    public NewsController(NewsRepository newsRepo) {
        this.newsRepo = newsRepo;
    }

    @GetMapping
    public ResponseEntity<List<News>> getItems() {
        var items = newsRepo.findAll();
        items.forEach(e -> e.setService(new NewsServiceImplRelative()));
        items.forEach(e -> e.setDateLbl(e.getService().getPublishedDate(e.getPublishedDate())));
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public News getItem(@PathVariable Long id) {
        try {
            News item = newsRepo.findById(id).get();
            item.setViews(item.getViews() + 1);
            newsRepo.save(item);
            return item;
        } catch (Exception e) {
            throw e;
        }
    }

    @PostMapping
    @ResponseBody
    public News addItem(@RequestBody NewsDTO body) {
        try {
            return newsRepo.insert(NewsDTO.mapper(body));
        } catch (Exception e) {
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public String deleteItem(@PathVariable Long id) {
        try {
            newsRepo.deleteById(id);
            return "success";
        } catch (Exception e) {
            throw e;
        }
    }
}
