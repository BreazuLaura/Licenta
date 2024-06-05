package com.example.demo.controller;

import com.example.demo.model.Bid;
import com.example.demo.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bids")
public class BidController {

    @Autowired
    private BidService bidService;

    @GetMapping
    public List<Bid> getAllBids() {
        return bidService.getAllBids();
    }

    @GetMapping("/{id}")
    public Bid getBidById(@PathVariable Long id) {
        return bidService.getBidById(id);
    }

    @PostMapping
    public Bid createBid(@RequestBody Bid bid) {
        return bidService.createBid(bid);
    }

    @PutMapping("/{id}")
    public Bid updateBid(@PathVariable Long id, @RequestBody Bid bid) {
        return bidService.updateBid(id, bid);
    }

    @DeleteMapping("/{id}")
    public void deleteBid(@PathVariable Long id) {
        bidService.deleteBid(id);
    }
}
