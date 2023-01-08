using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }

        //[Required]
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public bool IsCancelled { get; set; } //'n
        
        //public ICollection<AppUser> Attendees { get; set; }
        //public ICollection<ActivityAppUser> ActivityAppUsers { get; set; }
        public ICollection<ActivityAppUser> ActivityAppUsers { get; set; } = new List<ActivityAppUser>(); //'n
        //public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}