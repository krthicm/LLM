package com.example.demo.model;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Entity
public class register {
	@Id
	private String systemid;
	private String name;
	private String mailid;
	private String password;
	private String status;
}
