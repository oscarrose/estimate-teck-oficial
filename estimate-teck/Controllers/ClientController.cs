﻿using estimate_teck.Data;
using estimate_teck.Models;
using Microsoft.AspNetCore.Mvc;
using estimate_teck.DTO;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly estimate_teckContext _context;
        public ClientController(estimate_teckContext context)
        {
            _context = context;
        }

        // GET: api/<ClientController>
        [HttpGet("GetAllClient")]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetAllClient()
        {
            if (_context.Clientes == null) return NotFound();

            var AllClient = await (
                from c in _context.Clientes
                join tc in _context.TipoClientes on c.TipoId equals tc.TipoId
                // join us in _context.Usuarios on c.UsuarioId equals us.UsuarioId
                // join emp in _context.Empleados on us.EmpleadoId equals emp.EmpleadoId
                select new Cliente()
                {
                    ClienteId = c.ClienteId,
                    NombreCliente=c.NombreCliente,
                    Tipo=c.Tipo,
                    TipoId=c.TipoId,
                    TipoIdentificacion=c.TipoIdentificacion,
                    Identificacion = c.Identificacion,
                    Email = c.Email,
                    TelefonoResidencial = c.TelefonoResidencial,
                    Celular = c.Celular,
                    Pais=c.Pais,
                    Estado=c.Estado,
                    Ciudad=c.Ciudad,
                    Direccion=c.Direccion,
                    FechaCreacion = c.FechaCreacion

                }).ToListAsync();
            return Ok(AllClient);
        }


        //metodo para validar si existe el cliente
        private bool ClientExists(string identificacion)
        {
            return (_context.Clientes?.Any(c => c.Identificacion == identificacion)).GetValueOrDefault();

        }

        // POST api/<ClientController>
        [HttpPost("CreateClient")]
        public async Task<ActionResult<Cliente>> CreateClient([FromBody] Cliente client)
        {
            if (_context.Clientes == null)
            {
                return Problem("Entity set 'estimate_teckContext.Clientes'  is null.");
            }
            if (ClientExists(client.Identificacion))
            {
                return BadRequest("Identificacion del cliente esta registrada");
            }
            try
            {
                _context.Clientes.Add(client);
                await _context.SaveChangesAsync();
                // var resulTipoClient = (_context.TipoClientes.Where(e => e.TipoId == client.TipoId).FirstOrDefault());

                // var Resultcliente = new ClienteDTO()
                // {
                //     ClienteId = client.ClienteId,
                //     NombreCompleto = string.Concat(client.Nombre, " ", client.Apellido),
                //     Nombre = client.Nombre,
                //     Apellido = client.Apellido,
                //     TipoId = client.TipoId,
                //     Tipo = resulTipoClient.NombreTipoCliente,
                //     Calle = client.Calle,
                //     Sector = client.Sector,
                //     Ciudad = client.Ciudad,
                //     Direccion = String.Concat(client.Ciudad, " ", client.Sector, " ", client.Calle),
                //     Email = client.Email,
                //     Identificacion = client.Identificacion,
                //     TelefonoResidencial = client.TelefonoResidencial,
                //     Celular = client.Celular,
                //     FechaCreacion = client.FechaCreacion
                // };


                return Ok(client);
            }
            catch (Exception)
            {

                throw;
            }
        }



        //metodo para validar que el cliente exista 
        private bool ClienteIdExists(int id)
        {
            return (_context.Clientes?.Any(e => e.ClienteId == id)).GetValueOrDefault();
        }

        // PUT api/<ClientController>/5
        [HttpPut("PutClient/{id}")]
        public async Task<IActionResult> PutClient(int id, [FromBody] Cliente client)
        {
            try
            {
                if (!ClienteIdExists(id))
                {
                    return NotFound();
                }

                if (id != client.ClienteId)
                {
                    return BadRequest("Datos inconsistente");
                }
              
                _context.Entry(client).State = EntityState.Modified;
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
