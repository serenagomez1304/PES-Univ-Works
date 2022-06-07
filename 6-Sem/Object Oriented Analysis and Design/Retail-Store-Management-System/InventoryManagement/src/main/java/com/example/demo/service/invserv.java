package com.example.demo.service;
import java.util.List;

import com.example.demo.model.Inventory;

public interface invserv {
	List<Inventory> getAllInventory();
	Inventory getInventorybyid(long id);
	void  saveInventory(Inventory inventory);
	void deleteInventorybyid(long id);
	

}
