import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type AlunoDocument = Aluno & Document;

@Schema()
export class Aluno{
    @Prop({required: true}) // REQUIRED torna o campo obrigatório
    nome: string;

    @Prop({unique: true, required: true}) // Define no mongo que o campo é unico
    tia: string;

    @Prop({required: true})
    curso: string;
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno)