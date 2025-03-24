package com.example.sneaker_shop_2.controller.moderator;

import com.example.sneaker_shop_2.dto.ApiResponse;
import com.example.sneaker_shop_2.entity.Cart;
import com.example.sneaker_shop_2.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/moderator/carts")
public class ModeratorCartController {

    @Autowired
    private CartRepository cartRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Cart>>> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, "Carts retrieved successfully", carts));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Cart>>> getCartByUserId(@PathVariable Integer userId) {
        List<Cart> carts = cartRepository.findByUserUserId(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Cart retrieved successfully", carts));
    }
}
