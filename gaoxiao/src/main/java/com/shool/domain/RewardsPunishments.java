package com.shool.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName rewards_punishments
 */
@TableName(value ="rewards_punishments")
@Data
public class RewardsPunishments implements Serializable {
    /**
     * 
     */
    @TableId(type = IdType.AUTO)
    private Integer rpId;

    /**
     * 
     */
    private Integer studentId;

    /**
     * 
     */
    private Object eventType;

    /**
     * 
     */
    private String eventDescription;

    /**
     * 
     */
    private Date eventDate;

    @TableField(exist = false)
    private Students students;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        RewardsPunishments other = (RewardsPunishments) that;
        return (this.getRpId() == null ? other.getRpId() == null : this.getRpId().equals(other.getRpId()))
            && (this.getStudentId() == null ? other.getStudentId() == null : this.getStudentId().equals(other.getStudentId()))
            && (this.getEventType() == null ? other.getEventType() == null : this.getEventType().equals(other.getEventType()))
            && (this.getEventDescription() == null ? other.getEventDescription() == null : this.getEventDescription().equals(other.getEventDescription()))
            && (this.getEventDate() == null ? other.getEventDate() == null : this.getEventDate().equals(other.getEventDate()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getRpId() == null) ? 0 : getRpId().hashCode());
        result = prime * result + ((getStudentId() == null) ? 0 : getStudentId().hashCode());
        result = prime * result + ((getEventType() == null) ? 0 : getEventType().hashCode());
        result = prime * result + ((getEventDescription() == null) ? 0 : getEventDescription().hashCode());
        result = prime * result + ((getEventDate() == null) ? 0 : getEventDate().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", rpId=").append(rpId);
        sb.append(", studentId=").append(studentId);
        sb.append(", eventType=").append(eventType);
        sb.append(", eventDescription=").append(eventDescription);
        sb.append(", eventDate=").append(eventDate);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}