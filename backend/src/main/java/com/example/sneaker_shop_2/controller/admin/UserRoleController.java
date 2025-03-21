package com.example.sneaker_shop_2.controller.admin;

import com.example.sneaker_shop_2.entity.UserRole;
import com.example.sneaker_shop_2.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/userrole")
public class UserRoleController {
    @Autowired
    private UserRoleRepository userRoleRepository;

    @GetMapping
    public List<UserRole> getAllUserRole() {
        return userRoleRepository.findAll();
    }
}
