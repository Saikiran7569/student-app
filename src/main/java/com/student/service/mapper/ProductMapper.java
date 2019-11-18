package com.student.service.mapper;

import com.student.domain.*;
import com.student.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, User1Mapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "createdByUser.id", target = "createdByUserId")
    @Mapping(source = "user2.id", target = "user2Id")
    ProductDTO toDto(Product product);

    @Mapping(source = "createdByUserId", target = "createdByUser")
    @Mapping(source = "user2Id", target = "user2")
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
