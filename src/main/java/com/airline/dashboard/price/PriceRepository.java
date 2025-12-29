package com.airline.dashboard.price;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<Price, Long> {
    Optional<Price> findByFlight_FlightId(Long flightId);
}
