import { Module } from '@nestjs/common';
import { AuthModule } from './src/modules/auth/auth.module';
import { UsersModule } from './src/modules/users/users.module';
import { TasksModule } from './src/modules/tasks/tasks.module';



@Module({
  imports: [
    AuthModule,       // Importa módulo de autenticación
    UsersModule,      // Importa módulo de usuarios
    TasksModule,      //Importa módulo de usuarios tareas
  ],
})
export class AppModule {}
