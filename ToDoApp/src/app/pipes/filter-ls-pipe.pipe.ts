import { Pipe, PipeTransform } from '@angular/core';
import { SingleTask } from '../models/single-task.model';

@Pipe({ name: 'filterLs' })
export class FilterLsPipe implements PipeTransform {

    transform(tasks: SingleTask[], keyword: string): SingleTask[] {

        let results: SingleTask[] = [];
        

        for (let i = 0; i < tasks.length; i++) {

            let task = tasks[i];

            if (task.name.indexOf(keyword) > -1 || task.description.indexOf(keyword) > -1) {
                results.push(task);
            }
        }         

        return results;

    }
}
