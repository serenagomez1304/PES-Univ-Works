package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Inventory;

@Repository
public interface inventoryrepo extends JpaRepository<Inventory, Long>{

}
