using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
//
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser> // DbContext // solution >dotnet restore 
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAppUser> ActivityAppUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            /* Many to many relationship */
            builder.Entity<ActivityAppUser>(x => x.HasKey(xx => new {xx.AppUserId, xx.ActivityId})); //' Combination Primary Key

            builder.Entity<ActivityAppUser>()
                .HasOne(x => x.AppUser)
                .WithMany(xx => xx.ActivityAppUsers)
                .HasForeignKey(xxx => xxx.AppUserId);
            
            builder.Entity<ActivityAppUser>()
                .HasOne(x => x.Activity)
                .WithMany(xx => xx.ActivityAppUsers)
                .HasForeignKey(xxx => xxx.ActivityId);

        }
    }
}