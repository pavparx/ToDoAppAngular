import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AddTaskComponent } from './addTask/add-task.component';

const appRoutes: Routes = [
    { path: 'add', component: AddTaskComponent },
    { path: 'edit', component: AddTaskComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }