package com.lab4.springjwt.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="s284713_results")

public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "X", nullable = false)
    private Double x;
    @Column(name = "Y", nullable = false)
    private Double y;
    @Column(name = "R", nullable = false)
    private Double r;
    @Column(name = "Result", nullable = false)
    private String result;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

