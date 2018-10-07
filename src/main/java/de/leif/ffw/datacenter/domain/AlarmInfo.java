package de.leif.ffw.datacenter.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AlarmInfo.
 */
@Entity
@Table(name = "alarm_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AlarmInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_time", nullable = false)
    private Instant time;

    @NotNull
    @Column(name = "priority", nullable = false)
    private Integer priority;

    @Column(name = "jhi_comment")
    private String comment;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private PlaceOfAction placeOfAction;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private Keywords keywords;

    @OneToMany(mappedBy = "alarmInfo", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Resource> resources = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public AlarmInfo time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public Integer getPriority() {
        return priority;
    }

    public AlarmInfo priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getComment() {
        return comment;
    }

    public AlarmInfo comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public PlaceOfAction getPlaceOfAction() {
        return placeOfAction;
    }

    public AlarmInfo placeOfAction(PlaceOfAction placeOfAction) {
        this.placeOfAction = placeOfAction;
        return this;
    }

    public void setPlaceOfAction(PlaceOfAction placeOfAction) {
        this.placeOfAction = placeOfAction;
    }

    public Keywords getKeywords() {
        return keywords;
    }

    public AlarmInfo keywords(Keywords keywords) {
        this.keywords = keywords;
        return this;
    }

    public void setKeywords(Keywords keywords) {
        this.keywords = keywords;
    }

    public Set<Resource> getResources() {
        return resources;
    }

    public AlarmInfo resources(Set<Resource> resources) {
        this.resources = resources;
        return this;
    }

    public AlarmInfo addResources(Resource resource) {
        this.resources.add(resource);
        resource.setAlarmInfo(this);
        return this;
    }

    public AlarmInfo removeResources(Resource resource) {
        this.resources.remove(resource);
        resource.setAlarmInfo(null);
        return this;
    }

    public void setResources(Set<Resource> resources) {
        this.resources = resources;
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
        AlarmInfo alarmInfo = (AlarmInfo) o;
        if (alarmInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alarmInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlarmInfo{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", priority=" + getPriority() +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
