package com.student.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    @Column(name = "description", length = 255)
    private String description;

    @Size(max = 20)
    @Column(name = "hs_code", length = 20)
    private String hsCode;

    @Size(max = 20)
    @Column(name = "sku_code", length = 20)
    private String skuCode;

    @Size(max = 10)
    @Column(name = "country_of_org", length = 10)
    private String countryOfOrg;

    @Column(name = "unit_price")
    private Float unitPrice;

    @Max(value = 20)
    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "item_value")
    private Float itemValue;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "updated_date")
    private ZonedDateTime updatedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("products")
    private User createdByUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("products")
    private User1 user2;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHsCode() {
        return hsCode;
    }

    public Product hsCode(String hsCode) {
        this.hsCode = hsCode;
        return this;
    }

    public void setHsCode(String hsCode) {
        this.hsCode = hsCode;
    }

    public String getSkuCode() {
        return skuCode;
    }

    public Product skuCode(String skuCode) {
        this.skuCode = skuCode;
        return this;
    }

    public void setSkuCode(String skuCode) {
        this.skuCode = skuCode;
    }

    public String getCountryOfOrg() {
        return countryOfOrg;
    }

    public Product countryOfOrg(String countryOfOrg) {
        this.countryOfOrg = countryOfOrg;
        return this;
    }

    public void setCountryOfOrg(String countryOfOrg) {
        this.countryOfOrg = countryOfOrg;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public Product unitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Product quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getItemValue() {
        return itemValue;
    }

    public Product itemValue(Float itemValue) {
        this.itemValue = itemValue;
        return this;
    }

    public void setItemValue(Float itemValue) {
        this.itemValue = itemValue;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public Product createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public ZonedDateTime getUpdatedDate() {
        return updatedDate;
    }

    public Product updatedDate(ZonedDateTime updatedDate) {
        this.updatedDate = updatedDate;
        return this;
    }

    public void setUpdatedDate(ZonedDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public User getCreatedByUser() {
        return createdByUser;
    }

    public Product createdByUser(User user) {
        this.createdByUser = user;
        return this;
    }

    public void setCreatedByUser(User user) {
        this.createdByUser = user;
    }

    public User1 getUser2() {
        return user2;
    }

    public Product user2(User1 user1) {
        this.user2 = user1;
        return this;
    }

    public void setUser2(User1 user1) {
        this.user2 = user1;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", hsCode='" + getHsCode() + "'" +
            ", skuCode='" + getSkuCode() + "'" +
            ", countryOfOrg='" + getCountryOfOrg() + "'" +
            ", unitPrice=" + getUnitPrice() +
            ", quantity=" + getQuantity() +
            ", itemValue=" + getItemValue() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
