using System.ComponentModel.DataAnnotations;
using System;

namespace Entity
{
    public class Tiquete
    {
        [Key]
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Ruta { get; set; }
        public string IdCliente { get; set; }
        public decimal Valor { get; set; }

    }
}
