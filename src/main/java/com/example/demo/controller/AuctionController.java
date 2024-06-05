package com.example.demo.controller;

import com.example.demo.dto.AuctionDTO;
import com.example.demo.dto.ProductDTO;
import com.example.demo.model.Auction;
import com.example.demo.model.Photo;
import com.example.demo.model.Product;
import com.example.demo.model.enums.SaleType;
import com.example.demo.model.enums.Status;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuctionService;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/{userId}")
    public ResponseEntity<Auction> createAuction(@RequestPart("auction") AuctionDTO auctionDTO,
                                                 @RequestPart("file") MultipartFile file,
                                                 @PathVariable Long userId) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(auctionDTO.getName());
        productDTO.setPrice(auctionDTO.getPrice());
        productDTO.setDescription(auctionDTO.getDescription());
        productDTO.setContactInfo(auctionDTO.getContactInfo());
        productDTO.setCategory(auctionDTO.getCategory());
        productDTO.setStatus(Status.AUCTIONED);
        productDTO.setSaleType(SaleType.AUCTIONPLACE);
        productDTO.setDorm(auctionDTO.getDorm());

        Product product = productService.createProduct(productDTO, userId, file);

        Auction auction = new Auction();
        auction.setProduct(product);
        auction.setStartPrice(auctionDTO.getStartPrice());
        auction.setEndDate(auctionDTO.getEndDate());
        auction.setStartDate(new Date());
        auction.setOwner(userRepository.findById(userId).orElse(null));

        return ResponseEntity.ok(auctionService.saveAuction(auction));
    }

    @GetMapping
    public List<Auction> getAllAuctions() {
        return auctionService.getAllAuctions();
    }

    @GetMapping("/my-auctions/{userId}")
    public ResponseEntity<List<Auction>> getUserAuctions(@PathVariable Long userId) {
        List<Auction> auctions = auctionService.getAuctionsByUserId(userId);
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> getAuctionById(@PathVariable Long id) {
        Auction auction = auctionService.getAuctionById(id);
        return ResponseEntity.ok(auction);
    }
}
