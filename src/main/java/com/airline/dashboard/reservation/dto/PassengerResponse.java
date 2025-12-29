package com.airline.dashboard.reservation.dto;

import java.time.LocalDate;

import com.airline.dashboard.passenger.PassengerGender;

public class PassengerResponse {

    private Long passengerId;
    private String name;
    private String idNumber;
    private PassengerGender gender;
    private LocalDate dob;
    private String nationality;

    public PassengerResponse(Long passengerId, String name, String idNumber, PassengerGender gender, LocalDate dob, String nationality) {
        this.passengerId = passengerId;
        this.name = name;
        this.idNumber = idNumber;
        this.gender = gender;
        this.dob = dob;
        this.nationality = nationality;
    }

    public Long getPassengerId() {
        return passengerId;
    }

    public String getName() {
        return name;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public PassengerGender getGender() {
        return gender;
    }

    public LocalDate getDob() {
        return dob;
    }

    public String getNationality() {
        return nationality;
    }
}
