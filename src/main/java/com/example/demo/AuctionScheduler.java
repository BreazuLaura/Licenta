package com.example.demo;

import com.example.demo.model.Auction;
import com.example.demo.model.enums.AuctionStatus;
import com.example.demo.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Component
public class AuctionScheduler {

    @Autowired
    private AuctionRepository auctionRepository;

    @Scheduled(cron = "0 * * * * ?") // Runs every minute at :00
    @Transactional
    public void updateAuctionStatuses() {
        System.out.println(new Date());
        List<Auction> auctions = auctionRepository.findAllByStatus(AuctionStatus.STARTED);
        LocalDateTime now = LocalDateTime.now();
        for (Auction auction : auctions) {
            System.out.println(auction.getEndDate());
            if (auction.getEndDate().isBefore(now)) {
                auction.setStatus(AuctionStatus.FINISHED);
                auctionRepository.save(auction);
            }
        }
    }
}

