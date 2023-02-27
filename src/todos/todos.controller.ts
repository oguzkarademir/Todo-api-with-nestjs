import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService){}
    @Get()
    findTodos(){
        return this.todosService.find();
    }
    @Get('/:id')
    findTodoById (@Param('id') id: string){
        return this.todosService.findOne(parseInt(id));
    }
    @Post()
    createTodo(@Body() body: CreateTodoDto){
        return this.todosService.create(body);
    }
    @Patch('/:id')
    updateTodoStatus(@Param('id') id: string){
        return this.todosService.update(parseInt(id))
    }

}
