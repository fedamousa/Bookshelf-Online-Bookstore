using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BookStore.src.Entity;
using static BookStore.src.DTO.OrderItemDTO;

namespace BookStore.src.DTO
{
    public class OrderDTO
    {
        //create order
        // public class OrderCreateDto
        // {
        //     //public DateTime DateCreated { get; set; }
        //     //public Guid OrderId { get; set; }
        //     //public Guid UserId { get; set; }
        //     //public float TotalPrice { get; set; }//
        //     //public List<OrderDetailCreateDto> OrderDetails { get; set; }
        //     public Guid CartId { get; set; } 
        //     //Manar used cartItems here. 
        //     //this is redundent logic for cart. we should just use cart @ali
        // }
        public class OrderCreateDto
        {
            public IEnumerable<OrderItemCreateDto> OrderItems { get; set; }
        }
        // read or get infoe of the order
        // public class OrderReadDto
        // {
        //     public Guid OrderId { get; set; }
        //     public double TotalPrice { get; set; } //i'm changing this to double for consistency accross the code @ali
        //     public DateTime DateCreated { get; set; }
        //     public Order.Status OrderStatus { get; set; }
        //     public Guid UserId { get; set; }
        //    public IEnumerable<CartItemsCreateDto> CartItems { get; set; }
        // }

        public class OrderReadDto
        {
            public Guid OrderId { get; set; }
            public Guid UserId { get; set; }
            public double TotalPrice { get; set; }
            public DateTime DateCreated { get; set; }
            public string OrderStatus { get; set; }
            public IEnumerable<OrderItemReadDto> OrderItems { get; set; }
        }

        //update
        public class OrderUpdateDto
        {
            public DateTime? DateUpdated { get; set; }
            [Required]
            public string OrderStatus { get; set; }
            public double? TotalPrice { get; set; }
        }
    }
}
