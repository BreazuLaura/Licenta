package com.example.demo.controller;

import com.amazonaws.util.IOUtils;
import com.example.demo.dto.ProductDTO;
import com.example.demo.model.AmazonClient;
import com.example.demo.model.Photo;
import com.example.demo.model.Product;
import com.example.demo.model.Users;
import com.example.demo.model.enums.Category;
import com.example.demo.model.enums.Dorm;
import com.example.demo.model.enums.Status;
import com.example.demo.repository.PhotoRepository;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;



import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private AmazonClient amazonClient;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/filter")
    public List<Product> getFilteredProducts(@RequestParam(required = false) String searchQuery,
                                             @RequestParam(required = false) String filterCategory,
                                             @RequestParam(required = false) String filterDorm,
                                             @RequestParam(required = false) String filterStatus,
                                             @RequestParam(defaultValue = "asc") String sortOrder,
                                             @RequestParam(defaultValue = "name") String orderBy) {
        System.out.println("-------------------------");
        return productService.getFilteredProducts(searchQuery, filterCategory, filterDorm, filterStatus, sortOrder, orderBy);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping("/{userId}")
    public Product createProduct(@RequestPart("product") ProductDTO productDTO,
                                 @RequestPart("file") MultipartFile file,
                                 @PathVariable Long userId)  throws IOException {
        System.out.println("aaa");
        return productService.createProduct(productDTO, userId, file);
    }


    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/user/{userId}")
    public List<Product> getProductsByUserId(@PathVariable Long userId) {
        return productService.getProductsByUserId(userId);
    }

    @GetMapping("/photo/{id}")
    public ResponseEntity<Object> getProductPhoto(@PathVariable Long id) {
        try {
            Product product = productService.getProductById(id);
            List<Photo> photos = photoRepository.findByProductId(id);

            if (photos.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Photo photo = photos.get(0);
            Resource resource = (Resource) amazonClient.downloadFile(photo.getFileName());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Resource cannot be accessed.");
        } catch (ValidationException e) {
            return ResponseEntity.badRequest().body("Invalid request data.");
        }
    }

    @GetMapping("/get-seller/{productId}")
    public Users getSellerOfProduct(@PathVariable Long productId) throws ValidationException {
        return productService.getSellerOfProduct(productId);
    }
}
