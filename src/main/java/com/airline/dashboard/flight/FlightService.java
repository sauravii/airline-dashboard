package com.airline.dashboard.flight;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.airline.dashboard.aircraft.Aircraft;
import com.airline.dashboard.aircraft.AircraftRepository;
import com.airline.dashboard.flight.dto.FlightRequest;
import com.airline.dashboard.flight.dto.FlightResponse;

@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final AircraftRepository aircraftRepository;

    public FlightService(FlightRepository flightRepository, AircraftRepository aircraftRepository) {
        this.flightRepository = flightRepository;
        this.aircraftRepository = aircraftRepository;
    }

    public List<FlightResponse> getAll() {
        return flightRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public FlightResponse getById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found"));
        return toResponse(flight);
    }

    public FlightResponse create(FlightRequest request) {
        Aircraft aircraft = aircraftRepository.findById(request.getAircraftId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aircraft not found"));

        Flight flight = new Flight();
        flight.setOrigin(request.getOrigin());
        flight.setDestination(request.getDestination());
        flight.setDepartureTime(request.getDepartureTime());
        flight.setAircraft(aircraft);

        Flight saved = flightRepository.save(flight);
        return toResponse(saved);
    }

    public FlightResponse update(Long id, FlightRequest request) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found"));

        Aircraft aircraft = aircraftRepository.findById(request.getAircraftId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aircraft not found"));

        flight.setOrigin(request.getOrigin());
        flight.setDestination(request.getDestination());
        flight.setDepartureTime(request.getDepartureTime());
        flight.setAircraft(aircraft);

        Flight saved = flightRepository.save(flight);
        return toResponse(saved);
    }

    public void delete(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found"));
        flightRepository.delete(flight);
    }

    private FlightResponse toResponse(Flight flight) {
        Long aircraftId = flight.getAircraft() != null ? flight.getAircraft().getAircraftId() : null;
        return new FlightResponse(
                flight.getFlightId(),
                flight.getOrigin(),
                flight.getDestination(),
                flight.getDepartureTime(),
                aircraftId
        );
    }
}
