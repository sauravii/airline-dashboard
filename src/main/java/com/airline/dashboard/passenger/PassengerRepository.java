package com.airline.dashboard.passenger;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    List<Passenger> findByReservation_ReservationId(Long reservationId);
}
