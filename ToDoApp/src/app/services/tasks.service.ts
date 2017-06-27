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

    constructor(private http: Http) { }

    private _showAddTaskForm: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _showAddTaskFormObservable: Observable<boolean> = this._showAddTaskForm.asObservable();

    public changeVisibilityOfAddTask() {

        this._showAddTaskForm.next(!this._showAddTaskForm.value);
    }

    get getVisibilityOfAddTask() {
        return this._showAddTaskFormObservable;
    }
    
    private _searchString: BehaviorSubject<string> = new BehaviorSubject('');
    private _searchStringObservable: Observable<string> = this._searchString.asObservable();

    public searchTaskObservable(keyword: string) {
        this._searchString.next(keyword);
    }

    get getSearchTaskObservable() {

        return this._searchStringObservable;
    }

    private _tasks: BehaviorSubject<SingleTask[]> = new BehaviorSubject([]);
    private _tasksObservable: Observable<SingleTask[]> = this._tasks.asObservable();

    public updateTasksObservable() {
        let currTasks: SingleTask[];
        this.getTasksAsync().subscribe(res => { currTasks = res; this._tasks.next(currTasks); }
        );
    }

    private getTasksAsync(): Observable<SingleTask[]> {
        return this.http.get("/api/tasks").map(data => data.json());
    }
    get getTasksObservable(): Observable<SingleTask[]> {
        return this._tasksObservable;
    }

    getWebApiTasks(): Observable<SingleTask[]> {
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
    
    markTaskDone(taskId: number): Observable<Response> {
        return this.http.patch("/api/tasks/" + taskId, taskId);
    }
}