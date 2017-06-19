﻿import { Component, Inject } from '@angular/core';
import { AddTaskComponent } from '../addTask/add-task.component';
import { FormsModule } from '@angular/forms';
import { TasksServiceInterface } from '../interfaces/tasks-service.interface';
import { TasksService } from '../services/tasks.service';


import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'tda-search-task',
    templateUrl: 'search-task.html'
})



export class SearchTaskComponent {

    
    
    public currKey: string;

    constructor(@Inject('TasksServiceInterface') private tasksService: TasksServiceInterface) {    

       
        
    }

    keyUpFn() {


        this.tasksService.searchString(this.currKey);
       
    }

    callAddTask() {

        this.tasksService.changeVisibility();

    }

}