package com.example.demo.scheduler;

 

import java.time.LocalDate;
import java.util.List;

 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.model.Status;
import com.example.demo.service.EmailService;
import com.example.demo.service.StatusService;

import jakarta.mail.MessagingException;

 

@Component
public class ScheduledEmailService {
	  private final StatusService statusService;
	    private final EmailService emailService;

 

	    @Autowired
	    public ScheduledEmailService(StatusService Service, EmailService emailService) {
	        this.statusService = Service;
	        this.emailService = emailService;
	    }

 

	    @Scheduled(cron = "0 41 0 * * ?") // This schedules the task to run every day at midnight
	    public void sendDueDateReminders() {
	    	System.out.println("Scheduled mail executed at 10:20 AM.");
	        LocalDate today = LocalDate.now(); 
	        
	        // Send reminders one week before expiry
	        LocalDate oneWeekBefore = today.plusDays(7);
	        sendRemindersForDueDate(oneWeekBefore, "expires in One Week.");
	        
	        // Send reminders two days before expiry
	        LocalDate twoDaysBefore = today.plusDays(2);
	        sendRemindersForDueDate(twoDaysBefore, "expires in Two days.");
	        
	        // Send reminders one day before expiry
	        LocalDate oneDayBefore = today.plusDays(1);
	        sendRemindersForDueDate(oneDayBefore, "expires in One day.");
	        
	        // Send reminders on the expiry day
	        sendRemindersForDueDate(today, "on the expiry date.");
	        
	    }

 

	    private void sendRemindersForDueDate(LocalDate dueDateThreshold, String message) {
	    	System.out.println("send mail");
	        List<Status> customersWithDueDate = statusService.getUsersWithExpDate(dueDateThreshold);
	        for (Status customer : customersWithDueDate) {
	            String emailContent = "<html>\r\n" +
	                    "    <head>\r\n" +
	                    "        <title>Reminder</title>\r\n" +
	                    "    </head>\r\n" +
	                    "    <body>\r\n" +
	                    "        <p>Dear " + customer.getName() + ",</p>\r\n" +
	                    "        <p>" + customer.getProductname() + message + "</p>\r\n" +
	                    "        <p>Please renew as soon as possible.</p>\r\n" +
	                    "        <br>\r\n" +
	                    "        <br>\r\n" +
	                    "        <table>\r\n" +
	                    "            <tr>\r\n" +
	                    "                <td>Id : </td>\r\n" +
	                    "                <td>" + customer.getSystemid() + "</td>\r\n" +
	                    "            </tr>\r\n" +
	                    "            <tr>\r\n" +
	                    "                <td>Product Name : </td>\r\n" +
	                    "                <td>" + customer.getProductname() + "</td>\r\n" +
	                    "            </tr>\r\n" +
	                    "            <tr>\r\n" +
	                    "                <td>Validity : </td>\r\n" +
	                    "                <td>" + customer.getValidity() + "</td>\r\n" +
	                    "            </tr>\r\n" +
	                    "            <tr>\r\n" +
	                    "                <td>Expiry Date : </td>\r\n" +
	                    "                <td>" + customer.getExpirydate() + "</td>\r\n" +
	                    "            </tr>\r\n" +
	                    "        </table>\r\n" +
	                    "    </body>\r\n" +
	                    "</html>";

 

	            try {
	                emailService.sendEmail(customer.getMailid(), "Renew Reminder", emailContent);
	                System.out.println("mail send");
	            } catch (MessagingException e) {
	                // Handle email sending exception (log or rethrow if necessary)
	                e.printStackTrace();
	            }
	        }
	    }

}