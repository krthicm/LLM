package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Status;
import com.example.demo.service.StatusService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/service")
public class StatusController {
	  @Autowired
	    private final StatusService statusService;

	    public StatusController(StatusService statusService) {
	        this.statusService = statusService;
	    }
	    
	    
	    @PostMapping("/add")
	    public int createStatus(@RequestBody Status status) {
	        if (statusService.isSoftwareInstalled(status.getSystemid(), status.getProductname())) {
	            System.out.println("Software already installed");
	            return 0;
	        } else {
	             statusService.createStatus(status);
	             return 1;
	        }
	    }
	    
	    
	    
	    @GetMapping("/{systemid}")
	    public Optional<Status> getRegisterById(@PathVariable Integer softwareid) {
	        return statusService.getstatusById(softwareid);
	    }

	    
	    @GetMapping
	    public List<Status> getAllRegisters() {
	        return statusService.getAllstatus();
	    }


	    @DeleteMapping("/delete/{softwareid}")
	    public void deleteRegister(@PathVariable Integer softwareid) {
	    	statusService.deletestatus(softwareid);
	    }
	    
	    @PutMapping("/activatesoftware")
	    public void activateStatus(@RequestBody Status  status) {
	    	status.setSoftwarestatus("Active");
	    	statusService.createStatus(status);
	    }
	    
	    @PutMapping("/deactivatesoftware")
	    public void deactivateStatus(@RequestBody Status status) {
	    	System.out.println("put mapping works");
	    	status.setSoftwarestatus("Inactive");
	    	statusService.savestatus(status);
	    }
	    
	    @PostMapping("/softstatus")
	    public List<Status> findByStatus(@RequestBody Map<String,String> data) {
	    	String status = data.get("status");
	        return statusService.findByStatuses(status);
	    }
	    
	    @GetMapping("/usersw/{systemid}")
	    public List<Status> findusersoftware(@PathVariable String systemid){
			return statusService.findusersoftwares(systemid);
	    }
	    
	    @GetMapping("/countservice")
	    public int countofservice() {
	    	return statusService.countofservice();
	    }
	    
	    @GetMapping("/cost")
	    public int cost() {
	    	return statusService.cost();
	    }
	    
	   @ResponseBody
	   @GetMapping("/getbarChart")
	   public Map<String,Long> getbarswVu()
		{			
			return statusService.countswVu();
		}
	   
	   @PutMapping("/reneww")
	    public void renewal(@RequestBody Status status) {
	    	System.out.println("renewal mapping works");
	    	status.setCost(status.getCost()+status.getCost());
	    	status.setValidity(status.getValidity()+status.getDuration());
	    	status.setExpirydate(status.getExpirydate().plusDays(status.getDuration()));
	    	statusService.savestatus(status);
	    }
	   
	   
	   ////////////////////////////////
	   
	   @PutMapping("/changevalidity")
	   public ResponseEntity<String> updateValidity(@RequestBody Map<String, String> datas) {
		   int val=Integer.parseInt(datas.get("changtim"));
		   int swid =Integer.parseInt(datas.get("swid"));
	       System.out.println(swid+""+val);
	       statusService.updateValidity(val, swid);
	       return ResponseEntity.ok("Validity updated successfully");
	   }

	   @ResponseBody
	   @GetMapping("/category/{searchKey}/{searchby}")
	   public List<Status> categorize(@PathVariable String searchKey, @PathVariable String searchby) {
		   System.out.println(searchKey + searchby);
	       return statusService.category(searchKey, searchby);
	   }
	   
	//email   
//	   @PostMapping("/sendEmail")
//		public ResponseEntity<Map<String, String>> requestOTP(@RequestBody Map<String,String> requestBody) {
//		    String email = requestBody.get("mail");
//		    String uname = requestBody.get("user");
//		    String idate = requestBody.get("install");
//		    String edate = requestBody.get("expiry");
//		    String pname = requestBody.get("software");
//		    String val = requestBody.get("validity");
//		    System.out.println("Email id is "+email);
//	    	System.out.println("this is from the send email");
//	    	System.out.println(requestBody);
//		    String licenseKey = statusService.generateLicenseKey();
//		    System.out.println(licenseKey);
//		    if (statusService.sendLicenseKey(email, licenseKey,uname,idate,edate,pname,val) ){
//		    	   Map<String, String> response = new HashMap<>();
//		           response.put("message", "Request Accepted");
//		           return ResponseEntity.ok(response);
//		    }
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
	   
	   
}
