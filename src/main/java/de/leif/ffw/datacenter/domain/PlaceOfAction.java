package de.leif.ffw.datacenter.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PlaceOfAction.
 */
@Entity
@Table(name = "place_of_action")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlaceOfAction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "street")
    private String street;

    @Column(name = "house_number")
    private String houseNumber;

    @Column(name = "city")
    private String city;

    @Column(name = "addition")
    private String addition;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private GeoPosition geoPosition;

    @OneToOne(mappedBy = "placeOfAction")
    @JsonIgnore
    private AlarmInfo alarmInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public PlaceOfAction street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public PlaceOfAction houseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
        return this;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getCity() {
        return city;
    }

    public PlaceOfAction city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddition() {
        return addition;
    }

    public PlaceOfAction addition(String addition) {
        this.addition = addition;
        return this;
    }

    public void setAddition(String addition) {
        this.addition = addition;
    }

    public GeoPosition getGeoPosition() {
        return geoPosition;
    }

    public PlaceOfAction geoPosition(GeoPosition geoPosition) {
        this.geoPosition = geoPosition;
        return this;
    }

    public void setGeoPosition(GeoPosition geoPosition) {
        this.geoPosition = geoPosition;
    }

    public AlarmInfo getAlarmInfo() {
        return alarmInfo;
    }

    public PlaceOfAction alarmInfo(AlarmInfo alarmInfo) {
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
        PlaceOfAction placeOfAction = (PlaceOfAction) o;
        if (placeOfAction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), placeOfAction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlaceOfAction{" +
            "id=" + getId() +
            ", street='" + getStreet() + "'" +
            ", houseNumber='" + getHouseNumber() + "'" +
            ", city='" + getCity() + "'" +
            ", addition='" + getAddition() + "'" +
            "}";
    }
}
