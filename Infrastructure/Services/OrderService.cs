using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBasketRepository _basketRepository;

        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepository)
        {
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            var basket = await _basketRepository.GetBasketAsync(basketId);

            var orderItems = await ConvertBasketItemListToOrderItemList(basket.Items);

            var subtotal = orderItems.Sum(x => x.Price * x.Quantity);

            var order = new Order(orderItems, buyerEmail, shippingAddress, deliveryMethod, subtotal);

            _unitOfWork.Repository<Order>().Add(order);

            var result = await _unitOfWork.Complete();

            if (result<=0) return null;

            await _basketRepository.DeleteBasketAsync(basketId);

            return order;
        }

        private async Task<List<OrderItem>> ConvertBasketItemListToOrderItemList(List<BasketItem> basketItems)
        {
            var orderItems = new List<OrderItem>();
            foreach (var item in basketItems)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);

                orderItems.Add(orderItem);
            }

            return orderItems;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpecAsync(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersByUserEmailAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            
            return await _unitOfWork.Repository<Order>().GetListAsync(spec);
        }
    }
}
