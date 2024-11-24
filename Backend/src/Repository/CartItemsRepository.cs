using BookStore.src.Database;
using BookStore.src.Entity;
using BookStore.src.Repository;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repository
{
    public class CartItemsRepository
    {
        protected DbSet<CartItems> _cartItems;
        protected DatabaseContext _databaseContext;
        protected readonly BookRepository _bookRepository;
        protected readonly CartRepository _cartRepository;

        public CartItemsRepository(
            DatabaseContext databaseContext,
            BookRepository bookRepository,
            CartRepository cartRepository
        )
        {
            _databaseContext = databaseContext;
            _cartItems = databaseContext.Set<CartItems>();
            _bookRepository = bookRepository;
            _cartRepository = cartRepository;
        }

        // create new cart item
        public async Task<CartItems> CreateOneAsync(CartItems newCartItem)
        {
            var book = await _bookRepository.GetBookByIdAsync(newCartItem.BookId);

            if (book != null)
            {
                newCartItem.Price =  (double)book.Price * newCartItem.Quantity;
                newCartItem.Book = book;

                await _cartItems.AddAsync(newCartItem);
                await _databaseContext.SaveChangesAsync();
            }

            return newCartItem;
        }

        //get cart item by ID
        public async Task<CartItems?> GetByIdAsync(Guid id)
        {
             var cartItemById = await _cartItems
                .Include(c => c.Book)
                .FirstOrDefaultAsync(c => c.CartItemsId == id);
          
            await _databaseContext.SaveChangesAsync();

            return cartItemById;
          
        }

        // get all cart items
        public async Task<List<CartItems>> GetAllAsync()
        {
            return await _cartItems.Include(b => b.Book).ToListAsync();
        }

        //delete cart item 
        public async Task<bool> DeleteOneAsync(CartItems cart)
        {
            _cartItems.Remove(cart);
            await _databaseContext.SaveChangesAsync();
            return true;
        }

        //update cart
        public async Task<bool> UpdateOneAsync(CartItems updateCart)
        {
            _cartItems.Update(updateCart);
            await _databaseContext.SaveChangesAsync();
            return true;
        }
    }
}
