package com.example.demo.repository;

import com.example.demo.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
}
