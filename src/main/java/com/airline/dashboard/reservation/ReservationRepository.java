package com.airline.dashboard.reservation;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("select coalesce(sum(r.totalSeat), 0) from Reservation r where r.flight.flightId = :flightId and r.status = :status")
    Long sumTotalSeatByFlightIdAndStatus(@Param("flightId") Long flightId, @Param("status") ReservationStatus status);

    Optional<Reservation> findByReservationId(Long reservationId);
}
