using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BookStore.src.Entity;
using static BookStore.src.DTO.CartItemsDTO;

namespace BookStore.src.DTO
{
    public class OrderItemDTO
    {


    public class OrderItemCreateDto
    {
        [Required(ErrorMessage = "Book ID is required.")]
        public Guid BookId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Price must be non-negative.")]
        public double Price { get; set; }
    }

     public class OrderItemReadDto
    {
        public Guid OrderItemId { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public Guid BookId { get; set; }
        public string BookTitle { get; set; }
    }

    
    }}