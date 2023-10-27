package org.example.data;


import org.example.data.mappers.TimeCapsuleMapper;
import org.example.models.TimeCapsule;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Repository
public class TimeCapsuleJdbcTemplateRepository implements TimeCapsuleRepository {

    private final JdbcTemplate jdbcTemplate;
    private final TimeCapsuleMapper timeCapsuleMapper;

    public TimeCapsuleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.timeCapsuleMapper = new TimeCapsuleMapper();
    }

    @Override
    @Transactional
    public TimeCapsule findById(int id) {
        String sql = """
                SELECT * FROM TimeCapsule WHERE capsule_id = ?;
                """;
        return jdbcTemplate.queryForObject(sql, timeCapsuleMapper, id);
    }

    @Override
    @Transactional
    public List<TimeCapsule> findByOpenDate(Date date) {
        String sql = """
                SELECT * FROM TimeCapsule WHERE open_date = ?;
                """;
        return jdbcTemplate.query(sql, timeCapsuleMapper, date);
    }

    @Override
    public List<TimeCapsule> findUpcomingTimeCapsules(int userId) {
        String sql = "SELECT * FROM timecapsule WHERE is_opened = 0 AND user_id = ?";
        return jdbcTemplate.query(sql, timeCapsuleMapper, userId);
    }
    @Override
    public List<TimeCapsule> findPreviousTimeCapsules(int userId) {
        String sql = "SELECT * FROM timecapsule WHERE is_opened = 1 AND user_id = ?";
        return jdbcTemplate.query(sql, timeCapsuleMapper, userId);
    }


    @Override
    @Transactional
    public TimeCapsule add(TimeCapsule timeCapsule) {
        String sql = "INSERT INTO timecapsule (user_id, title, description, message, media, open_date, created_at, is_opened) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                timeCapsule.getUserId(),
                timeCapsule.getTitle(),
                timeCapsule.getDescription(),
                timeCapsule.getMessage(),
                timeCapsule.getMedia(),
                new java.sql.Timestamp(timeCapsule.getOpenDate().getTime()),
                new java.sql.Timestamp(timeCapsule.getCreatedAt().getTime()),
                timeCapsule.isOpened()
        );
        int lastInsertedId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        timeCapsule.setCapsuleId(lastInsertedId);

        return timeCapsule;
    }

    @Override
    @Transactional
    public boolean update(TimeCapsule timeCapsule) {
        String sql = "UPDATE TimeCapsule SET  title = ?, description = ?, message = ?, media = ?, open_date = ?, is_opened = ? WHERE capsule_id = ?;";
        int affectedRows = jdbcTemplate.update(sql,
                timeCapsule.getTitle(),
                timeCapsule.getDescription(),
                timeCapsule.getMessage(),
                timeCapsule.getMedia(),
                timeCapsule.getOpenDate() == null ? null : new java.sql.Timestamp(timeCapsule.getOpenDate().getTime()),
                timeCapsule.isOpened(),
                timeCapsule.getCapsuleId()
        );
        return affectedRows > 0;
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        String sql = """
            DELETE FROM timecapsule WHERE capsule_id = ?;
            """;
        jdbcTemplate.update(sql, id);
    }

    @Override
    @Transactional
    public List<TimeCapsule> getDueTimeCapsules() {
        String sql = "SELECT * FROM timecapsule WHERE open_date <= NOW() AND is_opened = 0";
        return jdbcTemplate.query(sql, timeCapsuleMapper);
    }

    @Override
    @Transactional
    public void markTimeCapsuleAsOpened(int capsuleId) {
        String sql = "UPDATE timecapsule SET is_opened = 1 WHERE capsule_id = ?";
        jdbcTemplate.update(sql, capsuleId);
    }
}
