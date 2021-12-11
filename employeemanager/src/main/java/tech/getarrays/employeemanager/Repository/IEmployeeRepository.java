package tech.getarrays.employeemanager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.employeemanager.model.Employee;

import java.util.Optional;

public interface IEmployeeRepository extends JpaRepository<Employee,Long> {
    void deleteEmployeeById(Long Id);//Long is the type of the PK

    Optional<Employee> findEmployeeById(Long id);
}
