using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entity
{
    public class ShoppingListItem
    {
        public int Id { get; set; }
        public string Item { get; set; }

        public int CategoryId { get; set; }

        public int Quantity { get; set; }

        public int WeekId { get; set; }
    }
}
