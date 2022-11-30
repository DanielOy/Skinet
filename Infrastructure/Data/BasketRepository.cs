using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public BasketRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            var spec = new BaseSpecification<CacheEntry>(x => x.Key == basketId);
            var entry = await _unitOfWork.Repository<CacheEntry>().GetEntityWithSpecAsync(spec);
            _unitOfWork.Repository<CacheEntry>().Delete(entry);
            return (await _unitOfWork.Complete()) != 0;
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var spec = new BaseSpecification<CacheEntry>(x => x.Key == basketId);
            var entry = await _unitOfWork.Repository<CacheEntry>().GetEntityWithSpecAsync(spec);
            return string.IsNullOrEmpty(entry?.Value) ? null : JsonSerializer.Deserialize<CustomerBasket>(entry.Value);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var spec = new BaseSpecification<CacheEntry>(x => x.Key == basket.Id);
            var entry = await _unitOfWork.Repository<CacheEntry>().GetEntityWithSpecAsync(spec);

            if (entry is null)
            {
                entry = new CacheEntry
                {
                    Key = basket.Id,
                    Value = JsonSerializer.Serialize(basket)
                };
                _unitOfWork.Repository<CacheEntry>().Add(entry);
            }
            else
            {
                entry.Value = JsonSerializer.Serialize(basket);
                _unitOfWork.Repository<CacheEntry>().Update(entry);
            }

            await _unitOfWork.Complete();

            return await GetBasketAsync(basket.Id);
        }
    }
}
