using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    //[AllowAnonymous] //' n
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            this._userManager = userManager;
            this._tokenService = tokenService;
        }

        [AllowAnonymous] //' n
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) 
        {
            AppUser appUser = await _userManager.FindByEmailAsync(loginDto.Email);

            if(User == null) { return Unauthorized(); }

            bool isValid= await _userManager.CheckPasswordAsync(appUser, loginDto.Password);

            if(isValid)
            {
                UserDto userDto = GetUserDto(appUser);
                return userDto;
            }

            return Unauthorized();
        }

        private UserDto GetUserDto(AppUser appUser)
        {
            UserDto userDto = new UserDto();
            userDto.DisplayName = appUser.DisplayName;
            userDto.Image = null;
            //userDto.Token = "this will be a token";
            userDto.Token = _tokenService.CreateToken(appUser);
            userDto.UserName = appUser.UserName;
            return userDto;
        }

        [AllowAnonymous] //' n
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            List<string> errorList = new List<string>();
            string error = "";
            string errors = "";
           
            if(await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                error = "Username is already taken";

                //return BadRequest(error);
                //errorList.Add(error);

                ModelState.AddModelError("UserName", error);
                //return BadRequest(ModelState);
                return ValidationProblem();
            }

            if(await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                error = "Email is already taken";

                //return BadRequest(error);
                //errorList.Add(error);

                ModelState.AddModelError("Email", error);
                //return BadRequest(ModelState);
                return ValidationProblem();
            }

            AppUser appUser = new AppUser();
            appUser.DisplayName = registerDto.DisplayName;
            appUser.Email = registerDto.Email;
            appUser.UserName = registerDto.UserName;

            IdentityResult identityResult = await _userManager.CreateAsync(appUser, registerDto.Password);

            if(identityResult.Succeeded)
            {
                UserDto userDto = GetUserDto(appUser);
                return userDto;
            }
            else
            {
                //List<string> errorList = new List<string>();
                
                foreach(IdentityError identityError in identityResult.Errors)
                {
                    //errorList.Add(identityError.Description);
                    ModelState.AddModelError(identityError.Code, identityError.Description);
                }

                //string errors = "";
                //errors = "Problem registering user";
                //errors = string.Join('\n', errorList);
                
                //return BadRequest(errors);
                //return BadRequest(identityResult.Errors);
            }

            //return BadRequest(errors);
            //return BadRequest(errorList);
            //return BadRequest(ModelState);
            return ValidationProblem();
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            ClaimsPrincipal user = User;
            AppUser appUser = await _userManager.FindByEmailAsync(user.FindFirstValue(ClaimTypes.Email));

            UserDto userDto = GetUserDto(appUser);
            return userDto;
        }

    }
}