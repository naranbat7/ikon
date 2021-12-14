package mn.edu.num.naranbat.news.controller;

import mn.edu.num.naranbat.news.httpService.HttpService;
import mn.edu.num.naranbat.news.model.News;
import mn.edu.num.naranbat.news.model.NewsDTO;
import mn.edu.num.naranbat.news.repository.NewsRepository;
import mn.edu.num.naranbat.news.service.NewsService;
import mn.edu.num.naranbat.news.service.NewsServiceImplCalendar;
import mn.edu.num.naranbat.news.service.NewsServiceImplRelative;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        NewsService service = new NewsServiceImplCalendar();
        var items = newsRepo.findAll();
        items.forEach(e -> e.setService(service));
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
            HttpService.sendMail(body.getName());
            News news = newsRepo.insert(NewsDTO.mapper(body));
            return news;
        } catch (Exception e) {
            System.out.println(e.getMessage());
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
