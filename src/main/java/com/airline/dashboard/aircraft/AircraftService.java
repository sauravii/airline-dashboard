package com.airline.dashboard.aircraft;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.airline.dashboard.aircraft.dto.AircraftRequest;
import com.airline.dashboard.aircraft.dto.AircraftResponse;

@Service
public class AircraftService {

    private final AircraftRepository aircraftRepository;

    public AircraftService(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    public List<AircraftResponse> getAll() {
        return aircraftRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public AircraftResponse getById(Long id) {
        Aircraft aircraft = aircraftRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aircraft not found"));
        return toResponse(aircraft);
    }

    public AircraftResponse create(AircraftRequest request) {
        Aircraft aircraft = new Aircraft();
        aircraft.setModel(request.getModel());
        aircraft.setTotalSeats(request.getTotalSeats());
        aircraft.setStatus(request.getStatus() != null ? request.getStatus() : AircraftStatus.ACTIVE);

        Aircraft saved = aircraftRepository.save(aircraft);
        return toResponse(saved);
    }

    public AircraftResponse update(Long id, AircraftRequest request) {
        Aircraft aircraft = aircraftRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aircraft not found"));

        aircraft.setModel(request.getModel());
        aircraft.setTotalSeats(request.getTotalSeats());
        if (request.getStatus() != null) {
            aircraft.setStatus(request.getStatus());
        }

        Aircraft saved = aircraftRepository.save(aircraft);
        return toResponse(saved);
    }

    public void delete(Long id) {
        Aircraft aircraft = aircraftRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aircraft not found"));

        try {
            aircraftRepository.delete(aircraft);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Aircraft is referenced by existing flights");
        }
    }

    private AircraftResponse toResponse(Aircraft aircraft) {
        return new AircraftResponse(aircraft.getAircraftId(), aircraft.getModel(), aircraft.getTotalSeats(), aircraft.getStatus());
    }
}
