package org.example;


import org.example.domain.Result;
import org.example.models.AppUser;

import java.util.List;


public class TestHelper {

    public static final int VALID_ID = 5;


    public static AppUser makeAppUser(int id) {
        return new AppUser(
                id,
                String.format("appuser%s@app.com", id),
                String.format("password_hash_%s", id),
                true,
                email, List.of(String.format("TEST_ROLE_%s", id))
        );
    }

    public static <T> Result<T> makeResult(String message, T payload) {
        Result<T> result = new Result<>();
        if (message != null) {
            result.addMessage(message);
        }
        result.setPayload(payload);
        return result;
    }
}