package com.example.demo.modal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Entity
public class Product {
	@Id
	private String productname;
	private String vendorname;
	private int duration;
	private int cost;
}
