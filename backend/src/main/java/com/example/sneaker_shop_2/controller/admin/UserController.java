package com.example.sneaker_shop_2.controller.admin;

import com.example.sneaker_shop_2.dto.ApiResponse;
import com.example.sneaker_shop_2.entity.Role;
import com.example.sneaker_shop_2.entity.User;
import com.example.sneaker_shop_2.repository.RoleRepository;
import com.example.sneaker_shop_2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/admin/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, "Users retrieved successfully", users));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(true, "User retrieved successfully", user.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "User not found", null));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Username already exists", null));
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Email already exists", null));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "User created successfully", savedUser));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User updatedUser = user.get();
            updatedUser.setUsername(userDetails.getUsername());
            updatedUser.setPassword(passwordEncoder.encode(userDetails.getPassword())); // Mã hóa mật khẩu
            updatedUser.setEmail(userDetails.getEmail());
            updatedUser.setFullName(userDetails.getFullName());
            updatedUser.setAddress(userDetails.getAddress());
            updatedUser.setPhone(userDetails.getPhone());
            userRepository.save(updatedUser);
            return ResponseEntity.ok(new ApiResponse<>(true, "User updated successfully", updatedUser));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "User not found", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> deleteUser(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "User deleted successfully", null));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "User not found", null));
    }

    @PostMapping("/{userId}/assign-role/{roleId}")
    public ResponseEntity<ApiResponse<User>> assignRoleToUser(@PathVariable Integer userId, @PathVariable Integer roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "User not found", null));
        }
        if (!role.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "Role not found", null));
        }
        User updatedUser = user.get();
        Set<Role> roles = updatedUser.getRoles();
        roles.add(role.get());
        updatedUser.setRoles(roles);
        userRepository.save(updatedUser);
        return ResponseEntity.ok(new ApiResponse<>(true, "Role assigned successfully", updatedUser));
    }

    @DeleteMapping("/{userId}/revoke-role/{roleId}")
    public ResponseEntity<ApiResponse<User>> revokeRoleFromUser(@PathVariable Integer userId, @PathVariable Integer roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "User not found", null));
        }
        if (!role.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "Role not found", null));
        }
        User updatedUser = user.get();
        Set<Role> roles = updatedUser.getRoles();
        roles.remove(role.get());
        updatedUser.setRoles(roles);
        userRepository.save(updatedUser);
        return ResponseEntity.ok(new ApiResponse<>(true, "Role revoked successfully", updatedUser));
    }
}
