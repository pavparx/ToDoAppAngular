import { Component, Input, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SingleTask } from '../models/single-task.model';
import { TasksServiceInterface } from '../interfaces/tasks-service.interface';
import { TasksService } from '../services/tasks.service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { QueryStringHelperService } from '../services/query-string-helper.service';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'tda-add-task',
    templateUrl: 'add-task.html'
})
export class AddTaskComponent  {
    
    urlResults: any = {}; 

    @Input()
    task: SingleTask;

    @Input()
    alwaysShow: boolean;


    private currTaskId: number = 0;
    private showId: boolean;
     
    


    constructor( @Inject('TasksServiceInterface') private tasksService: TasksServiceInterface, private queryStringHelperService: QueryStringHelperService) {
        
        this.queryStringHelperService.subscribe((params: any) => {
            for (var key in params) {
                this.urlResults[key] = params[key];
               
                this.tasksService.getTasksAsync().subscribe((res) =>
                {
                    for (let i in res) {
                        if (this.urlResults[key] == res[i].id) {
                            this.task = res[i];
                            break;
                        } else {
                            console.log("not found");
                        }
                    }
                })                
            }
        }); 

        //this.urlResults = this.queryStringHelperService.getQueryStringParams();
        
        console.log("ulrResults : "+this.urlResults['id']);
         
            this.task = this.task || new SingleTask();           
            this.tasksService.showAddTaskForm.subscribe((res) => { this.showId = res; });

            

        }
        
        
        
    

    // get the data from the view and send them to the service

    addTask(task: SingleTask) {
        
            task.done = false;
            this.currTaskId++;
            task.id = this.currTaskId;
            this.tasksService.addTask(task).subscribe(() => {
                this.tasksService.updateTasks();
                this.task = new SingleTask();
            });
        
             
        }
          
    


    cancel() {
        this.task = new SingleTask();
        this.tasksService.changeVisibility();

    }

    

}