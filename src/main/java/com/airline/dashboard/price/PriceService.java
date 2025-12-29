package com.airline.dashboard.price;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.airline.dashboard.flight.Flight;
import com.airline.dashboard.flight.FlightRepository;
import com.airline.dashboard.price.dto.PriceResponse;
import com.airline.dashboard.price.dto.PriceUpsertRequest;

@Service
public class PriceService {

    private final PriceRepository priceRepository;
    private final FlightRepository flightRepository;

    public PriceService(PriceRepository priceRepository, FlightRepository flightRepository) {
        this.priceRepository = priceRepository;
        this.flightRepository = flightRepository;
    }

    public PriceResponse getByFlightId(Long flightId) {
        Price price = priceRepository.findByFlight_FlightId(flightId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Price not found"));
        return toResponse(price);
    }

    public PriceResponse upsertByFlightId(Long flightId, PriceUpsertRequest request) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Flight not found"));

        Price price = priceRepository.findByFlight_FlightId(flightId).orElseGet(Price::new);
        price.setFlight(flight);
        price.setAmount(request.getAmount());

        Price saved = priceRepository.save(price);
        return toResponse(saved);
    }

    private PriceResponse toResponse(Price price) {
        Long flightId = price.getFlight() != null ? price.getFlight().getFlightId() : null;
        return new PriceResponse(price.getPriceId(), flightId, price.getAmount());
    }
}
