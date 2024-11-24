using BookStore.src.Database;
using BookStore.src.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.src.Repository
{
    public class OrderRepository
    {
        private readonly DbSet<Order> _order;
        private readonly DatabaseContext _databaseContext;

        public OrderRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
            _order = databaseContext.Set<Order>();
        }

        public async Task<Order?> CreateOneAsync(Order newOrder)
        {
            await _order.AddAsync(newOrder);
            await _databaseContext.SaveChangesAsync();
            return await _order.Include(o => o.OrderItems).ThenInclude(oi => oi.Book).FirstOrDefaultAsync(o => o.OrderId == newOrder.OrderId);
        }

        public async Task<List<Order>> GetAllAsync() => await _order.Include(o => o.OrderItems).ThenInclude(oi => oi.Book).ToListAsync();

        public async Task<List<Order>> GetAllByUserIdAsync(Guid userId) => await _order.Include(o => o.OrderItems).ThenInclude(oi => oi.Book).Where(o => o.UserId == userId).ToListAsync();

        public async Task<Order?> FindOrderByIdAsync(Guid id) => await _order.Include(o => o.OrderItems).ThenInclude(oi => oi.Book).FirstOrDefaultAsync(o => o.OrderId == id);

        public async Task<bool> DeleteOneAsync(Order order)
        {
            _order.Remove(order);
            await _databaseContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateOneAsync(Order order)
        {
            _order.Update(order);
            await _databaseContext.SaveChangesAsync();
            return true;
        }
    }
}
