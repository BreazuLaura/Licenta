package com.example.demo.service;

import com.example.demo.model.Auction;
import com.example.demo.model.enums.SaleType;
import com.example.demo.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    public List<Auction> getAllAuctions() {
        return auctionRepository.findAll();
    }

    public Auction getAuctionById(Long id) {
        return auctionRepository.findById(id).orElse(null);
    }

    public Auction saveAuction(Auction auction) {
        return auctionRepository.save(auction);
    }

    public Auction updateAuction(Long id, Auction auction) {
        auction.setId(id);
        return auctionRepository.save(auction);
    }

    public void deleteAuction(Long id) {
        auctionRepository.deleteById(id);
    }

    public List<Auction> getAuctionsByUserId(Long userId) {
        return auctionRepository.findByOwnerId(userId).stream().filter(auction -> (auction.getProduct().getSaleType() == SaleType.AUCTIONPLACE)).collect(Collectors.toList());
    }
}
