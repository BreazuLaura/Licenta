package com.example.demo.service;

import com.example.demo.dto.BidDTO;
import com.example.demo.model.Auction;
import com.example.demo.model.Bid;
import com.example.demo.model.Users;
import com.example.demo.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private UserService userService;

    public List<Bid> getAllBids() {
        return bidRepository.findAll();
    }

    public Bid getBidById(Long id) {
        return bidRepository.findById(id).orElse(null);
    }

    public Bid createBid(Bid bid) {
        return bidRepository.save(bid);
    }

    public Bid updateBid(Long id, Bid bid) {
        bid.setId(id);
        return bidRepository.save(bid);
    }

    public void deleteBid(Long id) {
        bidRepository.deleteById(id);
    }

    public Bid placeBid(BidDTO bidDTO) {
        Auction auction = auctionService.getAuctionById(bidDTO.getAuctionId());
        Users user = userService.getUserById(bidDTO.getUserId());

        Bid bid = new Bid();
        bid.setAuction(auction);
        bid.setUser(user);
        bid.setAmount(bidDTO.getAmount());
        bid.setBidTime(new Date());

        return bidRepository.save(bid);
    }
}
