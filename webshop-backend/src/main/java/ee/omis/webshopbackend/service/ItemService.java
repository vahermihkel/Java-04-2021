package ee.omis.webshopbackend.service;

import ee.omis.webshopbackend.model.Item;
import ee.omis.webshopbackend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

//    teeme constructori kaudu
    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    public void addItem(Item item) {
        itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    public Optional<Item> getOneItem(Long id) {
        return itemRepository.findById(id);
    }

    public void editItem(Item item) {
        itemRepository.save(item);
    }

}
