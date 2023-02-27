import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todos } from './todos.entity';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todos) private repo: Repository<Todos>){}

    create(body: CreateTodoDto) {
        // we create todo obj first and then save the record to our db
        const todo = this.repo.create(body);
        return this.repo.save(todo);
    }
    find(){
        // we can filter find by passing params to repository find() method 
        return this.repo.find();
    }
    findOne(id: number){
        // repo findOne() method will return single record that matches input
        // where as find() wil return all records  that matches our input
        if(!id) return null;
        return this.repo.findOne({where: {id: id}});
    }

    async update(id: number){
        // get the record
        // check if record exist
        // if exist only then update it
        const todo = await this.repo.findOne({where: {id: id}});
        if (!todo){
            throw new NotFoundException('Todo not found');
        }
        return this.repo.save({...todo, isCompleted: true});
    }

}
