package com.airline.dashboard.aircraft.dto;

public class AircraftResponse {

    private Long aircraftId;
    private String model;
    private Integer totalSeats;

    public AircraftResponse(Long aircraftId, String model, Integer totalSeats) {
        this.aircraftId = aircraftId;
        this.model = model;
        this.totalSeats = totalSeats;
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
}
