package com.example.sneaker_shop_2.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminWelcomeController {
    @GetMapping("/welcome-admin")
    public ResponseEntity<String> welcomeAdmin(){
        return ResponseEntity.ok("Welcome Admin! You have full access to the system.");
    }
}
