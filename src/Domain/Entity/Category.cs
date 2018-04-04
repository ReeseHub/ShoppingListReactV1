using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entity
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //public ICollection<ShoppingListItem> ShoppingLists { get; set; }
    }
}
