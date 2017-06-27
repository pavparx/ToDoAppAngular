﻿using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ToDoApp.Web_API.Model;


namespace ToDoApp.Web_API.Controllers
{
    [RoutePrefix("api/tasks")]
    public class TasksController : ApiController
    {
        private static List<SingleTask> tasks = new List<SingleTask>();

        [HttpPost]
        [Route]
        public void AddTask(SingleTask task)
        {

            if (tasks.Count == 0)
            {
                task.Id = 1;
                tasks.Add(task);
            }
            else
            {
                task.Id = tasks.Count + 1;
                tasks.Add(task);
            }



        }

        [HttpDelete]
        [Route("{taskId:int}")]
        public void RemoveTask(int taskId)
        {
            //TODO: Fix id numbering after removal
            foreach (SingleTask item in tasks)
            {
                if (item.Id == taskId)
                {
                    tasks.Remove(item);
                    break;
                }
            }

        }


        [HttpGet]
        [Route]
        public List<SingleTask> GetTasks()
        {

            return tasks;

        }


        [HttpPatch]
        [Route("{taskId:int}")]
        public void MarkDone(int taskId)
        {
            foreach (SingleTask item in tasks)
            {
                if (item.Id == taskId)
                {
                    item.Done = !item.Done;
                    break;
                }
            }


        }




    }
}
