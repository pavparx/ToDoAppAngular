import { Injectable } from '@angular/core';
import { SingleTask } from '../models/single-task.model';
import { TasksServiceInterface } from '../Interfaces/tasks-service.interface';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { Observable } from 'rxjs/Observable';


@Injectable()
export class TasksService implements TasksServiceInterface {

    private currentId: number;

    constructor(private http: Http) { }

    // fields for the observable search component string
    private _searchString: BehaviorSubject<string> = new BehaviorSubject('');
    private _searchStringObservable: Observable<string> = this._searchString.asObservable();

    public searchString(keyword: string) {
        this._searchString.next(keyword);
    }

    get getSearchString() {

        return this._searchStringObservable;
    }

    private _tasks: BehaviorSubject<SingleTask[]> = new BehaviorSubject([]);
    private _tasksObservable: Observable<SingleTask[]> = this._tasks.asObservable();

    public updateTasks() {
        let currTasks: SingleTask[];
        this.getTasksAsync().subscribe(res => { currTasks = res; this._tasks.next(currTasks); }
        );
    }

    get getTasks(): Observable<SingleTask[]> {
        return this._tasksObservable;
    }


    private _showAddTaskForm: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _showAddTaskFormObservable: Observable<boolean> = this._showAddTaskForm.asObservable();

    public changeVisibility() {

        this._showAddTaskForm.next(!this._showAddTaskForm.value);
    }

    get showAddTaskForm() {
        return this._showAddTaskFormObservable;
    }

    // Async get tasks from web api
    getTasksAsync(): Observable<SingleTask[]> { 
        return this.http.get("/api/tasks").map(data => data.json());

    }

    addTask(task: SingleTask): Observable<Response> {

        return this.http.post("/api/tasks", task);

    }

    deleteTask(taskId: number): Observable<Response> {
        console.log("deleteTaskService called");
        console.log("input parameter is " + taskId);
        return this.http.delete("/api/tasks/" + taskId);
    }


    markDone(taskId: number): Observable<Response> {
        return this.http.patch("/api/tasks/" + taskId, taskId);
    }


}