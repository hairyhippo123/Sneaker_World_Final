package com.example.sneaker_shop_2.controller.users;

import com.example.sneaker_shop_2.dto.ApiResponse;
import com.example.sneaker_shop_2.entity.OrderDetail;
import com.example.sneaker_shop_2.repository.OrderDetailRepository;
import com.example.sneaker_shop_2.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customer/order-details")
public class CustomerOrderDetailController {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

    private Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return orderRepository.findByUserUsername(username)
                .stream()
                .findFirst()
                .map(order -> order.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<ApiResponse<List<OrderDetail>>> getOrderDetailsByOrderId(@PathVariable Integer orderId) {
        Integer userId = getCurrentUserId();
        if (orderRepository.findById(orderId).map(order -> order.getUser().getUserId().equals(userId)).orElse(false)) {
            List<OrderDetail> orderDetails = orderDetailRepository.findByOrderOrderId(orderId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Order details retrieved successfully", orderDetails));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "Order not found or not authorized", null));
    }
}
