using estimate_teck.DTO;

namespace estimate_teck.Servicies.Empleados
{
    public interface IEmpleado
    {
        // Method for get all the employees
        Task<IEnumerable<empleadoDto>> GetAllEmployees();

        // Method for check exists the employee
        bool EmployeeExists(string identificacion);

        // Method for check exists the employee
        bool EmployeeIdExists(int id);
    }
}
