using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingListWeb.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShoppingListWeb.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private ShoppingListContext _context;

        public CategoryController(ShoppingListContext context)
        {
            _context = context;
        }


        // GET: api/<controller>
        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            var result = await (from u in _context.Category
                                orderby u.Id
                                select u).ToListAsync();


            return result;
        }
    }
}
