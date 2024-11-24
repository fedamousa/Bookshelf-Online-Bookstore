using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookStore.src.Services.order;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static BookStore.src.DTO.OrderDTO;
using System.Security.Claims;

namespace BookStore.src.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderServices _orderServices;

        public OrdersController(IOrderServices orderServices)
        {
            _orderServices = orderServices;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<OrderReadDto>> CreateOnAsync([FromBody] OrderCreateDto orderCreateDto)
        {
            // var userId = Guid.Parse(User.FindFirst("id")?.Value);
            // var createdOrder = await _orderServices.CreateOneAsync(userId, orderCreateDto);
            // return CreatedAtAction(nameof(FindOrderById), new { orderId = createdOrder.OrderId }, createdOrder);

            var authenticatedClaims = HttpContext.User;
            var userId = authenticatedClaims.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value;
            var userGuid = new Guid(userId);
            var createdOrder = await _orderServices.CreateOneAsync(userGuid, orderCreateDto);
            return CreatedAtAction(nameof(FindOrderById), new { orderId = createdOrder.OrderId }, createdOrder);
            // return await _orderService.CreateOneAsync(userGuid, orderCreateDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<OrderReadDto>>> GetAll() => Ok(await _orderServices.GetAllAsync());

        [HttpGet("{orderId}")]
        [Authorize]
        public async Task<ActionResult<OrderReadDto>> FindOrderById(Guid orderId)
        {
            var order = await _orderServices.FindOrderByIdAsync(orderId);
            return order != null ? Ok(order) : NotFound();
        }

        [HttpGet("user-orders")]
        [Authorize]
        public async Task<ActionResult<List<OrderReadDto>>> GetUserOrders()
        {
            var userId = Guid.Parse(User.FindFirst("id")?.Value);
            return Ok(await _orderServices.GetAllByUserIdAsync(userId));
        }

 // Get all orders by user ID
        [HttpGet("user/{userId}")]
        [Authorize] // Ensure only authorized users can access this
        public async Task<ActionResult<List<OrderReadDto>>> GetOrdersByUserId(Guid userId)
        {
            try
            {
                var orders = await _orderServices.GetAllByUserIdAsync(userId);

                if (orders == null || !orders.Any())
                {
                    return NotFound("No order history found for this user.");
                }

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching order history: {ex.Message}");
            }
        }
    
        [HttpDelete("{orderId}")]
        [Authorize]
        public async Task<ActionResult> DeleteOrder(Guid orderId)
        {
            var success = await _orderServices.DeleteOneAsync(orderId);
            return success ? NoContent() : NotFound();
        }

        [HttpPut("{orderId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateOrder(Guid orderId, [FromBody] OrderUpdateDto orderUpdateDto)
        {
            var success = await _orderServices.UpdateOneAsync(orderId, orderUpdateDto);
            return success ? NoContent() : NotFound();
        }
    }
}
