import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { QueryStringHelperService } from './services/query-string-helper.service';

import { FilterLsPipe } from './pipes/filter-ls-pipe.pipe';

import { TasksService } from './services/tasks.service';
 
// Component imports
import { SingleTask } from './models/single-task.model';
import { TaskListComponent } from './taskList/task-list.component';
import { SearchTaskComponent } from './searchTask/search-task.component';
import { AddTaskComponent } from './addTask/add-task.component';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';



@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule], 
    declarations: [AppComponent, TaskListComponent, SearchTaskComponent, AddTaskComponent, FilterLsPipe],
    providers: [{ provide: 'TasksServiceInterface', useClass: TasksService }, QueryStringHelperService],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
