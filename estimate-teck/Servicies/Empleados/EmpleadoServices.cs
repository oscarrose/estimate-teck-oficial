using estimate_teck.DTO;
using estimate_teck.Data;
using estimate_teck.Models;
using Microsoft.EntityFrameworkCore;

namespace estimate_teck.Servicies.Empleados
{
    public class EmpleadoServices: IEmpleado
    {
        private readonly estimate_teckContext _context;
        public EmpleadoServices( estimate_teckContext  context)
        {
            _context= context;
        }

        public bool EmployeeExists(string identificacion)
        {
            return (_context.Empleados?.Any(e => e.Identificacion == identificacion)).GetValueOrDefault();
        }

        public bool EmployeeIdExists(int id)
        {
            return (_context.Empleados?.Any(e => e.EmpleadoId == id)).GetValueOrDefault();
        }

        public async Task<IEnumerable<empleadoDto>> GetAllEmployees()
        {
           
            var resultEmployee = await
                (
                from employee in _context.Empleados
                join cargo in _context.Cargos on employee.CargoId equals cargo.CargoId
                join statusEmployee in _context.EstadoUsuarioEmpleados on employee.EstadoId equals statusEmployee.EstadoId
                select new empleadoDto
                {
                    EmpleadoId= employee.EmpleadoId,   
                    Nombre= employee.Nombre,
                    Apellido = employee.Apellido,
                    Estado =statusEmployee.Estado,
                    EstadoId= statusEmployee.EstadoId,
                    Pais=employee.Pais,
                    Provincia=employee.Provincia,
                    Ciudad=employee.Ciudad,
                    FechaNacimiento=employee.FechaNacimiento,
                    CreadoPor=employee.CreadoPor,
                    Direccion=employee.Direccion,
                    CargoId = employee.CargoId,
                    Cargo = cargo.Nombre,
                    Email = employee.Email,
                    Identificacion= employee.Identificacion,
                    TelefonoResidencial = employee.TelefonoResidencial,
                    Celular= employee.Celular,
                    FechaCreacion= employee.FechaCreacion,
                 
                }).ToListAsync();
            return resultEmployee;
        }
    }
}
