import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aluno, AlunoDocument } from './aluno.schema';

@Injectable()
export class AlunoService {

    constructor(@InjectModel('Aluno') private AlunoModule: Model<AlunoDocument>){}
    
    async create(aluno: Aluno){
        const createdAluno = new this.AlunoModule(aluno);
        return await createdAluno.save()
    }

    async readAll(){
        return await this.AlunoModule.find().exec();
    }

    async readByTia(tia: string){
        return await this.AlunoModule.findOne({'tia': tia})
    }
    
    async readByCurso(curso: string){
        return await this.AlunoModule.find({'curso': curso}).exec()
    }

    async update(tia: string, aluno: Aluno){
        const query = {'tia': tia} // Busca feita pelo TIA
        const update = { 
            // O que vai ser atualizado
            'nome': aluno.nome,
            'curso': aluno.curso
        };

        const options = { new: false } // Se o aluno não existir, ele não cria um novo aluno

        
        const result = await this.AlunoModule.findOneAndUpdate(query, update, options); // acha o 1º param, atualiza o 2º param
        if(!result) return false;
        return true;        
    }


    async delete(tia: string){
        return await this.AlunoModule.findOneAndDelete({'tia': tia})
    }
}
