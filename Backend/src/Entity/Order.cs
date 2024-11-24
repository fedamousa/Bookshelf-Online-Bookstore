using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BookStore.src.Entity
{
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }
        public Guid UserId { get; set; } // Link Order directly to User
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime? DateUpdated { get; set; }
        public double TotalPrice { get; set; }
        
        [Required]
        public Status OrderStatus { get; set; }

        // Direct collection of OrderItems
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum Status
        {
            Completed,
            Pending,
            Shipped,
            Cancelled
        }
    }
}
