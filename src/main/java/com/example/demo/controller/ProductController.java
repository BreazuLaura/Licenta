package com.example.demo.controller;

import com.example.demo.dto.ProductDTO;
import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
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

}
