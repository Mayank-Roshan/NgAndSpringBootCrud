package tech.getarrays.employeemanager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.employeemanager.model.Employee;

public interface IEmployeeRepository extends JpaRepository<Employee,Long> {//Long is the type of the PK


}
