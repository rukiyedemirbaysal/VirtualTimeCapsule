package org.example.domain;

import org.example.data.TimeCapsuleRepository;
import org.example.models.TimeCapsule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Date;
import java.util.Map;

@Service
public class TimeCapsuleService {

    @Autowired
    private TimeCapsuleRepository timeCapsuleRepository;

    @Scheduled(cron = "0 * * * * ?")
    public void openTimeCapsules() {
        List<TimeCapsule> dueCapsules = timeCapsuleRepository.getDueTimeCapsules();
        for (TimeCapsule capsule : dueCapsules) {
            timeCapsuleRepository.markTimeCapsuleAsOpened(capsule.getCapsuleId());
        }
    }


    public TimeCapsule addTimeCapsule(TimeCapsule timeCapsule) {

        System.out.println("Received Date in Service: " + timeCapsule.getOpenDate());
        return timeCapsuleRepository.add(timeCapsule);
    }

    public TimeCapsule getTimeCapsule(int id) {
        return timeCapsuleRepository.findById(id);
    }

    public List<TimeCapsule> getUpcomingTimeCapsules(int userId) {
        return timeCapsuleRepository.findUpcomingTimeCapsules(userId);
    }

    public List<TimeCapsule> getPreviousTimeCapsules(int userId) {
        return timeCapsuleRepository.findPreviousTimeCapsules(userId);
    }


    public TimeCapsule openTimeCapsule(int id) {
        TimeCapsule timeCapsule = getTimeCapsule(id);
        timeCapsule.setOpened(true);
        timeCapsuleRepository.update(timeCapsule);
        return timeCapsule;
    }

    public void deleteTimeCapsule(int id) {
        timeCapsuleRepository.deleteById(id);
    }

    public void saveImagePath(int id, String imagePath) {
        TimeCapsule timeCapsule = timeCapsuleRepository.findById(id);
        if (timeCapsule != null) {
            timeCapsule.setMedia(imagePath);
            timeCapsuleRepository.update(timeCapsule);
        }
    }

    public Result<TimeCapsule> updateTimeCapsule(TimeCapsule timeCapsule) {
        Result<TimeCapsule> result = validate(timeCapsule);
        if (!result.isSuccess()) {
            return result;
        }

        if (timeCapsule.getCapsuleId() <= 0) {
            result.addMessage("TimeCapsule ID is required.");
            return result;
        }

        boolean success = timeCapsuleRepository.update(timeCapsule);
        if (!success) {
            result.addMessage("Could not update TimeCapsule with ID " + timeCapsule.getCapsuleId());
        } else {
            result.setPayload(timeCapsule);
        }

        return result;
    }

    private Result<TimeCapsule> validate(TimeCapsule timeCapsule) {
        Result<TimeCapsule> result = new Result<>();
        if (timeCapsule == null) {
            result.addMessage("TimeCapsule cannot be null");
            return result;
        }
        return result;
    }
}
