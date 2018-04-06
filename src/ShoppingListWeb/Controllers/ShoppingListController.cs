using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingListWeb.Models;
using ShoppingListWeb.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShoppingListWeb.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingListController : Controller
    {
        private ShoppingListContext _context;

        public ShoppingListController(ShoppingListContext context)
        {
            _context = context;
        }
        
        
        // GET: api/<controller>
        [HttpGet]
        public async Task<PaginatedList<ShoppingListItemModel>> Get(int page=1, int size=10)
        {
            if (page == 0)
            {
                page = 1;
            }

            if (size == 0)
            {
                size = 10;
            }

            var query = (from s in _context.ShoppingList
                         join c in _context.Category on s.CategoryId equals c.Id
                         orderby s.Item
                         select new ShoppingListItemModel()
                         {
                             Id = s.Id,
                             Item = s.Item,
                             Quantity = s.Quantity,
                             Category = new ShoppingCategoryModel()
                             {
                                 Id = c.Id,
                                 Name = c.Name
                             }


                         });

            var result = await PaginatedList<ShoppingListItemModel>.CreateAsync(query, page, size);

            return result;

 
                       
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ShoppingListItemModel> Get(int id)
        {
            var data = await (from s in _context.ShoppingList
                        join c in _context.Category on s.CategoryId equals c.Id
                        where s.Id == id
                        select new ShoppingListItemModel()
                        {
                            Id = s.Id,
                            Item = s.Item,
                            Quantity = s.Quantity,
                            Category = new ShoppingCategoryModel()
                            {
                                Id = c.Id,
                                Name = c.Name
                            }

                        }).SingleOrDefaultAsync();

            return data;
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ShoppingListItemModel> Post([FromBody]ShoppingListItemModel value)
        {
            var shoppingList = await _context.ShoppingList.SingleOrDefaultAsync(m => m.Id == value.Id);

            if (shoppingList != null)
            {
                shoppingList.Item = value.Item;
                shoppingList.Quantity = value.Quantity;
                shoppingList.CategoryId = value.Category.Id;

                _context.Update(shoppingList);
                await _context.SaveChangesAsync();
            }
            else
            {
                shoppingList = new ShoppingListItem()
                {
                    Item = value.Item,
                    Quantity = value.Quantity,
                    CategoryId = value.Category.Id,
                    WeekId = 1
                };

                _context.Add(shoppingList);

                await _context.SaveChangesAsync();
                
            }

            var category = await _context.Category.SingleAsync(u => u.Id == shoppingList.CategoryId);

            return Map(shoppingList, category);
            
        }

        private ShoppingListItemModel Map(ShoppingListItem item, Category category)
        {
            return new ShoppingListItemModel()
            {
                Id = item.Id,
                Item = item.Item,
                Quantity = item.Quantity,
                Category = new ShoppingCategoryModel()
                {
                    Id = category.Id,
                    Name = category.Name
                }
                

            };
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // GET api/<controller>/

        public void GetCategories()
        {

        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var shoppingList = await _context.ShoppingList.AsNoTracking().SingleOrDefaultAsync(m => m.Id == id);

         
            if (shoppingList == null)
            {
                throw new InvalidOperationException("Data not found");
            }

            try
            {
                _context.ShoppingList.Remove(shoppingList);
                await _context.SaveChangesAsync();
                
            }
            catch (DbUpdateException  ex )
            {
                //Log the error (uncomment ex variable name and write a log.)
                throw;
            }

        }
    }
}
