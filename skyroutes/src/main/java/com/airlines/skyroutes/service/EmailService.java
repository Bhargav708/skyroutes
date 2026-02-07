package com.airlines.skyroutes.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendReservationConfirmationEmail(
            String toEmail,
            String passengerName,
            String companyName,
            LocalDate travelDate,
            LocalTime departureTime,
            String source,
            String destination,
            String travelClass,
            int seatCount,
            String seatNumber,
            double totalCost,
            String boardingPassUrl
    ) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject( companyName + " - Flight Reservation Confirmation");

        String emailContent = "<h2>Dear " + passengerName + ",</h2>"
                + "<p>Thank you for choosing <b>" + companyName + "</b> for your journey.</p>"
                + "<p>We are pleased to confirm your flight reservation with the details below:</p>"

                + "<h3>🔹 Flight Details:</h3>"
                + "<ul>"
                + "<li><b>Airline:</b> " + companyName + "</li>"
                + "<li><b>Passenger:</b> " + passengerName + "</li>"
                + "<li><b>Route:</b> " + source + " ➝ " + destination + "</li>"
                + "<li><b>Date:</b> " + travelDate + "</li>"
                + "<li><b>Time:</b> " + departureTime + "</li>"
                + "</ul>"

                + "<h3> Ticket Information:</h3>"
                + "<ul>"
                + "<li><b>Category:</b> " + travelClass + "</li>"
                + "<li><b>Seats:</b> " + seatCount + "</li>"
                + "<li><b>Seat Number:</b> " + seatNumber + "</li>"
                + "<li><b>Total Cost:</b> ₹" + totalCost + "</li>"
                + "</ul>"

                + "<p>For a smooth boarding experience, please arrive at the airport at least <b>2 hours</b> before departure.</p>"
                + "<p>You can download your boarding pass here: <a href='http://localhost:5173/boarding-pass/11'" + boardingPassUrl + "'>Download Boarding Pass</a></p>"

                + "<p>We wish you a pleasant journey with <b>" + companyName + "</b>!</p>"

                + "<br><br>Best regards,<br>"
                + "<b>SkyRoutes Airlines Team</b>";

        helper.setText(emailContent, true); // Enables HTML formatting

        mailSender.send(message);
    }
}
