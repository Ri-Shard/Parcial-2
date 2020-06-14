using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Logica;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using GUI.Models;
using System.ComponentModel.DataAnnotations;
using System;
using Datos;
using GUI.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace GUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiqueteController : ControllerBase
    {
        private readonly IHubContext<SignalHub> _hubContext;

        private readonly TiqueteService _tiqueteService;
      
        public TiqueteController(TiqueteContext context,IHubContext<SignalHub> hubContext)
        {
             _hubContext = hubContext;

             _tiqueteService = new TiqueteService(context);
        }

        // GET: api/Tiquete
        [HttpGet]
        public IEnumerable<TiqueteViewModel> Get()
        {
            var tiquetes = _tiqueteService.ConsultarTodos().Select(p=> new TiqueteViewModel(p));
            return tiquetes;
        }
        // POST: api/tiquete
        [HttpPost]
        public async Task<ActionResult<TiqueteViewModel>> PostAsync(TiqueteInputModel tiqueteInput)
        {
            Tiquete tiquete = MapearTiquete(tiqueteInput);
            var response = _tiqueteService.Guardar(tiquete);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Tiquete", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState){
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(response.Mensaje);
            }
            var tiqueteViewModel = new TiqueteViewModel(response.Tiquete);
            await _hubContext.Clients.All.SendAsync("TiqueteRegistrado", tiqueteViewModel);
            return Ok(tiqueteViewModel);
        }
        private Tiquete MapearTiquete(TiqueteInputModel tiqueteInput)
        {
            var tiquete = new Tiquete
            {
                Codigo = tiqueteInput.codigo,
                Ruta = tiqueteInput.ruta,
                IdCliente = tiqueteInput.idCliente,
                Nombre = tiqueteInput.nombre,
                Valor = tiqueteInput.valor
            };
            return tiquete;
        }
    }
}