import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailSender {
    public static void sendResetEmail(String recipientEmail, String resetCode) {
        // Konfiguracja danych serwera SMTP
        // SMTP server data configuration
        String smtpHost = "smtp.example.com";
        int smtpPort = 587;
        String smtpUsername = "your_username";
        String smtpPassword = "your_password";

        // Utworzenie właściwości dla sesji poczty
        //Create properties for the mail session
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", smtpHost);
        properties.put("mail.smtp.port", smtpPort);

        // Tworzenie sesji poczty
        //Creating a mail session
        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(smtpUsername, smtpPassword);
            }
        });

        try {
            // Tworzenie wiadomości e-mail
            // Create an email
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(smtpUsername));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
            message.setSubject("Reset Password Code");
            message.setText("Hello,\n\nHere is your password reset code: " + resetCode + "\n\nBest regards,\nThe Example Team");

            // Wysyłanie wiadomości e-mail
            // sending an e-amil
            Transport.send(message);
            System.out.println("E-mail sent successfully");
        } catch (MessagingException e) {
            System.out.println("An error occurred while sending the email: " + e.getMessage());
        }
    }
}
