package com.example.sneaker_shop_2.repository;

import com.example.sneaker_shop_2.entity.UserRole;
import com.example.sneaker_shop_2.entity.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {
}