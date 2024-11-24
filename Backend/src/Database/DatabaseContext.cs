using System;
using BookStore.src.Entity;
using Microsoft.EntityFrameworkCore;
using static BookStore.src.Entity.Order;

namespace BookStore.src.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options) { }

        public DbSet<Category> Category { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderItem> OrderItem { get; set; } // Updated to use OrderItem instead of CartItems
        public DbSet<Book> Book { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   
            modelBuilder.HasPostgresEnum<Role>();
            modelBuilder.HasPostgresEnum<Format>();
            modelBuilder.HasPostgresEnum<Status>();
            
            // Configure Order's DateCreated default value
            modelBuilder
                .Entity<Order>()
                .Property(o => o.DateCreated)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Configure the relationships between Order and OrderItem
            modelBuilder
                .Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId);

            modelBuilder
                .Entity<OrderItem>()
                .HasOne(oi => oi.Book)
                .WithMany()
                .HasForeignKey(oi => oi.BookId);
        }
    }
}
