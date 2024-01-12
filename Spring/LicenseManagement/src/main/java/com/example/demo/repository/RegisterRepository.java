package com.example.demo.repository;

import com.example.demo.model.register;

import jakarta.transaction.Transactional;

//import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public interface RegisterRepository extends JpaRepository<register, String> {
	@Modifying
	@Transactional
	@Query(value="update register set status ='Active' where systemid=?",nativeQuery = true)
	int activateSystem(String systemid);
	
	@Modifying
	@Transactional
	@Query(value="update register set status ='Declined' where systemid=?",nativeQuery = true)
	int deActivateSystem(String systemid);
	
	List<register> findByStatus(String status);


	@Query(value="select * from register where status='Active' and systemid=?",nativeQuery = true)
	register checklogin(String systemid);
	

	
}
