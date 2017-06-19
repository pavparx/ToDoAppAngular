using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoApp.Web_API.Model
{
    public class SingleTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Done { get; set; }

    }
}