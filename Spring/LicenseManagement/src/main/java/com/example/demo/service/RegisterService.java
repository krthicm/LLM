package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import com.example.demo.model.register;
import com.example.demo.repository.RegisterRepository;

import jakarta.transaction.Transactional;
@Service
public class RegisterService {
	
	@Autowired
	RegisterRepository registerrepository;

	public register createRegister(register register) {
		return registerrepository.save(register);
	}

	public register getregisterById(String systemid) {
		return registerrepository.findById(systemid).get();
	}

	public List<register> getAllregisters() {
		return registerrepository.findAll();
	}
	

	public void deleteregister(String systemid) {
		registerrepository.deleteById(systemid);
	}
	
	@Modifying
	@Transactional
	public void activate(String systemid) {
		registerrepository.activateSystem(systemid);
	}
	
	@Modifying
	@Transactional
	public void deActivate(String systemid) {
		registerrepository.deActivateSystem(systemid);
	}
	
	public List<register> findByStatus(String status){
		return registerrepository.findByStatus(status);
	}
	
	public boolean checklogin(Map<String, String> logindata) {
		String password = logindata.get("pw");
		register r = registerrepository.checklogin(logindata.get("sys"));
		if(r.getPassword().equals(password)) {
			return true;
		}
		return false;
	}
	
	public int countofuser() {
		return (int) registerrepository.count();
	}
}
