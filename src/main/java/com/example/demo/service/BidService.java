package com.example.demo.service;

import com.example.demo.model.Bid;
import com.example.demo.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

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
}
