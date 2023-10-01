import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks:Task[] = [];

  constructor(private taskService:TaskService){
  }

  ngOnInit():void{
    this.taskService.getTasks().subscribe((tasks)=>this.tasks=tasks)
  }

  deleteTask(task:Task){
    this.taskService
    .deleteTask(task)
    .subscribe(
      (tasks)=>(this.tasks=this.tasks.filter(t => t.id !== task.id)));
  }
  
  toggleReminder(task:Task){
    task.reminder = !task.reminder;
    console.log(task.reminder)
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task){
    console.log("Before adding Task");
    this.taskService.addTask(task).subscribe((task)=>(this.tasks.push(task)));
    console.log('Task Added');
  }

}
