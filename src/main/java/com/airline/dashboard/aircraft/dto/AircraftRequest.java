package com.airline.dashboard.aircraft.dto;

import com.airline.dashboard.aircraft.AircraftStatus;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AircraftRequest {

    @NotBlank
    private String model;

    @NotNull
    @Min(1)
    private Integer totalSeats;

    private AircraftStatus status;

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(Integer totalSeats) {
        this.totalSeats = totalSeats;
    }

    public AircraftStatus getStatus() {
        return status;
    }

    public void setStatus(AircraftStatus status) {
        this.status = status;
    }
}
