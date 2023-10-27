package org.example.data.mappers;

import org.example.models.TimeCapsule;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TimeCapsuleMapper implements RowMapper<TimeCapsule> {

    @Override
    public TimeCapsule mapRow(ResultSet rs, int rowNum) throws SQLException {
        TimeCapsule timeCapsule = new TimeCapsule(
                rs.getInt("capsule_id"),
                rs.getInt("user_id"),
                rs.getString("title"),
                rs.getString("description"),
                rs.getString("message"),
                rs.getString("media"),
                rs.getTimestamp("open_date"),
                rs.getTimestamp("created_at"),
                rs.getBoolean("is_opened")
        );
        return timeCapsule;
    }
}
