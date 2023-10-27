package org.example.data;

import org.example.models.TimeCapsule;

import java.util.Date;
import java.util.List;

public interface TimeCapsuleRepository {
    TimeCapsule findById(int id);
    List<TimeCapsule> findByOpenDate(Date date);
    TimeCapsule add(TimeCapsule timeCapsule);
    boolean update(TimeCapsule timeCapsule);
    void deleteById(int id);
    List<TimeCapsule> findUpcomingTimeCapsules(int userId);
    List<TimeCapsule> findPreviousTimeCapsules(int userId);
    List<TimeCapsule> getDueTimeCapsules();
    void markTimeCapsuleAsOpened(int capsuleId);


}
