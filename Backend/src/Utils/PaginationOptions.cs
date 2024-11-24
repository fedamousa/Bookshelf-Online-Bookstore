using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.src.Utils
{
    public class PaginationOptions
    {
        public int Limit { get; set; } = 2;
        public int Offset { get; set; } = 0;

       
        
        // search functionality for book 
        public string SearchByAuthor { get; set; } = string.Empty; //  author search
        public string SearchByTitle { get; set; } = string.Empty;  //  title search
        public string SortByPrice { get; set; } = string.Empty; // sort by price "High to low" and "Low to high"
        public decimal? MinPrice  { get; set; } = 0;
        public decimal? MaxPrice { get; set; } = 10000;
    }
}