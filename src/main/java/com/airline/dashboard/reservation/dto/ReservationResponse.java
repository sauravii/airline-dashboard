package com.airline.dashboard.reservation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.airline.dashboard.reservation.ReservationStatus;

public class ReservationResponse {

    private Long reservationId;
    private Long flightId;
    private Integer totalSeat;
    private BigDecimal totalAmount;
    private ReservationStatus status;
    private LocalDateTime createdAt;
    private List<PassengerResponse> passengers;

    public ReservationResponse(
            Long reservationId,
            Long flightId,
            Integer totalSeat,
            BigDecimal totalAmount,
            ReservationStatus status,
            LocalDateTime createdAt,
            List<PassengerResponse> passengers
    ) {
        this.reservationId = reservationId;
        this.flightId = flightId;
        this.totalSeat = totalSeat;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
        this.passengers = passengers;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public Long getFlightId() {
        return flightId;
    }

    public Integer getTotalSeat() {
        return totalSeat;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<PassengerResponse> getPassengers() {
        return passengers;
    }
}
