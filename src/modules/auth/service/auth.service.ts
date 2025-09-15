import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(loginDto: LoginDto) {
    const url = process.env.FRONTEND_URL + '/users'; // traemos TODOS los usuarios
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const users = response.data;

      // Validar que sea un array
      if (!Array.isArray(users)) {
        throw new UnauthorizedException('Invalid server response');
      }

      // Buscar el usuario por username
      const found = users.find( (u: any) => u.user?.username === loginDto.username, );

      if (!found) {
        throw new UnauthorizedException('Incorrect username');
      }

      // Validar contraseña
      if (found.user.password !== loginDto.password) {
        throw new UnauthorizedException('Incorrect password');
      }

      // Retornamos el objeto user con id: _id
      return { message: 'Succesfully Login', user: found.user };
    } catch (error) {
      console.error('Error querying /users:', error);
      throw new UnauthorizedException('The user could not be validated');
    }
  }
}
