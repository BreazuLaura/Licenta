package com.example.demo.repository;

import com.example.demo.model.Auction;
import com.example.demo.model.enums.AuctionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findByOwnerId(Long userId);

    List<Auction> findAllByStatus(AuctionStatus auctionStatus);
}
