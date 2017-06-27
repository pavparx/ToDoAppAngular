import { SingleTask } from '../models/single-task.model';
import { Observable } from 'rxjs/Observable'; 
import { Response } from '@angular/http';

export interface TasksServiceInterface{ 
    updateTasksObservable(): void;
    readonly getTasksObservable: Observable<SingleTask[]>;
    changeVisibilityOfAddTask(): void;
    readonly getVisibilityOfAddTask: Observable<boolean>;
    searchTaskObservable(keyword: string): void;
    readonly getSearchTaskObservable: Observable<string>;    
    deleteTask(taskId: number): Observable<Response>;
    markTaskDone(taskId: number): Observable<Response>;
    addTask(task: SingleTask): Observable<Response>;
    getWebApiTasks(): Observable<SingleTask[]>;
} 

 