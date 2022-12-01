using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
//
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        //public static async void Main(string[] args) //'
        public static async Task Main(string[] args) //'
        {
            //CreateHostBuilder(args).Build().Run(); //'
            IHost host = CreateHostBuilder(args).Build(); //'
            using IServiceScope serviceScope = host.Services.CreateScope(); //'
            IServiceProvider serviceProvider = serviceScope.ServiceProvider; //'

            try //'
            {
                DataContext context = serviceProvider.GetRequiredService<DataContext>();
                //context.Database.Migrate();
                await context.Database.MigrateAsync();
                await Seed.SeedData(context);
                //host.Run(); // To start the applecation 
                await host.RunAsync(); // To start the applecation 
            }
            catch(Exception ex)
            {
                ILogger<Program> logger = serviceProvider.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occured during migration");
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>(); 
                });
    }
}
