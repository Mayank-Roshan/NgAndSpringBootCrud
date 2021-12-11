package tech.getarrays.employeemanager.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager.Exception.UserNotFoundException;
import tech.getarrays.employeemanager.Repository.IEmployeeRepository;
import tech.getarrays.employeemanager.model.Employee;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final IEmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(IEmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee addEmployee(Employee employee){
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public Employee updateEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public Employee findEmployeeById(Long id){
        return employeeRepository.findEmployeeById(id)
                .orElseThrow(()-> new UserNotFoundException("user not found with id"+id));
    }

    public void deleteEmployee(Long Id){
        employeeRepository.deleteEmployeeById(Id);
    }
}
