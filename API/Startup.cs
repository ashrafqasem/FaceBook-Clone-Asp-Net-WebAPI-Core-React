using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
//
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.MediatorHandlers.Activities;
using AutoMapper;
using Application.Core;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace API
{
    public class Startup
    {
        /* //'
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        */
        private readonly IConfiguration _config; //'
        public Startup(IConfiguration config) //'
        {
            this._config = config; //'
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // services.AddControllers();
            // services.AddSwaggerGen(c =>
            // {
            //     c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            // });

            // services.AddDbContext<DataContext>(opt => //'
            // {
            //     opt.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            // });

            // /* For error: Access to XMLHttpRequest at 'http://localhost:5000/api/activities' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. */
            // services.AddCors(opt => //' 
            // {
            //     opt.AddPolicy("CorsPolicy", policy =>
            //     {
            //         policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
            //     });
            // });

            // services.AddMediatR(typeof(List.Handler).Assembly); //'
            // services.AddAutoMapper(typeof(MappingProfiles).Assembly); //'

            //services.AddControllers();  
            services.AddControllers(opt => { //' n
                AuthorizationPolicy authorizationPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();

                opt.Filters.Add(new AuthorizeFilter(authorizationPolicy));
            });

            services.AddApplicationServices(_config); //'
            services.AddIdentityServices(_config); //'
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>(); //'
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); //. to see exeption page in Dev only
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }

            //app.UseHttpsRedirection(); //'

            app.UseRouting();
            app.UseCors("CorsPolicy"); //' after app.UseRouting();

            app.UseAuthentication(); //' n - befor app.UseAuthorization();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
