package com.basarte.lab_7.graphqlcontroller;

import com.basarte.lab_7.model.Product;
import com.basarte.lab_7.service.ProductService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ProductGraphql {

    private final ProductService productService;

    public ProductGraphql(ProductService productService) {
        this.productService = productService;
    }

    @QueryMapping
    public Product getProduct(@Argument Long id) {
        return productService.findById(id).orElse(null);
    }

    @QueryMapping
    public List<Product> getAllProducts() {
        return productService.findAll();
    }

    @MutationMapping
    public Product addProduct(@Argument String name, @Argument double price) {
        Product p = new Product(null, name, price);
        return productService.create(p);
    }

    @MutationMapping
    public Product updateProduct(@Argument Long id, @Argument String name, @Argument double price) {
        Product p = new Product(id, name, price);
        return productService.update(id, p).orElse(null);
    }

    @MutationMapping
    public boolean deleteProduct(@Argument Long id) {
        return productService.delete(id);
    }
}