package com.example.demo.service;

import java.net.Authenticator;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;

//import javax.mail.Message;
//import javax.mail.PasswordAuthentication;
//import javax.mail.Session;
//import javax.mail.Transport;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import com.example.demo.model.Status;
import com.example.demo.repository.StatusRepository;

import jakarta.transaction.Transactional;

@Service
public class StatusService {
	@Autowired
	StatusRepository statusrepository;
	
	public void createStatus(Status status) {
//	    List<Status> sys = statusrepository.softwaresofuser(status.getSystemid());
//
//	    for (Status i : sys) {
//	        if (status.getProductname().equals(i.getProductname())) {
//	            System.out.println("Same");
//	            i.setSoftwarestatus("Active");
//	            statusrepository.save(i);
//	            return ; 
//	        }
//	    }
//	    System.out.println("New entry");
	    statusrepository.save(status);
	}
	
	
	public boolean isSoftwareInstalled(String systemId, String productName) {
        List<Status> sys = statusrepository.softwaresofuser(systemId);
        for (Status i : sys) {
            if (productName.equals(i.getProductname())) {
                return true;
            }
        }
        return false;
    }
	

	
	
	public void savestatus(Status status) {
		statusrepository.save(status);
	}

	public Optional<Status> getstatusById(Integer softwareid) {
		return statusrepository.findById(softwareid);
	}

	public List<Status> getAllstatus() {
		return statusrepository.findAll();
	}
	

	public void deletestatus(Integer softwareid) {
		statusrepository.deleteById(softwareid);
	}
	
	public List<Status> findByStatuses(String status){
		return statusrepository.findBySoftwarestatus(status);
	}

	public List<Status>findusersoftwares(String systemid){
		return statusrepository.findsoftwaresofuser(systemid);
	}
	
	public int countofservice() {
		return statusrepository.countsoft();
	}
	
	public int cost() {
		return statusrepository.cost();
	}
	

	 

	public Map<String,Long> countswVu()
		{
			List<Object[]> planList = statusrepository.countswVu();
			Map<String,Long> planMap = new HashMap<>();
			for(Object[] object : planList)
			{
				String labels = object[0].toString();
				Long values =  ((Number) object[1]).longValue();
				planMap.put(labels, values);
			}
			return planMap;
		}
	
	
//email	
//	public boolean sendLicenseKey(String email, String licenseKey,String uname,String idate, String edate
//			, String pname, String val) {
//		System.out.println("Outlook Email Start");
//		String smtpHostServer = "smtp.office365.com";
//		final String emailID = "prosync80329@outlook.com";
//		final String password = "Jerish@2002";
//		String toEmail = email;
//		String subject = "Random Phone Number";
//		String messageBody = "The Product Name"+" " + pname+ "\n LicenseKey is " +" "+licenseKey
//				+"\n Starting Date"+" "+idate + "\n Expiry Date"+" "+edate + "\nValditiy"+" "+val;
//		Properties props = new Properties();
//		props.put("mail.smtp.host", smtpHostServer);
//		props.put("mail.smtp.port", "587");
//		props.put("mail.smtp.auth", "true");
//		props.put("mail.smtp.starttls.enable", "true");
//
//		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
//		    protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
//		        return new javax.mail.PasswordAuthentication(emailID, password);
//		    }
//		});
//		sendGeneratedLicenseKey(licenseKey,session, emailID, subject, messageBody, toEmail);
//		return true;
//		}
//		
////email
//	public void sendGeneratedLicenseKey(String licenseKey, Session session, String emailID, String subject,
//			String messageBody, String toEmail) {
//				try {
//					System.out.println(licenseKey);
//					MimeMessage msg = new MimeMessage(session);
//					msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
//					msg.addHeader("format", "flowed");
//					msg.addHeader("Content-Transfer-Encoding", "8bit");
//					msg.setFrom(new InternetAddress(emailID,"NoReply"));
//					msg.setReplyTo(InternetAddress.parse(toEmail,false));
//					msg.setRecipients(Message.RecipientType.TO,InternetAddress.parse(toEmail,false));
//					msg.setSubject(subject, "UTF-8");
//					msg.setSentDate(new Date());
//					msg.setText(messageBody, "UTF-8");
//					System.out.println("Message is ready");
//					Transport.send(msg);
//					System.out.println("Email Sent Successfully!!");
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//			}
//email
	public String generateLicenseKey() {
		Random random = new Random();
        int licenseKey = 100000 + random.nextInt(900000); // Generates a number between 100000 and 999999
        return String.valueOf(licenseKey);
			}


	@Modifying
	@Transactional
	public void updateValidity(int newValidity, int softwareId) {
		statusrepository.changevalid(newValidity, softwareId);
	}
	
	
	public List<Status> getUsersWithExpDate(LocalDate expirydate) {
		System.out.println("service");
        return statusrepository.getUsersWithExpDate(expirydate);
    }


	public List<Status> category(String searchKey, String searchby) {
		if(searchby.equalsIgnoreCase("name")) {
		return statusrepository.findAllByName(searchKey);
		}
		if(searchby.equalsIgnoreCase("productname")) {
			System.out.println("works");
			List<Status> statuss =  statusrepository.findAllByProductname(searchKey);
			System.out.println(statuss);
			return statuss;
		}
		return null;
	}
	
}
