using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using API.Services;
using System.Text;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true; //' n
            })
            .AddEntityFrameworkStores<DataContext>();

            //SymmetricSecurityKey symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
            string tokenKey = config["TokenKey"];
            SymmetricSecurityKey symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            //services.AddAuthentication();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt => {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = symmetricKey,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
            });

            services.AddScoped<TokenService>();

            return services;
        }
    }
}