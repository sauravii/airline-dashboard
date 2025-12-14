package com.airline.dashboard.aircraft;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.airline.dashboard.aircraft.dto.AircraftRequest;
import com.airline.dashboard.aircraft.dto.AircraftResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/aircraft")
public class AircraftController {

    private final AircraftService aircraftService;

    public AircraftController(AircraftService aircraftService) {
        this.aircraftService = aircraftService;
    }

    @GetMapping
    public List<AircraftResponse> getAll() {
        return aircraftService.getAll();
    }

    @GetMapping("/{id}")
    public AircraftResponse getById(@PathVariable Long id) {
        return aircraftService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AircraftResponse create(@Valid @RequestBody AircraftRequest request) {
        return aircraftService.create(request);
    }

    @PutMapping("/{id}")
    public AircraftResponse update(@PathVariable Long id, @Valid @RequestBody AircraftRequest request) {
        return aircraftService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        aircraftService.delete(id);
    }
}
