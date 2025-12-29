package com.airline.dashboard.price.dto;

import java.math.BigDecimal;

public class PriceResponse {

    private Long priceId;
    private Long flightId;
    private BigDecimal amount;

    public PriceResponse(Long priceId, Long flightId, BigDecimal amount) {
        this.priceId = priceId;
        this.flightId = flightId;
        this.amount = amount;
    }

    public Long getPriceId() {
        return priceId;
    }

    public Long getFlightId() {
        return flightId;
    }

    public BigDecimal getAmount() {
        return amount;
    }
}
