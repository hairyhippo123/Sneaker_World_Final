package com.example.sneaker_shop_2.controller.moderator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/moderator")
public class ModeratorWelcomeController {
    @GetMapping("/welcome-moderator")
    public ResponseEntity<String> welcomeModerator() {
        return ResponseEntity.ok("Welcome Moderator! You can manage products, categories, orders, and carts.");
    }
}
