CREATE DATABASE IF NOT EXISTS med_app;
USE med_app;

CREATE TABLE care_recipients (
   id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    care_recipient_id INT NOT NULL,
    medication_name VARCHAR(100) NOT NULL,
    dose_amount VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    recurrence_type ENUM('daily', 'weekly') NOT NULL,
	start_date DATE NOT NULL,
    end_date DATE DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (care_recipient_id) REFERENCES care_recipients(id)
);

CREATE TABLE doses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medication_id INT NOT NULL,
    scheduled_datetime DATETIME NOT NULL,
    taken BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (medication_id) REFERENCES medication(id)
);
