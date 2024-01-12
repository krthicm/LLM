package com.example.demo.service;



import java.time.LocalDate;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
public class EmailService {
	private final JavaMailSender javaMailSender;



    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

 

    public void sendEmail(String to, String subject, String body) throws MessagingException {
    	System.out.println("a"+to);
    	System.out.println("b"+subject);
    	System.out.println("c"+body);
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("krthick.m.23@gmail.com");
        System.out.println("To Email"+to);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);
        javaMailSender.send(message);
    }
}
