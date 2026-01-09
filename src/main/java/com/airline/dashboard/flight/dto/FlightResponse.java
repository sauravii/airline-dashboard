package com.airline.dashboard.flight.dto;

import java.time.LocalDateTime;

import com.airline.dashboard.flight.Flight;

public class FlightResponse {

    private Long flightId;
    private String origin;
    private String destination;
    private LocalDateTime departureTime;
    private Long aircraftId;

    public FlightResponse(Long flightId, String origin, String destination, LocalDateTime departureTime, Long aircraftId) {
        this.flightId = flightId;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = departureTime;
        this.aircraftId = aircraftId;
    }

    public static FlightResponse from(Flight flight) {
        return new FlightResponse(
            flight.getFlightId(),
            flight.getOrigin(),
            flight.getDestination(),
            flight.getDepartureTime(),
            flight.getAircraft() != null
                ? flight.getAircraft().getAircraftId()
                : null
        );
    }

    public Long getFlightId() {
        return flightId;
    }

    public String getOrigin() {
        return origin;
    }

    public String getDestination() {
        return destination;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public Long getAircraftId() {
        return aircraftId;
    }
}
