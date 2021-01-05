import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunoModule } from './aluno/aluno.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://TiagoDantas:123@tia-nest.gjoow.mongodb.net/tia?retryWrites=true&w=majority'),
    AlunoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
