package com.example.sneaker_shop_2.controller.admin;

import com.example.sneaker_shop_2.dto.ApiResponse;
import com.example.sneaker_shop_2.entity.Role;
import com.example.sneaker_shop_2.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/admin/role")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Role>>> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, "Roles retrieved successfully", roles));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Role>> getRoleById(@PathVariable Integer id) {
        Optional<Role> role = roleRepository.findById(id);
        if (role.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(true, "Role retrieved successfully", role.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "Role not found", null));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Role>> createRole(@RequestBody Role role) {
        if (roleRepository.findByName(role.getName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Role name already exists", null));
        }
        Role savedRole = roleRepository.save(role);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Role created successfully", savedRole));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Role>> updateRole(@PathVariable Integer id, @RequestBody Role roleDetails) {
        Optional<Role> role = roleRepository.findById(id);
        if (role.isPresent()) {
            Role updatedRole = role.get();
            updatedRole.setName(roleDetails.getName());
            updatedRole.setDescription(roleDetails.getDescription());
            roleRepository.save(updatedRole);
            return ResponseEntity.ok(new ApiResponse<>(true, "Role updated successfully", updatedRole));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "Role not found", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRole(@PathVariable Integer id) {
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Role deleted successfully", null));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "Role not found", null));
    }
}
