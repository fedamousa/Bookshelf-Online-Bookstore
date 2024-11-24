using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.src.Entity
{
    public class OrderItem
    {
        [Key]
        public Guid OrderItemId { get; set; }
        
        [Required, Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Required, Range(0, double.MaxValue)]
        public double Price { get; set; }

        // Foreign key to Order
        [ForeignKey("OrderId")]
        public Guid OrderId { get; set; }
        public Order Order { get; set; }

        // Foreign key to Book
        [ForeignKey("BookId")]
        public Guid BookId { get; set; }
        public Book Book { get; set; }
    }
}
