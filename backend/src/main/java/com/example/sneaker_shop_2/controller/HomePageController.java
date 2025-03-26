package com.example.sneaker_shop_2.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HomePageController {
    @GetMapping("/homepage")
    public ResponseEntity<String> homePage() {
        return ResponseEntity.ok("Welcome Customer! Browse our sneaker collection and start shopping!");
    }
}
