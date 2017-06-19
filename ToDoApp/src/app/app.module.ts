import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FilterLsPipe } from './pipes/filter-ls-pipe.pipe';
import { SingleTask } from './models/single-task.model';
import { Http, HttpModule } from '@angular/http';


import { TasksService } from './services/tasks.service';
 

// Component imports
import { TaskListComponent } from './taskList/task-list.component';
import { SearchTaskComponent } from './searchTask/search-task.component';
import { AddTaskComponent } from './addTask/add-task.component';

import { AppComponent }  from './app.component';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule ], 
    declarations: [AppComponent, TaskListComponent, SearchTaskComponent, AddTaskComponent, FilterLsPipe],
    providers: [{ provide: 'TasksServiceInterface', useClass: TasksService }],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
