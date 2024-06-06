package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Id;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Entity
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private BigDecimal startPrice;

    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = true)
    private Date startDate;

    @OneToOne
    @JoinColumn(name = "current_bid_id", nullable = true)
    private Bid currentHighestBid;

    @OneToMany(mappedBy = "auction", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Bid> bids;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = true)
    @JsonIgnore
    private Users owner;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public BigDecimal getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(BigDecimal startPrice) {
        this.startPrice = startPrice;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Bid getCurrentHighestBid() {
        return currentHighestBid;
    }

    public void setCurrentHighestBid(Bid currentHighestBid) {
        this.currentHighestBid = currentHighestBid;
    }

    public List<Bid> getBids() {
        return bids;
    }

    public void setBids(List<Bid> bids) {
        this.bids = bids;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Users getOwner() {
        return owner;
    }

    public void setOwner(Users owner) {
        this.owner = owner;
    }

    public Auction(Product product, BigDecimal startPrice, Date endDate, Date startDate, Bid currentHighestBid, List<Bid> bids) {
        this.product = product;
        this.startPrice = startPrice;
        this.endDate = endDate;
        this.startDate = startDate;
        this.currentHighestBid = currentHighestBid;
        this.bids = bids;
    }

    public Auction() {
    }
}

