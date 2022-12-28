using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        // (?=.*\\d) = at least one number
        // (?=.*[a-z]) = at lease one lower case char
        // (?=.*[A-Z]) = at lease one uber case char
        // .{4,8} = string length from 4 - 8
        // $ = end regular expression
        
        //[RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$")]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        [Required]
        public string Password { get; set; }

        [Required]
        public string UserName { get; set; }
    }
}