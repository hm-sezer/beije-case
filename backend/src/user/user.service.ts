import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { MailService } from '../mail/mail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mailService: MailService,
  ) {}

  /**
   * Generate a random alphanumeric verification token
   * @returns 32-character random token
   */
  private generateVerificationToken(): string {
    return randomBytes(16).toString('hex');
  }

  /**
   * Register a new user
   * Creates a user with verification token and isVerified=false
   * @param registerUserDto - { username, email }
   * @returns Created user with verification token
   */
  async register(registerUserDto: RegisterUserDto): Promise<UserDocument> {
    const { username, email } = registerUserDto;

    // Check if username already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException(
        'Username or email already exists. Please choose a different one.',
      );
    }

    // Generate verification token
    const verificationToken = this.generateVerificationToken();

    // Create new user
    const newUser = new this.userModel({
      username,
      email,
      verificationToken,
      isVerified: false,
    });

    const savedUser = await newUser.save();

    // Send verification email
    await this.mailService.sendVerificationEmail(
      email,
      username,
      verificationToken,
    );

    return savedUser;
  }

  /**
   * Verify user email with token
   * @param username - Username to verify
   * @param verificationToken - Token from email link
   * @returns Success message
   */
  async verifyEmail(
    username: string,
    verificationToken: string,
  ): Promise<{ message: string }> {
    // Find user by username
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if token matches
    if (user.verificationToken !== verificationToken) {
      throw new BadRequestException('Invalid verification token');
    }

    // Check if already verified
    if (user.isVerified) {
      return { message: 'User is already verified' };
    }

    // Set isVerified to true
    user.isVerified = true;
    await user.save();

    return { message: 'Email verified successfully' };
  }

  /**
   * Check if user is verified
   * @param username - Username to check
   * @returns Verification status message
   */
  async checkVerification(username: string): Promise<{ message: string }> {
    // Find user by username
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Return verification status
    if (user.isVerified) {
      return { message: 'user is verified' };
    } else {
      return { message: 'user is not verified' };
    }
  }
}

