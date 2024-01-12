package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modal.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	ProductRepository productrepository;
	

	public Product createproduct(Product product) {
		return productrepository.save(product);
	}


	public List<Product> getAllproduct() {
		return productrepository.findAll();
	}
	

	public void deleteproduct(String productName) {
		productrepository.deleteById(productName);
	}

}
