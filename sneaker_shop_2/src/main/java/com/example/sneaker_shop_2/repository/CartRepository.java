package com.example.sneaker_shop_2.repository;

import com.example.sneaker_shop_2.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByUserUserId(Integer userId);
}