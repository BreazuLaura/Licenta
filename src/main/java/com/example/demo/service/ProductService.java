package com.example.demo.service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.model.AmazonClient;
import com.example.demo.model.Photo;
import com.example.demo.model.Product;
import com.example.demo.model.Users;
import com.example.demo.model.enums.SaleType;
import com.example.demo.model.enums.Status;
import com.example.demo.repository.PhotoRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.ValidationException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AmazonClient amazonClient;
    @Autowired
    private PhotoRepository photoRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product createProduct(ProductDTO productDTO, Long userId, MultipartFile file) {
        // Create and save the product
        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = new Product(productDTO.getName(), productDTO.getPrice(), productDTO.getDescription(), productDTO.getContactInfo(), user, productDTO.getCategory(), productDTO.getSaleType(), productDTO.getDorm());
        product.setStatus(Status.AVAILABLE);
        product.setSaleType(SaleType.MARKETPLACE);

        Product savedProduct = productRepository.save(product);

        // Upload the photo to S3 and save the photo entity
        String fileName = amazonClient.uploadFile(file);
        Photo photo = new Photo();
        photo.setFileName(fileName);
        photo.setProduct(savedProduct);
        photoRepository.save(photo);

        return savedProduct;
    }

    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setContactInfo(product.getContactInfo());
        existingProduct.setDorm(product.getDorm());
        existingProduct.setCategory(product.getCategory());
        return productRepository.save(existingProduct);
    }


    @Transactional
    public void deleteProduct(Long productId) {
        photoRepository.deleteByProductId(productId);
        productRepository.deleteById(productId);
    }

    public List<Product> getProductsByUserId(Long userId) {
        return productRepository.findByOwnerId(userId);
    }

    public Users getSellerOfProduct(Long productId) throws ValidationException {
        Optional<Product> product = productRepository.findById(productId);
        if(product.isEmpty()) {
            throw new ValidationException("No product found!");
        }

        return product.get().getOwner();
    }
}
