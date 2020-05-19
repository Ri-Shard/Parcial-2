using Entity;
using Microsoft.EntityFrameworkCore;

namespace Datos
{
    public class TiqueteContext : DbContext
    {
        public TiqueteContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Tiquete> Tiquetes { get; set; }
	}
}
