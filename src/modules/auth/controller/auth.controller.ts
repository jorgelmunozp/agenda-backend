import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('Login received:', loginDto);
    return this.authService.login(loginDto);
  }
}
