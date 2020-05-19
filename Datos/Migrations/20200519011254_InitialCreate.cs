using Microsoft.EntityFrameworkCore.Migrations;

namespace Datos.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tiquetes",
                columns: table => new
                {
                    Codigo = table.Column<string>(nullable: false),
                    Nombre = table.Column<string>(nullable: true),
                    Ruta = table.Column<string>(nullable: true),
                    IdCliente = table.Column<string>(nullable: true),
                    Valor = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tiquetes", x => x.Codigo);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tiquetes");
        }
    }
}
