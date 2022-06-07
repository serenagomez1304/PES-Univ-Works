package com.example.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.model.Inventory;
import com.example.demo.service.invserv;

@Controller
public class invcont {
	@Autowired
	private invserv inventoryService;
	@GetMapping("/")
	public String viewHomepage(Model model) {
		model.addAttribute("listInventory", inventoryService.getAllInventory());
		return "index";
	}

	@GetMapping("/newInventoryForm")
	public String newInventoryForm(Model model) {
		Inventory inventory=new Inventory();
		model.addAttribute("inventory", inventory);
		return "new_inventory";
	}
	
	@PostMapping("/saveInventory")
	public String saveInventory(@ModelAttribute("inventory") Inventory inventory) {
		inventoryService.saveInventory(inventory);
		return "redirect:/";
		
	}
	
	@GetMapping("/showFormForUpdate/{id}")
	public String showFormForUpdate(@PathVariable(value = "id") long id, Model model) {
		Inventory inventory = inventoryService.getInventorybyid(id);
		model.addAttribute("inventory", inventory);
		return "update_inventory";
	}
	
	@GetMapping("/deleteInventory/{id}")
	public String deleteInventory(@PathVariable(value = "id") long id, Model model) {
		this.inventoryService.deleteInventorybyid(id);
		return "redirect:/";
	}
}
