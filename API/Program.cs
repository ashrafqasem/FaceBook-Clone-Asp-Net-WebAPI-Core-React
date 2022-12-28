using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddControllers();
builder.Services.AddControllers(opt => { //' n
    AuthorizationPolicy authorizationPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();

    opt.Filters.Add(new AuthorizeFilter(authorizationPolicy));
});


// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
    
//services.AddApplicationServices(_config); //'
builder.Services.AddApplicationServices(builder.Configuration); //'

//services.AddIdentityServices(_config); //'
builder.Services.AddIdentityServices(builder.Configuration); //' 

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>(); //'

if (app.Environment.IsDevelopment())
{
    //app.UseDeveloperExceptionPage(); //' x
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection(); //'
app.UseCors("CorsPolicy"); //' after app.UseRouting();

app.UseAuthentication(); //' n - befor app.UseAuthorization();
app.UseAuthorization();

app.MapControllers();

//'
using IServiceScope serviceScope = app.Services.CreateScope(); //'
IServiceProvider serviceProvider = serviceScope.ServiceProvider; //'

try //'
{
    DataContext context = serviceProvider.GetRequiredService<DataContext>();
    UserManager<AppUser> userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>(); //. n

    //context.Database.Migrate();
    await context.Database.MigrateAsync();

    //await Seed.SeedData(context);
    await Seed.SeedData(context, userManager); 
}
catch (Exception ex)
{
    ILogger<Program> logger = serviceProvider.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
