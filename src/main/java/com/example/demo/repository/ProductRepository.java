package com.example.demo.repository;

import com.example.demo.model.Product;
import com.example.demo.model.enums.Category;
import com.example.demo.model.enums.Dorm;
import com.example.demo.model.enums.Status;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByOwnerId(Long userId);

    @Query("SELECT p FROM Product p WHERE (:searchQuery IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :searchQuery, '%'))) " +
            "AND (:filterCategory IS NULL OR p.category = :filterCategory) " +
            "AND (:filterDorm IS NULL OR p.dorm = :filterDorm) " +
            "AND (:filterStatus IS NULL OR p.status = :filterStatus) " +
            "ORDER BY " +
            "CASE WHEN :orderBy = 'name' THEN p.name END ASC, " +
            "CASE WHEN :orderBy = 'price' THEN p.price END ASC")
    List<Product> findFilteredProducts(@Param("searchQuery") String searchQuery,
                                       @Param("filterCategory") String filterCategory,
                                       @Param("filterDorm") String filterDorm,
                                       @Param("filterStatus") String filterStatus,
                                       @Param("orderBy") String orderBy);

}
