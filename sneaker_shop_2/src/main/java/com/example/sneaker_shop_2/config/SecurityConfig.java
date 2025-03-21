package com.example.sneaker_shop_2.config;

import com.example.sneaker_shop_2.entity.Role;
import com.example.sneaker_shop_2.entity.User;
import com.example.sneaker_shop_2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private UserRepository userRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/admin/**").hasRole("ADMIN") // Chỉ admin truy cập các API /api/admin/**
                        .requestMatchers("/api/moderator/**").hasRole("MODERATOR") // Chỉ moderator truy cập
                        .requestMatchers("/api/public/**").permitAll() // Các API công khai (dành cho khách hàng)
                        .requestMatchers("/login", "/logout").permitAll() // Cho phép truy cập trang đăng nhập/đăng xuất
                        .anyRequest().authenticated() // Các API khác yêu cầu đăng nhập
                )
                .formLogin(form -> form
                        .loginProcessingUrl("/login") // URL để xử lý đăng nhập
                        .defaultSuccessUrl("/api/admin/users", true) // Chuyển hướng sau khi đăng nhập thành công
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // URL để đăng xuất
                        .logoutSuccessUrl("/api/public/welcome") // Chuyển hướng sau khi đăng xuất
                        .permitAll()
                )
                .csrf(csrf -> csrf.disable()); // Tạm thời tắt CSRF để dễ test

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            // Tìm user trong database theo username
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

            // Lấy danh sách vai trò của user
            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRoles().stream().map(Role::getName).toArray(String[]::new))
                    .build();
        };
    }
}
