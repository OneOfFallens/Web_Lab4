package com.lab4.springjwt.entities;

import javax.validation.constraints.NotNull;

public class Token {
    @NotNull
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public Token(String token){
        this.token = token;
    }
}
