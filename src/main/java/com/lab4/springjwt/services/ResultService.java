package com.lab4.springjwt.services;

import com.lab4.springjwt.entities.Result;
import com.lab4.springjwt.entities.User;
import com.lab4.springjwt.repos.ResultsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ResultService {
    final ResultsRepository resultRepository;

    public ResultService(ResultsRepository resultRepository){
        this.resultRepository = resultRepository;
    }

    public boolean saveResult(Result result){
        try{
            String isInArea = findResult(result) ? "Попала" : "Не попала";
            result.setResult(isInArea);
            resultRepository.save(result);
            log.debug("Result {} saved in database.", result);
            return true;
        }
        catch (Exception e){
            e.printStackTrace();
            log.debug("Result {} can't be saved.", result);
            return false;
        }
    }
    public List<Result> findAllResultsByUser(User user) {
        return resultRepository.findAllByUser(user);
    }

    private Boolean findResult(Result result){
        double x = result.getX();
        double y = result.getY();
        double r = result.getR();
        if (y>=0){
            return (y <= r / 2) && (x >= -r) && (x <= 0);
        }
        else{
            if ((y >= -x - r)&&(x<=0)){
                return true;
            }
            else return (x * x + y * y <= r * r / 4) && (x >= 0);
        }
    }
}
