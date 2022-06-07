package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.model.Inventory;
import org.springframework.stereotype.Service;
import com.example.demo.repository.inventoryrepo;

@Service
public class Inventoryservimpl implements invserv{

	@Autowired
	private inventoryrepo inventoryrepository;
	@Override
	public List<Inventory> getAllInventory() {
		return inventoryrepository.findAll();
	}
	
	@Override
	public void saveInventory(Inventory inventory) {
		this.inventoryrepository.save(inventory);
		
	}

	@Override
	public Inventory getInventorybyid(long id) {
		Optional<Inventory> optional = inventoryrepository.findById(id);
		Inventory inventory = null;
		if(optional.isPresent()) {
			inventory=optional.get();
		}
		else {
			throw new RuntimeException("Item not found for this ID");
		}
		return inventory;
	}
	
	@Override
	public void deleteInventorybyid(long id) {
		this.inventoryrepository.deleteById(id);
		
	}
}
