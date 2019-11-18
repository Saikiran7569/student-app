package com.student.service.dto;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.student.domain.Product} entity.
 */
public class ProductDTO implements Serializable {

    private Long id;

    @Size(max = 255)
    private String description;

    @Size(max = 20)
    private String hsCode;

    @Size(max = 20)
    private String skuCode;

    @Size(max = 10)
    private String countryOfOrg;

    private Float unitPrice;

    @Max(value = 20)
    private Integer quantity;

    private Float itemValue;

    private ZonedDateTime createdDate;

    private ZonedDateTime updatedDate;


    private Long createdByUserId;

    private Long user2Id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHsCode() {
        return hsCode;
    }

    public void setHsCode(String hsCode) {
        this.hsCode = hsCode;
    }

    public String getSkuCode() {
        return skuCode;
    }

    public void setSkuCode(String skuCode) {
        this.skuCode = skuCode;
    }

    public String getCountryOfOrg() {
        return countryOfOrg;
    }

    public void setCountryOfOrg(String countryOfOrg) {
        this.countryOfOrg = countryOfOrg;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getItemValue() {
        return itemValue;
    }

    public void setItemValue(Float itemValue) {
        this.itemValue = itemValue;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public ZonedDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(ZonedDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Long getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(Long userId) {
        this.createdByUserId = userId;
    }

    public Long getUser2Id() {
        return user2Id;
    }

    public void setUser2Id(Long user1Id) {
        this.user2Id = user1Id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if (productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
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
            ", createdByUser=" + getCreatedByUserId() +
            ", user2=" + getUser2Id() +
            "}";
    }
}
