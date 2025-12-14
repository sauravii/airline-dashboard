package com.airline.dashboard.auth.dto;

public class LoginResponse {

    private String token;
    private String tokenType;
    private long expiresInMs;

    public LoginResponse(String token, String tokenType, long expiresInMs) {
        this.token = token;
        this.tokenType = tokenType;
        this.expiresInMs = expiresInMs;
    }

    public String getToken() {
        return token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public long getExpiresInMs() {
        return expiresInMs;
    }
}
