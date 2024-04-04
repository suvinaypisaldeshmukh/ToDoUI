// todo.component.ts

import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  constructor(private todoService: TodoService) { }
  todos: Todo[];
  newTodoTitle: string;
  newTodoDescription: string;
  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getAllTodos()
      .subscribe(todos => this.todos = todos);
  }

  addTodo(): void {
    const title = this.newTodoTitle.trim();
    const description = this.newTodoDescription.trim();
    if (!title) { return; }
    this.todoService.addTodo({ title, description } as Todo)
      .subscribe(todo => {
        this.todos.push(todo);
        this.newTodoTitle = '';
        this.newTodoDescription = '';
      });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo)
      .subscribe(() => {
        // Handle success
      });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      });
  }
}
