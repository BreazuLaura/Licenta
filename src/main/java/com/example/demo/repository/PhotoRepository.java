package com.example.demo.repository;

import com.example.demo.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByProductId(Long productId);

    @Modifying
    @Query("DELETE FROM Photo p WHERE p.product.id = :productId")
    void deleteByProductId(@Param("productId") Long productId);

}
