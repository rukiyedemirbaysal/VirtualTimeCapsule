package org.example.models;

import java.util.Date;

public class TimeCapsule {

    private int capsuleId;
    private int userId;
    private String title;
    private String description;
    private String message;
    private String media;
    private Date openDate;
    private Date createdAt;
    private boolean isOpened;

    public TimeCapsule() {}

    public TimeCapsule(int capsuleId, int userId, String title, String description, String message, String media, Date openDate, Date createdAt, boolean isOpened) {
        this.capsuleId = capsuleId;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.message = message;
        this.media = media;
        this.openDate = openDate;
        this.createdAt = createdAt;
        this.isOpened = isOpened;
    }
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMedia() {
        return media;
    }

    public void setMedia(String media) {
        this.media = media;
    }
    public int getCapsuleId() {
        return capsuleId;
    }

    public void setCapsuleId(int capsuleId) {
        this.capsuleId = capsuleId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getOpenDate() {
        return openDate;
    }

    public void setOpenDate(Date openDate) {
        this.openDate = openDate;
    }

    public Date getCreatedAt() {
        return new Date();
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isOpened() {
        return isOpened;
    }
    public void setOpened(boolean opened) {
        isOpened = opened;
    }

}
