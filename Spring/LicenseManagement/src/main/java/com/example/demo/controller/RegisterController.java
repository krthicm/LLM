package com.example.demo.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.register;
import com.example.demo.service.RegisterService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/create")
    public register createRegister(@RequestBody register register) {
        return registerService.createRegister(register);
    }
    
    @GetMapping("/getuser/{systemid}")
    public register getRegisterById(@PathVariable String systemid) {
    	return registerService.getregisterById(systemid);
    }

    @GetMapping
    public List<register> getAllRegisters() {
        return registerService.getAllregisters();
    }


    @DeleteMapping("/{systemid}")
    public void deleteRegister(@PathVariable String systemid) {
        registerService.deleteregister(systemid);
    }
    
    @PutMapping("/systemid")
    public void updateStatus(@RequestBody String systemid) {
    	registerService.activate(systemid);
    }
    
    @PutMapping("/systemids")
    public void deActivateSys(@RequestBody String systemid) {
    	registerService.deActivate(systemid);
    }
    
    @PostMapping("/status")
    public List<register> findByStatus(@RequestBody Map<String,String> data) {
    	String status = data.get("status");
        return registerService.findByStatus(status);
    }
    
    @PostMapping("/check")
    public boolean checkLogin(@RequestBody Map<String,String> logindata) {
    	return registerService.checklogin(logindata);
    }
    
    @GetMapping("/countuser")
    public int countofusers() {
    	return registerService.countofuser();
    }
}
