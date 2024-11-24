using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BookStore.src.Entity;
using BookStore.src.Utils;

namespace BookStore.src.DTO
{
    public class UserDTO
    {
        public class UserCreateDto
        {
            // public string? Name { get; set; }

            // public string? Address { get; set; }

            // public long? Phone { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [DataType(DataType.Password), Required]
            [PasswordComplexityAttribute]
            public string Password { get; set; }
        }

        public class UserSigninDto
        {

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [DataType(DataType.Password), Required]
            [PasswordComplexityAttribute]
            public string Password { get; set; }
        }

        public class UserReadDto
        {
            public Guid UserId { get; set; }
            public string? Name { get; set; }

            public string? Address { get; set; }

            public long? Phone { get; set; }

            public string Email { get; set; }

            public Role Role { get; set; }
        }

        public class UserUpdateDto
        {
            public string? Name { get; set; }

            public string? Address { get; set; }

            public long? Phone { get; set; }

            public string? Email { get; set; }
            public string? Password { get; set; }

            // public byte[]? Salt { get; set; }
        }
    }
}
