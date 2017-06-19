import { Component, Input, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SingleTask } from '../models/single-task.model';
import { TasksServiceInterface } from '../interfaces/tasks-service.interface';
import { TasksService } from '../services/tasks.service';

@Component({
    moduleId: module.id,
    selector: 'tda-add-task',
    templateUrl: 'add-task.html'
})
export class AddTaskComponent  {


    @Input()
    task: SingleTask;

    @Input()
    alwaysShow: boolean;


    private currTaskId: number = 0;
    private showId: boolean;
     
    


    constructor(@Inject('TasksServiceInterface') private tasksService: TasksServiceInterface) {

        
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