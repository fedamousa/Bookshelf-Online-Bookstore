using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BookStore.src.Entity;

public class Book
{
    [Key]
    public Guid BookId { get; set; }
    public string? Isbn { get; set; }

    [Required]
    public string Title { get; set; }
    public string? Author { get; set; }

    [Range(1, double.MaxValue, ErrorMessage = "Price is not valid")]
    public decimal Price { get; set; }

    [Range(1, double.MaxValue, ErrorMessage = "Stock Quantitiy is not valid")]
    public int StockQuantity { get; set; }
    public Format BookFormat { get; set; }
    public required string ImageUrl { get; set; }
    //connections to other entities
    //[ForeignKey("CategoryCategoryId")]
    public required Guid CategoryId { get; set; }
    public Category Category { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Format
{
    Audio,
    Paperback,
    Hardcover,
    Ebook,
}
