﻿import { Component, OnInit, Inject } from '@angular/core';
import { SingleTask } from '../models/single-task.model';
import { FormsModule } from '@angular/forms';
import { TasksServiceInterface } from '../interfaces/tasks-service.interface';
import { TasksService } from '../services/tasks.service';




@Component({
    moduleId: module.id,
    selector: 'tda-task-list',
    templateUrl: 'task-list.html'
})

export class TaskListComponent implements OnInit {

    
    
    taskId: number;
    private currTask: SingleTask[]=[];
    private currString: string;

    constructor(@Inject('TasksServiceInterface') private tasksService: TasksServiceInterface) {}

    

    ngOnInit() {   

        this.tasksService.getTasks.subscribe((res) => {
            this.currTask = res;
        });

        this.tasksService.getSearchString.subscribe(data => this.currString = data);
        
    }
    
   
    deleteTask(taskId: number) {
         
        if (window.confirm("Are you sure you want to delete this task?")) {

            this.tasksService.deleteTask(taskId).subscribe(() => { this.tasksService.updateTasks() });

        }
        
        
    }

    markDone(task: SingleTask) {
        task.done = !task.done;
        this.tasksService.markDone(task.id).subscribe(() => { this.tasksService.updateTasks() });
        
    }
}
