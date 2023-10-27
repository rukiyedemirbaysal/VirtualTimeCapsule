package org.example.domain;

import org.example.data.TimeCapsuleRepository;
import org.example.models.TimeCapsule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class TimeCapsuleServiceTest {

    @Mock
    TimeCapsuleRepository timeCapsuleRepository;

    @InjectMocks
    org.example.domain.TimeCapsuleService timeCapsuleService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addTimeCapsule() {
        TimeCapsule capsule = new TimeCapsule();
        when(timeCapsuleRepository.add(any())).thenReturn(capsule);
        TimeCapsule result = timeCapsuleService.addTimeCapsule(capsule);
        assertEquals(capsule, result);
    }

    @Test
    void getTimeCapsule() {
        TimeCapsule capsule = new TimeCapsule();
        when(timeCapsuleRepository.findById(1)).thenReturn(capsule);
        TimeCapsule result = timeCapsuleService.getTimeCapsule(1);
        assertEquals(capsule, result);
    }


    @Test
    void openTimeCapsule() {
        TimeCapsule capsule = new TimeCapsule();
        when(timeCapsuleRepository.findById(1)).thenReturn(capsule);
        timeCapsuleService.openTimeCapsule(1);
        assertTrue(capsule.isOpened());
    }
}
