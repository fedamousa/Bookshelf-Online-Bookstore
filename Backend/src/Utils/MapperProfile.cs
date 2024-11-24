using AutoMapper;
using BookStore.src.DTO;
using BookStore.src.Entity;
using static BookStore.src.DTO.BookDTO;
using static BookStore.src.DTO.CategoryDTO;
using static BookStore.src.DTO.OrderDTO;
using static BookStore.src.DTO.UserDTO;
using static BookStore.src.DTO.OrderItemDTO;

namespace BookStore.src.Utils
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            //Book
            CreateMap<Book, ReadBookDto>();
            CreateMap<CreateBookDto, Book>();
            CreateMap<UpdateBookDto, Book>()
                .ForAllMembers(opts =>
                    opts.Condition((src, dest, srcProperty) => srcProperty != null)
                );
            CreateMap<ReadBookDto, Book>(); //we don't use this. Manar probably added it when she solved price in the controller? @ali
            //Order
              CreateMap<Order, OrderReadDto>();
            CreateMap<OrderCreateDto, Order>();
            CreateMap<OrderUpdateDto, Order>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<OrderItem, OrderItemReadDto>()
                .ForMember(dest => dest.BookTitle, opt => opt.MapFrom(src => src.Book.Title));
            CreateMap<OrderItemCreateDto, OrderItem>();
            // User
            CreateMap<User, UserReadDto>();
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>()
                .ForAllMembers(opts =>
                    opts.Condition((src, dest, srcProperty) => srcProperty != null)
                );
            // Category
            CreateMap<Category, CategoryReadDto>();
            CreateMap<CategoryCreateDto, Category>();
            CreateMap<CategoryUpdateDto, Category>()
                .
                //condtion for convert
                ForAllMembers(opts =>
                    opts.Condition((src, dest, srcProperty) => srcProperty != null)
                );

            // Mapping between Cart entity and DTOs
            CreateMap<Cart, CartDTO.CartReadDto>();
            CreateMap<CartDTO.CartCreateDto, Cart>();
            CreateMap<CartDTO.CartUpdateDto, Cart>()
                .ForAllMembers(opts =>
                    opts.Condition((src, dest, srcProperty) => srcProperty != null)
                );

            // Mapping between CartItems entity and DTOs
            CreateMap<CartItems, CartItemsDTO.CartItemsReadDto>();
            CreateMap<CartItemsDTO.CartItemsCreateDto, CartItems>();
            CreateMap<CartItemsDTO.CartItemsUpdateDto, CartItems>()
                .ForAllMembers(opts =>
                    opts.Condition((src, dest, srcProperty) => srcProperty != null)
                );
        }
    }
}
