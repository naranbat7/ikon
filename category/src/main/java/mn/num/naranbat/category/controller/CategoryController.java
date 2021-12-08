package mn.num.naranbat.category.controller;
import mn.num.naranbat.category.model.Category;
import mn.num.naranbat.category.repository.CategoryRepository;
import mn.num.naranbat.category.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CategoryController
{
    @Autowired
    private CategoryRepository categoryRepo;

    @GetMapping("/category")
   public List<Category> getItems() throws Exception
    {
        try {
            return categoryRepo.findAll();
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @PostMapping("/category")
    @ResponseBody
    public Category addItem(@RequestBody Map<String, String> body) throws Exception {
        try {
            Category item = new Category(Utils.generateUniqueLong(), body.getOrDefault("name", ""));
            categoryRepo.insert(item);
            return item;
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @DeleteMapping("/category/{id}")
    @ResponseBody
    public String deleteItem(@PathVariable Long id) throws Exception {
        try {
            categoryRepo.deleteById(id);
            return "success";
        } catch (Exception e) {
            throw new Exception();
        }
    }
}
