import { Controller, Get, Post, Put, Patch, Delete, Param, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import * as dotenv from "dotenv";
import { ObjectId } from 'mongodb';
import { CreateTaskDto } from '../dto/create-task.dto';

import jwtEncode from "jwt-encode";
const jwtSecretKey = process.env.JWT_SECRET ?? '';

dotenv.config();                  // Load environment variables
const db = 'users';               // Database route for this controller

@Controller(db)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//************************** USERS *************************************/
  @Get()
  async getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    this.ensureValidObjectId(id);
    return this.usersService.getById(id);
  }

  @Post()
  async addUser(@Body() body: any) {
    // Validaciones mínimas
    if (!body.name) throw new BadRequestException('Name is required');
    if (!body.email) throw new BadRequestException('Email is required');
    if (!body.username) throw new BadRequestException('Username is required');
    if (!body.password) throw new BadRequestException('Password is required');

    // Construcción explícita del objeto user
    const userData = {
      name: body.name,
      email: body.email,
      username: jwtEncode(body.username, jwtSecretKey),
      password: jwtEncode(body.password, jwtSecretKey),
      tasks: Array.isArray(body.tasks) ? body.tasks : []
    };

    // Valida si ya existe un usuario con el mismo email o username
    const existingData = await this.usersService.findByEmailOrUsername(body.email, body.username);

    if (existingData) {
      let message = 'The following fields already exist: ';
      if (existingData.email) message += 'email ';
      if (existingData.username) message += 'username';
      throw new BadRequestException(message.trim());
    }
  
    console.log("User successfully registered:", userData);
    return this.usersService.create(userData);
  }

//************************** TASKS *************************************/
  // Service: Add a Task to a user
  @Post(':id/tasks')
  async addTaskToUser(@Param('id') id: string, @Body() taskDto: CreateTaskDto) {
    this.ensureValidObjectId(id);

    if (!taskDto.name || !taskDto.time || !taskDto.date) {
      throw new BadRequestException('The task must have a name, date and time');
    }

    const updatedUser = await this.usersService.addTask(id, taskDto);

    if (!updatedUser) {
      throw new NotFoundException(`No user with id found ${id}`);
    }

    console.log(`New task added to user ${id}:`, JSON.stringify(taskDto, null, 2));

    return updatedUser;
  }

  // Service: Get a Task from a user by id
  @Get(':userId/tasks/:taskId')
  async getTaskById( @Param('userId') userId: string, @Param('taskId') taskId: string ) {
    this.ensureValidObjectId(userId);

    // Obtener el usuario
    const user = await this.usersService.getById(userId);
    if (!user) {
      throw new NotFoundException(`No user with id found ${userId}`);
    }

    // Buscar la tarea dentro del arreglo
    const task = user.user.tasks.find((t: any) => t.id === taskId);
    if (!task) {
      throw new NotFoundException(`No task with id found ${taskId} for user ${userId}`);
    }

    return task;
  }

//************************** PASSWORD RECOVERY *************************************/
  // Service: Send password recovery email
  @Post('recover-password')
  async recoverPassword(@Body() body: { email: string }) {
    if (!body.email) throw new BadRequestException('Email is mandatory');
    return this.usersService.sendPasswordRecoveryEmail(body.email);
  }

  // Helper privado para validar ObjectId
  private ensureValidObjectId(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(`The provided id is not a valid ObjectId: ${id}`);
    }
  }
}