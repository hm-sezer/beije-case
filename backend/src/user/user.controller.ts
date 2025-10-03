import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * POST /user/register
   * Register a new user and send verification email
   * @param registerUserDto - { username, email }
   * @returns Created user with verification token
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }

  /**
   * GET /user/verify-email/:username/:verificationToken
   * Verify user's email with token from email link
   * @param username - Username from URL parameter
   * @param verificationToken - Verification token from URL parameter
   * @returns Success message or error (404, 400)
   */
  @Get('verify-email/:username/:verificationToken')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(
    @Param('username') username: string,
    @Param('verificationToken') verificationToken: string,
  ) {
    return await this.userService.verifyEmail(username, verificationToken);
  }

  /**
   * GET /user/check-verification/:username
   * Check if user's email is verified
   * @param username - Username from URL parameter
   * @returns "user is verified" or "user is not verified"
   */
  @Get('check-verification/:username')
  @HttpCode(HttpStatus.OK)
  async checkVerification(@Param('username') username: string) {
    return await this.userService.checkVerification(username);
  }
}

