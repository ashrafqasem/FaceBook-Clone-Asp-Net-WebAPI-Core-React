using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using Domain;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            this._config = config;
        }

        public string CreateToken(AppUser appUser)
        {

            List<Claim> claimList = new List<Claim>();
            claimList.Add(new Claim(ClaimTypes.Name, appUser.UserName));
            claimList.Add(new Claim(ClaimTypes.NameIdentifier, appUser.Id));
            claimList.Add(new Claim(ClaimTypes.Email, appUser.Email));
            
            //SymmetricSecurityKey symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
            string tokenKey = _config["TokenKey"];
            SymmetricSecurityKey symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            SigningCredentials signingCredentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor();
            tokenDescriptor.Subject = new ClaimsIdentity(claimList);
            tokenDescriptor.Expires = DateTime.UtcNow.AddDays(7); //. too long
            tokenDescriptor.SigningCredentials = signingCredentials;

            JwtSecurityTokenHandler jwtTokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = jwtTokenHandler.CreateToken(tokenDescriptor);
            string jwtToken = jwtTokenHandler.WriteToken(securityToken);

            return jwtToken;
        }
    }
}