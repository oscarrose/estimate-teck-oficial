using estimate_teck.Data;
using estimate_teck.DTO;
using estimate_teck.Models;
using estimate_teck.Servicies.Empleados;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        private readonly estimate_teckContext _context;
        private readonly IEmpleado _servicesEmployee;
        public EmpleadosController(estimate_teckContext context, IEmpleado servicesEmployee)
        {
            _context = context;
            _servicesEmployee = servicesEmployee;
        }

        [HttpGet("GetAllEmployee")]
        public async Task<IActionResult> GetAllEmployee()
        {
            if (_context.Empleados == null) return NotFound();

            return Ok(await _servicesEmployee.GetAllEmployees());

        }
        [HttpPost("CreateEmployee")]
        public async Task<ActionResult<Empleado>> CreateEmployee([FromBody] Empleado employee)
        {
            if (_context.Empleados == null)
            {
                return Problem("Entity set 'estimate_teckContext.Empleados'  is null.");
            }
            if (_servicesEmployee.EmployeeExists(employee.Identificacion))
            {
                return BadRequest("Empleado se encuentra registrado");
            }
            try
            {
                _context.Empleados.Add(employee);
                await _context.SaveChangesAsync();
              var resulCargo = (_context.Cargos.Where(e => e.CargoId == employee.EstadoId).FirstOrDefault());

                var resultEmployee = new empleadoDto();
                resultEmployee.EmpleadoId = employee.EmpleadoId;
                resultEmployee.NombreCompleto = string.Concat(employee.Nombre, " ", employee.Apellido);
                resultEmployee.Nombre = employee.Nombre;
                resultEmployee.Apellido = employee.Apellido;
                resultEmployee.Estado = "Activo";
                resultEmployee.EstadoId = employee.EstadoId;
                resultEmployee.Calle = employee.Calle;
                resultEmployee.Sector = employee.Sector;
                resultEmployee.Ciudad = employee.Ciudad;
                resultEmployee.Direccion = String.Concat(employee.Ciudad, " ", employee.Sector, " ", employee.Calle);
                resultEmployee.CargoId = employee.CargoId;
                resultEmployee.Cargo = resulCargo.Nombre;
                resultEmployee.Email = employee.Email;
                resultEmployee.Identificacion = employee.Identificacion;
                resultEmployee.TelefonoResidencial = employee.TelefonoResidencial;
                resultEmployee.Celular = employee.Celular;
                resultEmployee.FechaCreacion = employee.FechaCreacion;


                return Ok(resultEmployee);
            }
            catch (Exception)
            {

                throw;
            }

        }
        // PUT: api/Empleados/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateEmployee/{id}")]
        public async Task<IActionResult> PutEmployee(int id, [FromBody] Empleado employee)
        {
            try
            {
                if (!_servicesEmployee.EmployeeIdExists(employee.EmpleadoId))
                {
                    return NotFound();
                }

                if (id != employee.EmpleadoId)
                {
                    return BadRequest();
                }
                var DataEmployee = new Empleado()
                {
                    EmpleadoId = employee.EmpleadoId,
                    Nombre = employee.Nombre,
                    Apellido = employee.Apellido,
                    CargoId = employee.CargoId,
                    Email = employee.Email,
                    EstadoId = employee.EstadoId,
                    Identificacion = employee.Identificacion,
                    TelefonoResidencial = employee.TelefonoResidencial,
                    Calle = employee.Calle,
                    Ciudad = employee.Ciudad,
                    Sector = employee.Sector,
                    Celular = employee.Celular,
                    FechaCreacion = employee.FechaCreacion,
                };

                _context.Entry(DataEmployee).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }


        }
    }
}
