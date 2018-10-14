package de.leif.ffw.datacenter.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GeoPosition.
 */
@Entity
@Table(name = "geo_position")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GeoPosition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "x", nullable = false)
    private String x;

    @NotNull
    @Column(name = "y", nullable = false)
    private String y;

    @OneToOne(mappedBy = "geoPosition", fetch = FetchType.LAZY)
    @JsonIgnore
    private PlaceOfAction placeOfAction;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getX() {
        return x;
    }

    public GeoPosition x(String x) {
        this.x = x;
        return this;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public GeoPosition y(String y) {
        this.y = y;
        return this;
    }

    public void setY(String y) {
        this.y = y;
    }

    public PlaceOfAction getPlaceOfAction() {
        return placeOfAction;
    }

    public GeoPosition placeOfAction(PlaceOfAction placeOfAction) {
        this.placeOfAction = placeOfAction;
        return this;
    }

    public void setPlaceOfAction(PlaceOfAction placeOfAction) {
        this.placeOfAction = placeOfAction;
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
        GeoPosition geoPosition = (GeoPosition) o;
        if (geoPosition.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), geoPosition.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GeoPosition{" +
            "id=" + getId() +
            ", x='" + getX() + "'" +
            ", y='" + getY() + "'" +
            "}";
    }
}
