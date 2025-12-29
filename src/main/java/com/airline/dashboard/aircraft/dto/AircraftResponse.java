package com.airline.dashboard.aircraft.dto;

 import com.airline.dashboard.aircraft.AircraftStatus;

public class AircraftResponse {

    private Long aircraftId;
    private String model;
    private Integer totalSeats;
    private AircraftStatus status;

    public AircraftResponse(Long aircraftId, String model, Integer totalSeats, AircraftStatus status) {
        this.aircraftId = aircraftId;
        this.model = model;
        this.totalSeats = totalSeats;
        this.status = status;
    }

    public Long getAircraftId() {
        return aircraftId;
    }

    public String getModel() {
        return model;
    }

    public Integer getTotalSeats() {
        return totalSeats;
    }

    public AircraftStatus getStatus() {
        return status;
    }
}
