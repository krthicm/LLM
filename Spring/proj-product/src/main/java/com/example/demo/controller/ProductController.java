package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modal.Product;
import com.example.demo.service.ProductService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
    private final ProductService productservice;

    public ProductController(ProductService productservice) {
        this.productservice = productservice;
    }
    
    @PostMapping("/addProduct")
    public Product createProduct(@RequestBody Product product) {
        return productservice.createproduct(product);
    }

    @GetMapping
    public List<Product> getAllProduct() {
        return productservice.getAllproduct();
    }


    @DeleteMapping("/{productName}")
    public void deleteProduct(@PathVariable String productName) {
    	productservice.deleteproduct(productName);
    }
}
