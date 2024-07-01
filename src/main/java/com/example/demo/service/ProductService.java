package com.example.demo.service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.exceptionsHandler.ResourceNotFoundException;
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
import jakarta.persistence.criteria.Predicate;
import javax.xml.bind.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        return productRepository.findAll().stream().filter(product -> (product.getSaleType() == SaleType.MARKETPLACE)).collect(Collectors.toList());
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product createProduct(ProductDTO productDTO, Long userId, MultipartFile file) {
        // Create and save the product
        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = new Product(productDTO.getName(), productDTO.getPrice(), productDTO.getDescription(), productDTO.getContactInfo(), user, productDTO.getCategory(), productDTO.getSaleType(), productDTO.getDorm());
        if(productDTO.getStatus() == null)
            product.setStatus(Status.AVAILABLE);
        else product.setStatus(productDTO.getStatus());
        if(productDTO.getSaleType() == null)
            product.setSaleType(SaleType.MARKETPLACE);
        else product.setSaleType(productDTO.getSaleType());

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

        return productRepository.findByOwnerId(userId).stream().filter(product -> (product.getSaleType() == SaleType.MARKETPLACE)).collect(Collectors.toList());
    }

    public Users getSellerOfProduct(Long productId) throws ValidationException {
        Optional<Product> product = productRepository.findById(productId);
        if(product.isEmpty()) {
            throw new ValidationException("No product found!");
        }

        return product.get().getOwner();
    }

    public List<Product> getFilteredProducts(String searchQuery, String filterCategory, String filterDorm, String filterStatus, String sortOrder, String orderBy) {
        return productRepository.findAll().stream()
                .filter(product -> (searchQuery == null || searchQuery.isEmpty() || product.getName().toLowerCase().contains(searchQuery.toLowerCase())))
                .filter(product -> (filterCategory == null || filterCategory.isEmpty() || (product.getCategory() != null && product.getCategory().name().equalsIgnoreCase(filterCategory))))
                .filter(product -> (filterDorm == null || filterDorm.isEmpty() || (product.getDorm() != null && product.getDorm().name().equalsIgnoreCase(filterDorm))))
                .filter(product -> (filterStatus == null || filterStatus.isEmpty() || (product.getStatus() != null && product.getStatus().name().equalsIgnoreCase(filterStatus))))
                .filter(product -> (product.getSaleType() == SaleType.MARKETPLACE))
                .sorted((p1, p2) -> {
                    if ("price".equalsIgnoreCase(orderBy)) {
                        return "asc".equalsIgnoreCase(sortOrder) ? Double.compare(p1.getPrice(), p2.getPrice()) : Double.compare(p2.getPrice(), p1.getPrice());
                    } else {
                        return "asc".equalsIgnoreCase(sortOrder) ? p1.getName().compareToIgnoreCase(p2.getName()) : p2.getName().compareToIgnoreCase(p1.getName());
                    }
                })
                .collect(Collectors.toList());
    }

    public Product updateProductStatus(Long id, String status) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setStatus(Status.valueOf(status));
        return productRepository.save(product);
    }

}
