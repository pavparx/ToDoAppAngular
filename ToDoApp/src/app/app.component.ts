import { Component, Inject, Input, OnInit } from '@angular/core';
import { AddTaskComponent } from './addTask/add-task.component';
import { SearchTaskComponent } from './searchTask/search-task.component';
import { TasksServiceInterface } from './interfaces/tasks-service.interface';
import { TasksService } from './services/tasks.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SingleTask } from './models/single-task.model';
import { QueryStringHelperService } from './services/query-string-helper.service';
import 'rxjs/add/operator/switchMap'; 


@Component({
  selector: 'my-app',
  templateUrl: './app.html',
  providers: [QueryStringHelperService]
})
export class AppComponent implements OnInit  {
    
    name = 'Angular';
    constructor( @Inject('TasksServiceInterface') private tasksService: TasksServiceInterface, private queryStringHelperService: QueryStringHelperService) {
        
    }

    ngOnInit() {

      
        
     

        //console.log(this.activatedRoute.snapshot.params['id']); 

        //this.activatedRoute.params.switchMap((params: Params, index: number) => {
        //    console.log(params); 
        //    return params['id'];

        //});
                 

        //let params: any = this.activatedRoute.snapshot.params;
        //console.log(params.id); 

        // subscribe to router event
        //this.activatedRoute.params.subscribe((params: Params) => {

           
        //}); 
        
    }
    
    

    callAddTask() {
        
        this.tasksService.changeVisibility();

    }
    

}
