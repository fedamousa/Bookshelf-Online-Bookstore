using System.Linq.Expressions;
using BookStore.src.Database;
using BookStore.src.Entity;
using BookStore.src.Utils;
using Microsoft.EntityFrameworkCore;

namespace BookStore.src.Repository
{
    public class BookRepository
    {
        protected DbSet<Book> _book;
        protected DatabaseContext _databaseContext;

        public BookRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
            _book = databaseContext.Set<Book>();
        }

        public async Task<Book> CreateOneAsync(Book b)
        {
            await _book.AddAsync(b);
            await _databaseContext.SaveChangesAsync();

            return b;
        }

        public async Task<Book?> GetBookByIdAsync(Guid id)
        {
            return await _book.FindAsync(id);
        }

        public async Task<List<Book>> GetAllAsync(PaginationOptions paginationOptions)
        {
            // Search by title or author name 
            // Define an IQueryable to build the query dynamically
            IQueryable<Book> query = _book;

            if (!string.IsNullOrEmpty(paginationOptions.SearchByAuthor)) // search by author
            {
                query = query.Where(b => b.Author.Contains(paginationOptions.SearchByAuthor));
            }

            if (!string.IsNullOrEmpty(paginationOptions.SearchByTitle)) // search by title
            {
                var searchTitle = paginationOptions.SearchByTitle.ToLower();
                query = query.Where(b => b.Title.ToLower().Contains(searchTitle));
            }

            // Apply sorting by price: "Low to high" or "High to low"
            if (paginationOptions.SortByPrice == "High to low")
            {
                query = query.OrderByDescending(b => b.Price);
            }
            else if (paginationOptions.SortByPrice == "Low to high")
            {
                query = query.OrderBy(b => b.Price);
            } // if null no sorting will be applied 

            // Filter by minimum price
            if (paginationOptions.MinPrice.HasValue && paginationOptions.MinPrice > 0)
            {
                query = query.Where(p => p.Price >= paginationOptions.MinPrice);
            }

            // Filter by maximum price
            if (paginationOptions.MaxPrice.HasValue && paginationOptions.MaxPrice < decimal.MaxValue)
            {
                query = query.Where(p => p.Price <= paginationOptions.MaxPrice);
            }


            // // Apply pagination
            query = query.Skip(paginationOptions.Offset).Take(paginationOptions.Limit);

            return await query.Include(i => i.Category).ToListAsync();
        }

        // Total amount of book items 
        public async Task<int> CountAsync()
        {
            return await _databaseContext.Set<Book>().CountAsync();
        }
        public async Task<List<Book>> GetAllAsyncWithConditions() //(Func<Book, bool> expression)
        {
            var list = await _book.Include(i => i.Category).ToListAsync();
            return list;
        }

        public async Task<List<Book>> GetAllAsyncWithConditions(Func<Book, bool> func) //(Func<Book, bool> expression)
        {
            var list = await _book.Include(i => i.Category).ToListAsync();
            list = list.Where(func).ToList();
            return list;
        }

        public async Task<bool> DeleteOneAsync(Book book)
        {
            _book.Remove(entity: book);
            await _databaseContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateOneAsync(Book updateBook)
        {
            _book.Update(updateBook);
            await _databaseContext.SaveChangesAsync();
            return true;
        }
    }
}
