using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class TiqueteService
    {
        private readonly TiqueteContext _context;
        public TiqueteService(TiqueteContext context)
        {
            _context=context;
        }
        public GuardarTiqueteResponse Guardar(Tiquete tiquete)
        {
            try
            {
                var tiqueteBuscado = _context.Tiquetes.Find(tiquete.Codigo);
                if(tiqueteBuscado != null){
                    return new GuardarTiqueteResponse("Error, el tiquete ya se encuentra registrado");
                }
                _context.Tiquetes.Add(tiquete);
                _context.SaveChanges();
                return new GuardarTiqueteResponse(tiquete);
            }
            catch (Exception e)
            {
                return new GuardarTiqueteResponse($"Error de la Aplicacion: {e.Message}");
            }
        }
        public List<Tiquete> ConsultarTodos()
        {
            List<Tiquete> tiquetes = _context.Tiquetes.ToList();
            return tiquetes;
        }
    }
    public class GuardarTiqueteResponse 
    {
        public GuardarTiqueteResponse(Tiquete tiquete)
        {
            Error = false;
            Tiquete = tiquete;
        }
        public GuardarTiqueteResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Tiquete Tiquete { get; set; }
    }
}