package com.lab4.springjwt.repos;

import com.lab4.springjwt.entities.Result;
import com.lab4.springjwt.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ResultsRepository extends CrudRepository<Result, Long> {
    List<Result> findAllByUser(User user);
}
