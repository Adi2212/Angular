import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks = signal<Task[]>([]);

    allTasks = this.tasks.asReadonly();

    addTask(taskdata: { title: string; description: string }) {
        const newTask: Task = {
            id: Date.now().toString(),
            title: taskdata.title,
            description: taskdata.description,
            status: 'OPEN'  
        };
        this.tasks.update(tasks => [...tasks, newTask]);
    }

    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update(tasks =>
            tasks.map(task => (task.id === taskId ? { ...task, status: newStatus } : task))
        );
    }   
}
