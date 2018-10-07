package de.leif.ffw.datacenter.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Keywords.
 */
@Entity
@Table(name = "keywords")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Keywords implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "keyword")
    private String keyword;

    @Column(name = "emergency_keyword")
    private String emergencyKeyword;

    @Column(name = "b")
    private String b;

    @Column(name = "r")
    private String r;

    @Column(name = "s")
    private String s;

    @Column(name = "t")
    private String t;

    @OneToOne(mappedBy = "keywords")
    @JsonIgnore
    private AlarmInfo alarmInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKeyword() {
        return keyword;
    }

    public Keywords keyword(String keyword) {
        this.keyword = keyword;
        return this;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getEmergencyKeyword() {
        return emergencyKeyword;
    }

    public Keywords emergencyKeyword(String emergencyKeyword) {
        this.emergencyKeyword = emergencyKeyword;
        return this;
    }

    public void setEmergencyKeyword(String emergencyKeyword) {
        this.emergencyKeyword = emergencyKeyword;
    }

    public String getB() {
        return b;
    }

    public Keywords b(String b) {
        this.b = b;
        return this;
    }

    public void setB(String b) {
        this.b = b;
    }

    public String getR() {
        return r;
    }

    public Keywords r(String r) {
        this.r = r;
        return this;
    }

    public void setR(String r) {
        this.r = r;
    }

    public String getS() {
        return s;
    }

    public Keywords s(String s) {
        this.s = s;
        return this;
    }

    public void setS(String s) {
        this.s = s;
    }

    public String getT() {
        return t;
    }

    public Keywords t(String t) {
        this.t = t;
        return this;
    }

    public void setT(String t) {
        this.t = t;
    }

    public AlarmInfo getAlarmInfo() {
        return alarmInfo;
    }

    public Keywords alarmInfo(AlarmInfo alarmInfo) {
        this.alarmInfo = alarmInfo;
        return this;
    }

    public void setAlarmInfo(AlarmInfo alarmInfo) {
        this.alarmInfo = alarmInfo;
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
        Keywords keywords = (Keywords) o;
        if (keywords.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), keywords.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Keywords{" +
            "id=" + getId() +
            ", keyword='" + getKeyword() + "'" +
            ", emergencyKeyword='" + getEmergencyKeyword() + "'" +
            ", b='" + getB() + "'" +
            ", r='" + getR() + "'" +
            ", s='" + getS() + "'" +
            ", t='" + getT() + "'" +
            "}";
    }
}
