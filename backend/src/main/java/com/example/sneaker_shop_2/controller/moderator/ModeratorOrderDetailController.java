package com.example.sneaker_shop_2.controller.moderator;

import com.example.sneaker_shop_2.dto.ApiResponse;
import com.example.sneaker_shop_2.entity.OrderDetail;
import com.example.sneaker_shop_2.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/moderator/order-details")
public class ModeratorOrderDetailController {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDetail>>> getAllOrderDetails() {
        List<OrderDetail> orderDetails = orderDetailRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, "Order details retrieved successfully", orderDetails));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<ApiResponse<List<OrderDetail>>> getOrderDetailsByOrderId(@PathVariable Integer orderId) {
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderOrderId(orderId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Order details retrieved successfully", orderDetails));
    }
}
