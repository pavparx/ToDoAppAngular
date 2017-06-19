import { SingleTask } from '../models/single-task.model';
import { Observable } from 'rxjs/Observable'; 
import { Response } from '@angular/http';

export interface TasksServiceInterface{ 
    
    addTask(task: SingleTask): Observable<Response>;
    getTasksAsync(): Observable<SingleTask[]>;
    updateTasks(): void;
    readonly getTasks: Observable<SingleTask[]>;
    changeVisibility(): void;
    searchString(keyword: string): void;
    readonly getSearchString: Observable<string>;
    readonly showAddTaskForm: Observable<boolean>;
    deleteTask(taskId: number): Observable<Response>;
    markDone(taskId: number): Observable<Response>;
} 

 