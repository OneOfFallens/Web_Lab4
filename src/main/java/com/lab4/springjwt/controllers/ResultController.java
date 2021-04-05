package com.lab4.springjwt.controllers;

import com.lab4.springjwt.entities.Result;
import com.lab4.springjwt.entities.User;
import com.lab4.springjwt.services.ResultService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class ResultController {
    final ResultService resultService;

    public ResultController(ResultService pointsService) {
        this.resultService = pointsService;
    }

    @PostMapping("/hits")
    public ResponseEntity<String> addResult(@AuthenticationPrincipal User user,
                                           @RequestBody @Valid Result result,
                                           BindingResult bindingResult) {
        try {
            log.debug("POST request to add point {}", result);
            if (bindingResult.hasErrors()) {
                log.error("Validation error");
                return new ResponseEntity<>("Ошибка валидации", HttpStatus.BAD_REQUEST);
            }
            result.setUser(user);
            if (resultService.saveResult(result)) {
                return new ResponseEntity<>("Добавлена в БД", HttpStatus.OK);
            }
            return new ResponseEntity<>("Не удалось сохранить точку в БД", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Unexpected error {}", e.getMessage());
            return new ResponseEntity<>("Invalid data", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/hits")
    public ResponseEntity<List<Result>> getPoints(@AuthenticationPrincipal User user) {
        log.debug("POST request to get all user's points");
        List<Result> points = resultService.findAllResultsByUser(user);
        return new ResponseEntity<>(points, HttpStatus.OK);
    }
}
