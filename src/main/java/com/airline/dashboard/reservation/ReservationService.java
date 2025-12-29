package com.airline.dashboard.reservation;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.airline.dashboard.aircraft.Aircraft;
import com.airline.dashboard.flight.Flight;
import com.airline.dashboard.flight.FlightRepository;
import com.airline.dashboard.passenger.Passenger;
import com.airline.dashboard.passenger.PassengerRepository;
import com.airline.dashboard.price.Price;
import com.airline.dashboard.price.PriceRepository;
import com.airline.dashboard.reservation.dto.PassengerRequest;
import com.airline.dashboard.reservation.dto.PassengerResponse;
import com.airline.dashboard.reservation.dto.ReservationCreateRequest;
import com.airline.dashboard.reservation.dto.ReservationResponse;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final PassengerRepository passengerRepository;
    private final FlightRepository flightRepository;
    private final PriceRepository priceRepository;

    public ReservationService(
            ReservationRepository reservationRepository,
            PassengerRepository passengerRepository,
            FlightRepository flightRepository,
            PriceRepository priceRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.passengerRepository = passengerRepository;
        this.flightRepository = flightRepository;
        this.priceRepository = priceRepository;
    }

    @Transactional(readOnly = true)
    public List<ReservationResponse> getAll() {
        return reservationRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ReservationResponse getById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found"));
        return toResponse(reservation);
    }

    @Transactional
    public ReservationResponse create(ReservationCreateRequest request) {
        Flight flight = flightRepository.findById(request.getFlightId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Flight not found"));

        Price price = priceRepository.findByFlight_FlightId(request.getFlightId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Price not found for this flight"));

        int requestedSeats = request.getPassengers().size();
        if (requestedSeats <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passengers must not be empty");
        }

        Aircraft aircraft = flight.getAircraft();
        if (aircraft == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Flight has no aircraft");
        }

        Long bookedSeatsLong = reservationRepository.sumTotalSeatByFlightIdAndStatus(request.getFlightId(), ReservationStatus.BOOKED);
        int bookedSeats = bookedSeatsLong != null ? bookedSeatsLong.intValue() : 0;

        int totalSeats = aircraft.getTotalSeats() != null ? aircraft.getTotalSeats() : 0;
        int availableSeats = totalSeats - bookedSeats;
        if (requestedSeats > availableSeats) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Not enough seats available");
        }

        BigDecimal unitPrice = price.getAmount();
        BigDecimal totalAmount = unitPrice.multiply(BigDecimal.valueOf(requestedSeats));

        Reservation reservation = new Reservation();
        reservation.setFlight(flight);
        reservation.setTotalSeat(requestedSeats);
        reservation.setTotalAmount(totalAmount);
        reservation.setStatus(ReservationStatus.BOOKED);

        Reservation savedReservation = reservationRepository.save(reservation);

        List<Passenger> passengers = request.getPassengers().stream()
                .map(p -> toPassengerEntity(savedReservation, p))
                .toList();
        passengerRepository.saveAll(passengers);

        return toResponse(savedReservation);
    }

    @Transactional
    public ReservationResponse cancel(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found"));

        reservation.setStatus(ReservationStatus.CANCELLED);
        Reservation saved = reservationRepository.save(reservation);
        return toResponse(saved);
    }

    private Passenger toPassengerEntity(Reservation reservation, PassengerRequest request) {
        Passenger passenger = new Passenger();
        passenger.setReservation(reservation);
        passenger.setName(request.getName());
        passenger.setIdNumber(request.getIdNumber());
        passenger.setGender(request.getGender());
        passenger.setDob(request.getDob());
        passenger.setNationality(request.getNationality());
        return passenger;
    }

    private ReservationResponse toResponse(Reservation reservation) {
        Long flightId = reservation.getFlight() != null ? reservation.getFlight().getFlightId() : null;
        List<PassengerResponse> passengers = passengerRepository.findByReservation_ReservationId(reservation.getReservationId()).stream()
                .map(p -> new PassengerResponse(p.getPassengerId(), p.getName(), p.getIdNumber(), p.getGender(), p.getDob(), p.getNationality()))
                .toList();

        return new ReservationResponse(
                reservation.getReservationId(),
                flightId,
                reservation.getTotalSeat(),
                reservation.getTotalAmount(),
                reservation.getStatus(),
                reservation.getCreatedAt(),
                passengers
        );
    }
}
