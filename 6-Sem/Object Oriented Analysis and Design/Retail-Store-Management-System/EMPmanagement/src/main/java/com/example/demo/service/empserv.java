package com.example.demo.service;
import java.util.List;

import com.example.demo.model.Employee;

public interface empserv {
	List<Employee> getAllEmployees();
	void  saveEmployee(Employee employee);
	Employee getEmployeebyid(long id);
	void deleteEmployeebyid(long id);

}
