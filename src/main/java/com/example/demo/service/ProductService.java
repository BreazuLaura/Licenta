package com.example.demo.service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.model.Product;
import com.example.demo.model.Users;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product createProduct(ProductDTO productDTO, Long userId) {
        Users users = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(users);
        Product product = new Product(productDTO.getName(), productDTO.getPrice(), productDTO.getDescription(), productDTO.getContactInfo(), users);
        System.out.println(product);
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setContactInfo(product.getContactInfo());
        return productRepository.save(existingProduct);
    }


    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByUserId(Long userId) {
        return productRepository.findByOwnerId(userId);
    }

}
