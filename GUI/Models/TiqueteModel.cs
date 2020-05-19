using Entity;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUI.Models {

     public class TiqueteInputModel
    {
        [Required(ErrorMessage = "El codigo es requerido")]
        public string codigo { get; set; }
        [Required(ErrorMessage = "La ruta es requerida")]
        public string ruta { get; set; }
        [Required(ErrorMessage = "La identificacion del cliente es requerido")]
        public string idCliente { get; set; }
        [Required(ErrorMessage = "el nombre es requerido")]
        public string nombre { get; set; }
        [Required(ErrorMessage = "El valor es requerido")]
        public decimal valor { get; set; }
    }
    public class TiqueteViewModel : TiqueteInputModel
    {
        public TiqueteViewModel()
        {

        }
        public TiqueteViewModel(Tiquete tiquete)
        {
            codigo = tiquete.Codigo;
            ruta = tiquete.Ruta;
            idCliente = tiquete.IdCliente;
            nombre = tiquete.Nombre;
            valor = tiquete.Valor;
        }
    }
}