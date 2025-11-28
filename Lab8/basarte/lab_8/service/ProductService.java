package com.basarte.lab_7.service;

import com.basarte.lab_7.model.Product;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {
    private final Map<Long, Product> products = new HashMap<>();
    private long nextId = 1;

    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }

    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(products.get(id));
    }

    public Product create(Product product) {
        product.setId(nextId++);
        products.put(product.getId(), product);
        return product;
    }

    public Optional<Product> update(Long id, Product product) {
        if (products.containsKey(id)) {
            product.setId(id);
            products.put(id, product);
            return Optional.of(product);
        }
        return Optional.empty();
    }

    public boolean delete(Long id) {
        return products.remove(id) != null;
    }
}