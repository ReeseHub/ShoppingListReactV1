using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingListWeb.Models
{
    public class ShoppingListItemModel
    {
        public int Id { get; set; }
        public string Item { get; set; }

       public ShoppingCategoryModel Category { get; set; }

        public int Quantity { get; set; }

        public int WeekId { get; set; }

        
    }

    public class ShoppingCategoryModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
