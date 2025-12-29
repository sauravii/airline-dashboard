package com.airline.dashboard.reservation.dto;

import java.time.LocalDate;

import com.airline.dashboard.passenger.PassengerGender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PassengerRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String idNumber;

    @NotNull
    private PassengerGender gender;

    @NotNull
    private LocalDate dob;

    @NotBlank
    private String nationality;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public PassengerGender getGender() {
        return gender;
    }

    public void setGender(PassengerGender gender) {
        this.gender = gender;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
}
