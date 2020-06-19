using System;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GUI.Config;
using GUI.Models;
using GUI.Service;

namespace GUI.Controllers
{
    [Authorize]    
    [ApiController]    
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        TiqueteContext _context;
        UserService _userService;
        JwtService _jwtService;

        public LoginController(TiqueteContext context, IOptions<AppSetting> appSettings ) 
        {
                _context = context;
                var admin = _context.Users.Find("admin");
                if (admin == null) 
                {
                    _context.Users.Add(new User() 
                    { 
                            UserName="admin", 
                            Password="admin", 
                            Email="admin@gmail.com", 
                                Estado="AC", 
                                FirstName="Administrador", 
                                LastName="", 
                                MobilePhone="31800000000"}
                    );
                    var registrosGuardados=_context.SaveChanges();
                }
                _userService = new UserService(context);
                _jwtService = new JwtService(appSettings);
 
        }

        [AllowAnonymous]
        [HttpPost()]
        public IActionResult Login(LoginInputModel model)
        {
            var user = _userService.Validate(model.UserName, model.Password);

            if (user == null)
            {
                ModelState.AddModelError("Acceso Denegado", "Username or password is incorrect");
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            var response = _jwtService.GenerateToken(user);

            return Ok(response);
        }
    }    
}
