package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.model.Employee;
import org.springframework.stereotype.Service;
import com.example.demo.repository.employeerepo;

@Service
public class Employeeservimpl implements empserv{

	@Autowired
	private employeerepo employeerepository;
	@Override
	public List<Employee> getAllEmployees() {
		return employeerepository.findAll();
	}
	
	@Override
	public void saveEmployee(Employee employee) {
		this.employeerepository.save(employee);
		
	}

	@Override
	public Employee getEmployeebyid(long id) {
		Optional<Employee> optional = employeerepository.findById(id);
		Employee employee = null;
		if(optional.isPresent()) {
			employee=optional.get();
		}
		else {
			throw new RuntimeException("Employee not found for this ID");
		}
		return employee;
	}
	
	@Override
	public void deleteEmployeebyid(long id) {
		this.employeerepository.deleteById(id);
		
	}
}
