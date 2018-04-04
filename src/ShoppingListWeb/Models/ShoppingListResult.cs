using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingListWeb.Models
{
    public class ShoppingListResult
    {

        public IEnumerable<ShoppingListItemModel> Items { get; set; }

    
    }
}
