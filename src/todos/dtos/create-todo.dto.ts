import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    todo: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}