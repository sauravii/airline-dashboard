package com.airline.dashboard.price.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

public class PriceUpsertRequest {

    @NotNull
    private BigDecimal amount;

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
