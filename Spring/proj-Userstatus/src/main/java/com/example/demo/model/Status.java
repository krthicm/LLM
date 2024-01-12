package com.example.demo.model;


import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Status {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int softwareid;
	private String systemid;
	private String name;
	private String mailid;
	private String productname;
	private String vendorname;
	private int duration;
	private int cost;
	private LocalDate installationdate;
	private LocalDate expirydate;
	private int validity;
	private String softwarestatus;
}
