using System;
using BookStore.src.Utils;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BookStore.src.Entity
{
    public class User
    {
        public Guid UserId { get; set; }
        public string? Name { get; set; }

        public string? Address { get; set; }

        public long? Phone { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [DataType(DataType.Password), Required]
        [PasswordComplexityAttribute]
        public string Password { get; set; }

        public byte[]? Salt { get; set; }

        public Role Role { get; set; } = Role.Customer;

        // connnections with other entities

        public Guid? OrderId { get; set; }
        public List<Order>? Order { get; set; }

        [ForeignKey("CartId")]
        public Guid? CartId { get; set; }
        // \\public Cart? Cart { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]

    public enum Role
    {
        Admin,
        Customer,
    }
}
