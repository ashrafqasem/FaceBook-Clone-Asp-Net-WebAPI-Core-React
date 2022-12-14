using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.MediatorHandlers.Activities;
using Application.Core;
using FluentValidation.AspNetCore;
using FluentValidation;
using Application.Interfaces;
using Infrastructure.Security;

namespace API.Extensions
{
    public static class ApplicationServiceExtinsions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //services.AddControllers(); //.
            // services.AddSwaggerGen(c =>
            // {
            //     c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            // });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddDbContext<DataContext>(opt => //'
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            /* For error: Access to XMLHttpRequest at 'http://localhost:5000/api/activities' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. */
            services.AddCors(opt => //' 
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly); //'
            services.AddAutoMapper(typeof(MappingProfiles).Assembly); //'
            services.AddFluentValidationAutoValidation(); //'
            services.AddValidatorsFromAssemblyContaining<Create>(); //'

            services.AddHttpContextAccessor(); //' n IUserAccessor
            services.AddScoped<IUserAccessor, UserAccessor>(); //'n IUserAccessor

            return services;
        }
    }
}