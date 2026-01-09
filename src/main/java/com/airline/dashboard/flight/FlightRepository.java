package com.airline.dashboard.flight;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    List<Flight> findByOriginAndDestinationAndDepartureTimeBetween(
        String origin,
        String destination,
        LocalDateTime start,
        LocalDateTime end
    );
}
