package de.leif.ffw.datacenter.domain;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A CommonInfo.
 */
@Entity
@Table(name = "common_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CommonInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * the title
     */
    @ApiModelProperty(value = "the title")
    @Column(name = "title")
    private String title;

    /**
     * the description of the info
     */
    @ApiModelProperty(value = "the description of the info")
    @Column(name = "description")
    private String description;

    /**
     * the duration start to show the info
     */
    @ApiModelProperty(value = "the duration start to show the info")
    @Column(name = "show_start_date")
    private LocalDate showStartDate;

    /**
     * the duration end to hide the info
     */
    @ApiModelProperty(value = "the duration end to hide the info")
    @Column(name = "show_end_date")
    private LocalDate showEndDate;

    /**
     * is this info relevant for alarms in the given duration
     */
    @ApiModelProperty(value = "is this info relevant for alarms in the given duration")
    @Column(name = "alarm_relevant")
    private Boolean alarmRelevant;

    /**
     * the duration start of an alarm relevant info
     */
    @ApiModelProperty(value = "the duration start of an alarm relevant info")
    @Column(name = "alarm_relevant_start_date")
    private LocalDate alarmRelevantStartDate;

    /**
     * the duration end of an alarm relevant info
     */
    @ApiModelProperty(value = "the duration end of an alarm relevant info")
    @Column(name = "alarm_relevant_end_date")
    private LocalDate alarmRelevantEndDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public CommonInfo title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public CommonInfo description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getShowStartDate() {
        return showStartDate;
    }

    public CommonInfo showStartDate(LocalDate showStartDate) {
        this.showStartDate = showStartDate;
        return this;
    }

    public void setShowStartDate(LocalDate showStartDate) {
        this.showStartDate = showStartDate;
    }

    public LocalDate getShowEndDate() {
        return showEndDate;
    }

    public CommonInfo showEndDate(LocalDate showEndDate) {
        this.showEndDate = showEndDate;
        return this;
    }

    public void setShowEndDate(LocalDate showEndDate) {
        this.showEndDate = showEndDate;
    }

    public Boolean isAlarmRelevant() {
        return alarmRelevant;
    }

    public CommonInfo alarmRelevant(Boolean alarmRelevant) {
        this.alarmRelevant = alarmRelevant;
        return this;
    }

    public void setAlarmRelevant(Boolean alarmRelevant) {
        this.alarmRelevant = alarmRelevant;
    }

    public LocalDate getAlarmRelevantStartDate() {
        return alarmRelevantStartDate;
    }

    public CommonInfo alarmRelevantStartDate(LocalDate alarmRelevantStartDate) {
        this.alarmRelevantStartDate = alarmRelevantStartDate;
        return this;
    }

    public void setAlarmRelevantStartDate(LocalDate alarmRelevantStartDate) {
        this.alarmRelevantStartDate = alarmRelevantStartDate;
    }

    public LocalDate getAlarmRelevantEndDate() {
        return alarmRelevantEndDate;
    }

    public CommonInfo alarmRelevantEndDate(LocalDate alarmRelevantEndDate) {
        this.alarmRelevantEndDate = alarmRelevantEndDate;
        return this;
    }

    public void setAlarmRelevantEndDate(LocalDate alarmRelevantEndDate) {
        this.alarmRelevantEndDate = alarmRelevantEndDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CommonInfo commonInfo = (CommonInfo) o;
        if (commonInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commonInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommonInfo{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", showStartDate='" + getShowStartDate() + "'" +
            ", showEndDate='" + getShowEndDate() + "'" +
            ", alarmRelevant='" + isAlarmRelevant() + "'" +
            ", alarmRelevantStartDate='" + getAlarmRelevantStartDate() + "'" +
            ", alarmRelevantEndDate='" + getAlarmRelevantEndDate() + "'" +
            "}";
    }
}
