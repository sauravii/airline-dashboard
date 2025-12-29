package com.airline.dashboard.price;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.airline.dashboard.price.dto.PriceResponse;
import com.airline.dashboard.price.dto.PriceUpsertRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/price")
public class PriceController {

    private final PriceService priceService;

    public PriceController(PriceService priceService) {
        this.priceService = priceService;
    }

    @GetMapping("/{flightId}")
    public PriceResponse getByFlightId(@PathVariable Long flightId) {
        return priceService.getByFlightId(flightId);
    }

    @PutMapping("/{flightId}")
    @ResponseStatus(HttpStatus.OK)
    public PriceResponse upsertByFlightId(@PathVariable Long flightId, @Valid @RequestBody PriceUpsertRequest request) {
        return priceService.upsertByFlightId(flightId, request);
    }

    @PostMapping("/{flightId}")
    @ResponseStatus(HttpStatus.OK)
    public PriceResponse upsertByFlightIdPost(@PathVariable Long flightId, @Valid @RequestBody PriceUpsertRequest request) {
        return priceService.upsertByFlightId(flightId, request);
    }
}
