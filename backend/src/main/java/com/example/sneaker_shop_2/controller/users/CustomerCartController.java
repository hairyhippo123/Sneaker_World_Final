package com.example.sneaker_shop_2.controller.users;

import com.example.sneaker_shop_2.dto.ApiResponse;
import com.example.sneaker_shop_2.entity.Cart;
import com.example.sneaker_shop_2.entity.User;
import com.example.sneaker_shop_2.repository.CartRepository;
import com.example.sneaker_shop_2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer/carts")
public class CustomerCartController {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    private Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(User::getUserId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Cart>>> getUserCart() {
        Integer userId = getCurrentUserId();
        List<Cart> carts = cartRepository.findByUserUserId(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Cart retrieved successfully", carts));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Cart>> addToCart(@RequestBody Cart cart) {
        Integer userId = getCurrentUserId();
        cart.setUser(new User(userId));
        Cart savedCart = cartRepository.save(cart);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Added to cart successfully", savedCart));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Cart>> updateCartItem(@PathVariable Integer id, @RequestBody Cart cartDetails) {
        Integer userId = getCurrentUserId();
        Optional<Cart> cart = cartRepository.findById(id);
        if (cart.isPresent() && cart.get().getUser().getUserId().equals(userId)) {
            Cart updatedCart = cart.get();
            updatedCart.setQuantity(cartDetails.getQuantity());
            cartRepository.save(updatedCart);
            return ResponseEntity.ok(new ApiResponse<>(true, "Cart updated successfully", updatedCart));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "Cart item not found or not authorized", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCartItem(@PathVariable Integer id) {
        Integer userId = getCurrentUserId();
        Optional<Cart> cart = cartRepository.findById(id);
        if (cart.isPresent() && cart.get().getUser().getUserId().equals(userId)) {
            cartRepository.deleteById(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Cart item deleted successfully", null));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "Cart item not found or not authorized", null));
    }
}
