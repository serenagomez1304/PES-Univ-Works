package com.example.demo.model;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
@Entity
@Table(name="inventory")

public class Inventory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long id;
	@Column(name = "productname")
	public String productname;
	@Column(name = "brand")
	public String brand;
	@Column(name = "supplier")
	public String supplier;
	@Column(name = "quantity")
	public long quantity;
	public long getQuantity() {
		return quantity;
	}
	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getproductname() {
		return productname;
	}
	public void setproductname(String productname) {
		this.productname = productname;
	}
	public String getbrand() {
		return brand;
	}
	public void setbrand(String brand) {
		this.brand = brand;
	}
	public String getsupplier() {
		return supplier;
	}
	public void setsupplier(String supplier) {
		this.supplier = supplier;
	}
	
}
