import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { throwError } from 'rxjs';
import { Aluno } from './aluno.schema';
import { AlunoService } from './aluno.service';

@Controller('alunos')
export class AlunoController {
    constructor(private readonly alunoService: AlunoService) {}
    
    @Post()
    async create(@Body() aluno: Aluno){
        const createdAluno = await this.alunoService.create(aluno);
        
        if(!createdAluno){
            throw new HttpException('Tia já cadastrado ou algum campo está vazio', HttpStatus.BAD_REQUEST);
        }

        return createdAluno;
    }

    @Get('/')
    async readAll(){
        return await this.alunoService.readAll();
    }
    
    @Get('/:id')
    async readByTia(@Param() params ){
        const aluno = await this.alunoService.readByTia(params.id);
        
        if(!aluno)throw new HttpException('Esse TIA não está cadastrado', HttpStatus.NOT_FOUND);
        return aluno;
    }

    @Get('/cursos/:curso')
    async readByCurso(@Param() params ){
        return await this.alunoService.readByCurso(params.curso);
    }

    @Put('/:id')
    async update(@Param() params, @Body() aluno: Aluno){
        const result = await this.alunoService.update(params.id, aluno)

        if(!result) throw new NotFoundException();

        throw new HttpException('Aluno atualizado com sucesso', HttpStatus.OK);
    }

    @Delete('/:id')
    async delete(@Param() params){
        const result = await this.alunoService.delete(params.id);
        if(!result) throw new NotFoundException();
        return result;
    }
}
