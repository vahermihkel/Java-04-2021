package ee.omis.webshopbackend.controller;

import ee.omis.webshopbackend.model.Item;
import ee.omis.webshopbackend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("items")
    public List<Item> getItems() {
        return itemService.getItems();
    }

    @PostMapping("add-item")
    public void addItem(@RequestBody Item item) {
        System.out.println(item);
        itemService.addItem(item);
    }

    @DeleteMapping("delete-item/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }

    @GetMapping ("view-item/{id}")
    public Optional<Item> getItem(@PathVariable Long id) {
        return itemService.getOneItem(id);
    }

    @PostMapping("edit-item")
    public void editItem(@RequestBody Item item) {
        System.out.println(item);
        itemService.editItem(item);
    }
}
