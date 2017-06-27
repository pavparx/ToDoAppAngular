import { Component, Input, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SingleTask } from '../models/single-task.model';
import { TasksServiceInterface } from '../interfaces/tasks-service.interface';
import { TasksService } from '../services/tasks.service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { QueryStringHelperService } from '../services/query-string-helper.service';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'tda-add-task',
    templateUrl: 'add-task.html'
})
export class AddTaskComponent implements OnInit {

    @Input()
    task: SingleTask;

    @Input()
    alwaysShow: boolean;

    private route: string;
    private currentTasks: SingleTask[];
    private showId: boolean=false;
    private urlResults: any = {};

    constructor(
        @Inject('TasksServiceInterface') private tasksService: TasksServiceInterface,
        private queryStringHelperService: QueryStringHelperService, location: Location) { }


    ngOnInit() { 

        this.route = location.pathname;
        
        if (!this.task) { this.task = new SingleTask(); }

        this.tasksService.getTasksObservable.subscribe((res) => {
            this.currentTasks = res
        }); 
        
        this.tasksService.getVisibilityOfAddTask.subscribe((res) => { this.showId = res; });

        if (this.route.includes("/src/add") || this.route.includes("/src/edit")) {
            this.showId = true;
        }
        
        
        this.queryStringHelperService.subscribe((params: any) => {

            for (var key in params) {
                this.urlResults[key] = params[key];
            } 

            if (Object.keys(this.urlResults).length > 0) {  
                if (this.showId == false) { this.tasksService.changeVisibilityOfAddTask(); }

                let currentID = this.urlResults['id'];
               
                    for (let taskItem of this.currentTasks) {
                        if (taskItem.id === parseInt(currentID)) {
                            this.task = taskItem;  
                            break;
                        }
                    }                
            } else {
                this.task = new SingleTask;
            } 
        });
    }

        addTask(task: SingleTask) {
            task.done = false;
            this.tasksService.addTask(task).subscribe(() => {
                this.tasksService.updateTasksObservable();
                this.task = new SingleTask();
            });
        }

        cancel() {
            this.task = new SingleTask();
            this.tasksService.changeVisibilityOfAddTask();
        }
    }
