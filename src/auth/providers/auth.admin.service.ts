import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UsersBaseService } from 'src/user/providers/users.base.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserStatusEnum } from 'src/_common/enums/user_status.enum';

//import { EmailService } from 'src/_common/services/email/email.service';
import { AppUserType } from 'src/_common/enums/app_user_types.enum';
import { OtpTypesEnum } from 'src/_common/enums/otp_types.enum';
import {
  createSuccessAutoTranslated,
  notFoundErrorAutoTranslatedString,
} from 'src/_common/utils/successResponseMessage.util';
import { hashPasswordUtil } from 'src/_common/utils/hash-passwrod.util';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { translateThis } from 'src/_common/utils/translate-this';
import { UserEntity } from 'src/user/entities/users.entity';
import { LoginOrSignupDto } from '../dto/login-or-signup.dto';
import { SignupDto } from '../dto/signup.dto';
import { OtpMessageDestination } from '../enum/message-sender.enum';
// import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { SignupAdminDto } from '../dto/signup.admin.dto';
import { log } from 'console';
// import { SmsService } from '@app/_common/services/sms/test-sms-service';
// import { EmailService } from '@app/_common/services/email/email.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly usersService: UsersBaseService, //private readonly emailService: EmailService, // private readonly emailService: EmailService, // private readonly numberService: SmsService, // private readonly customerAuthService: CustomerAuthService,
  ) {}

  async login(loginDto: LoginDto) {
    const { user: username, password } = loginDto;

    const user: UserEntity = await this.usersService.findOne(null, [
      {
        email: username,
      },
      {
        number: username,
      },
    ]);
    if (!user)
      throw new UnauthorizedException({
        message: 'Credentials is incorrect!',
      });
    const isPasswordCorrect = await user.isCorrectPassword(password);
    if (!isPasswordCorrect)
      throw new UnauthorizedException({
        message: 'Credentials is incorrect!',
      });

    const token = await user.generateToken();
    const populatedUser = await this.usersService.findOnePopulated(user.id);
    const message = translateThis('auth.user_loggedin');
    return {
      message: message,
      data: {
        user: populatedUser.data,
      },
      meta: {
        token,
      },
    };
  }

  async signup(signupAdminDto: SignupAdminDto) {
    let createUserDto = new CreateUserDto();
    createUserDto.fullName = signupAdminDto.fullName;
    createUserDto.email = signupAdminDto.email;
    createUserDto.number = signupAdminDto.number;
    createUserDto.password = signupAdminDto.password;
    createUserDto.confirm_password = signupAdminDto.confirm_password;

    try {
      await this.usersService.create(createUserDto);

      // return { message: `Otp sent to your ${otp_destination}`, otp };
      const message = translateThis('auth.user_created');
      return {
        message,
      };
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException(error.message);
    }
  }

  // async saveAndSendOtpToEmail(loginOrSignupDto: LoginOrSignupDto) {
  //   const { user, otp_destination } = loginOrSignupDto;
  //   const isExist = await this.usersService.findOne(null, {
  //     email: user,
  //   });
  //   let message = translateThis('auth.email_not_found');
  //   console.log('isExist', isExist);

  //   if (!isExist) throw new NotFoundException(message);
  //   try {
  //     const generatedOtp = await this.userOtpService.createOtp({
  //       user,
  //       otp_destination,
  //     });
  //     /*  message = this.i18n.t('auth.otp_sent', {
  //       lang: requestLang,
  //     }); */
  //     await this.emailService.sendWelcomeAndOtp(user, generatedOtp);
  //     return generatedOtp;
  //   } catch (error) {
  //     message = translateThis('auth.otp_not_sent');

  //     throw new UnprocessableEntityException(error.message || message);
  //   }
  // }
  // async saveAndSendOtpTonumber(loginOrSignupDto: LoginOrSignupDto) {
  //   const { user, otp_destination, country_code } = loginOrSignupDto;
  //   const isExist = await this.usersService.findOne(null, {
  //     number: user,
  //   });

  //   let message = translateThis('auth.email_not_found');
  //   console.log('isExist', isExist);

  //   if (!isExist) throw new NotFoundException(message);
  //   try {
  //     const generatedOtp = await this.userOtpService.createOtp({
  //       user,
  //       otp_destination,
  //       country_code,
  //     });

  //     await this.numberService.sendWelcomeAndOtp(
  //       `${country_code}${user}`,
  //       generatedOtp,
  //     );
  //     return generatedOtp;
  //   } catch (error) {
  //     message = translateThis('auth.otp_not_sent');

  //     throw new UnprocessableEntityException(error.message || message);
  //   }
  // }
}
