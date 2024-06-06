package com.example.demo.dto;

import java.math.BigDecimal;

public class BidDTO {
    private Long auctionId;
    private Long userId;
    private BigDecimal amount;

    public Long getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Long auctionId) {
        this.auctionId = auctionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BidDTO(Long auctionId, Long userId, BigDecimal amount) {
        this.auctionId = auctionId;
        this.userId = userId;
        this.amount = amount;
    }

    public BidDTO() {
    }
}

