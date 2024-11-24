using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookStore.src.Entity;
using BookStore.src.Repository;
using BookStore.src.Utils;
using static BookStore.src.DTO.OrderDTO;

namespace BookStore.src.Services.order
{
    public class OrderServices : IOrderServices
    {
        private readonly OrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderServices(OrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<OrderReadDto> CreateOneAsync(Guid userId, OrderCreateDto orderCreate)
        {
            var order = _mapper.Map<Order>(orderCreate);
            order.UserId = userId;
            order.DateCreated = DateTime.UtcNow;
            order.OrderStatus = Order.Status.Pending;
            order.TotalPrice = order.OrderItems.Sum(item => item.Quantity * item.Price);

            await _orderRepository.CreateOneAsync(order);
            return _mapper.Map<OrderReadDto>(order);
        }

        public async Task<List<OrderReadDto>> GetAllAsync()
        {
            var orderList = await _orderRepository.GetAllAsync();
            return _mapper.Map<List<OrderReadDto>>(orderList);
        }

        public async Task<List<OrderReadDto>> GetAllByUserIdAsync(Guid userId)
        {
            var orders = await _orderRepository.GetAllByUserIdAsync(userId);
            return _mapper.Map<List<OrderReadDto>>(orders);
        }

        public async Task<OrderReadDto> FindOrderByIdAsync(Guid id)
        {
            var order = await _orderRepository.FindOrderByIdAsync(id);
            return _mapper.Map<OrderReadDto>(order);
        }

        public async Task<bool> DeleteOneAsync(Guid id)
        {
            var order = await _orderRepository.FindOrderByIdAsync(id);
            return await _orderRepository.DeleteOneAsync(order);
        }

        public async Task<bool> UpdateOneAsync(Guid id, OrderUpdateDto orderUpdate)
        {
            var foundOrder = await _orderRepository.FindOrderByIdAsync(id);
            foundOrder.DateUpdated = DateTime.UtcNow;
            if (orderUpdate.TotalPrice.HasValue)
                foundOrder.TotalPrice = orderUpdate.TotalPrice.Value;
            foundOrder.OrderStatus = (Order.Status)Enum.Parse(typeof(Order.Status), orderUpdate.OrderStatus);

            return await _orderRepository.UpdateOneAsync(foundOrder);
        }

        
    }
}
