import { Component, Input, Inject } from '@angular/core';
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
export class AddTaskComponent {

    @Input()
    task: SingleTask;

    @Input()
    alwaysShow: boolean;

    private currentTasks: SingleTask[];
    private showId: boolean;
    urlResults: any = {};

    constructor(
        @Inject('TasksServiceInterface') private tasksService: TasksServiceInterface,
        private queryStringHelperService: QueryStringHelperService) {
        if (!this.task) { this.task = new SingleTask;}
        this.tasksService.getTasksObservable.subscribe((res) => this.currentTasks = res);
        this.tasksService.getVisibilityOfAddTask.subscribe((res) => { this.showId = res; });
        this.urlResults = this.queryStringHelperService.getQueryStringParams();

        if (this.urlResults) {
            if (!this.showId) { this.tasksService.changeVisibilityOfAddTask(); }
            
                for (var key in this.urlResults) {
                    for (let taskItem of this.currentTasks) {
                        if (taskItem.id === this.urlResults[key]) {
                        this.task = taskItem;
                        break;
                    }
                }
            }
        } else {
            this.task = new SingleTask;
        }
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
