import { Controller, Get, Post, Param, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import * as dotenv from "dotenv";
import { ObjectId } from 'mongodb';
import { UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth/service/auth.service';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';


dotenv.config();                  // Load environment variables
const db = 'users';               // Database route for this controller

@Controller(db)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

//************************** USERS *************************************/
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    this.ensureValidObjectId(id);
    return this.usersService.getById(id);
  }

  // Registrar un nuevo usuario
  @Post()
  async addUser(@Body() body: CreateUserDto) {
    const user = (await this.usersService.create(body)).user;
    const token = await this.authService.generateToken(user);
    return token;
  }


  // Helper privado para validar ObjectId de MongoDB
  private ensureValidObjectId(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(`The provided id is not a valid ObjectId: ${id}`);
    }
  }
}