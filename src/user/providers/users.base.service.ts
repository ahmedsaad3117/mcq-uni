import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { Like, Repository } from 'typeorm';
import {
  defaultErrorAutoTranslatedString,
  deleteSuccess,
  deleteSuccessAutoTranslated,
  findOneSuccess,
  findOneSuccessAutoTranslated,
  notFoundErrorAutoTranslatedString,
  updateSuccess,
  updateSuccessAutoTranslated,
} from 'src/_common/utils/successResponseMessage.util';
import { FilterUserDto } from '../dto/filter-user.dto';
// import { RolesService } from 'src/roles/providers/roles.service';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserStatusEnum } from 'src/_common/enums/user_status.enum';
import { translateThis } from 'src/_common/utils/translate-this';
import { hashPasswordUtil } from 'src/_common/utils/hash-passwrod.util';
import { PageOptionsDto } from 'src/_common/pagination/pageOption.dto';
import { PageDto } from 'src/_common/pagination/page.dto';
import { PageMetaDto } from 'src/_common/pagination/page-meta.dto';
import { explodeCompleteUrl } from 'src/_common/utils/explodeCompleteUrl.util';
// import { BulkAssignRole } from 'src/roles/dto/bulk-assign.dto';
import { log } from 'console';
// import { LoginOrSignupDto } from '@app/auth/dto/login-or-signup.dto';
// import { UserOtpService } from '@app/auth/services/user-otp.service';
// import { EmailService } from '@app/_common/services/email/email.service';
// import { SmsService } from '@app/_common/services/sms/test-sms-service';

@Injectable()
export class UsersBaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      log('existingUser', 'existingUser11111111');
      const { number, email, password, confirm_password } = createUserDto;
      if (password !== confirm_password) {
        const message = translateThis('auth.wrong_confirm_password');
        throw new ConflictException({
          message: message,
        });
      }
      const existingUser = await this.userRepository.findOne({
        where: [{ email }, { number }],
      });
      if (existingUser)
        throw new UnprocessableEntityException({
          message:
            existingUser.email === email
              ? 'Email already exist'
              : existingUser.number === number
              ? 'number already exist'
              : 'User already exist',
        });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }

    try {
      const newUser = new UserEntity();
      Object.assign(newUser, {
        status: UserStatusEnum.DEACTIVE,
        ...createUserDto,
      });
      const user = await this.userRepository.save(newUser);
      return user;
    } catch (error) {
      console.log(error, '------------------s');
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    filterUserDto: FilterUserDto,
  ): Promise<PageDto<any>> {
    const finalObject: {} = {};

    Object.keys(filterUserDto).forEach((key) => {
      if (key === 'name' || key === 'number') {
        finalObject[key] = Like(`%${filterUserDto[key]}%`);
      } else {
        finalObject[key] = filterUserDto[key];
      }
    });

    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;

    const [Users, total] = await this.userRepository.findAndCount({
      where: finalObject,
      loadEagerRelations: false,
      take: pageOptionsDto.take,
      skip,
    });

    console.log(total);

    const pageMetaDto = new PageMetaDto({
      itemsPerPage: Users.length,
      total,
      pageOptionsDto,
    });

    return new PageDto('تم استرجاع جميع الموظفين بنجاح', Users, pageMetaDto);
  }

  async findOne(id: number = null, query = null) {
    if (!query) query = { id };

    const user = await this.userRepository.findOne({ where: query });
    return user;
  }
  async findOneBynumber(number: string) {
    const user = await this.userRepository.findOne({ where: { number } });
    return user;
  }
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findOnePopulatedForMiddleware(query) {
    try {
      const userPopulated = await this.userRepository.findOne({
        where: query,
        relations: {},
      });

      if (!userPopulated) {
        const message = notFoundErrorAutoTranslatedString();
        throw new NotFoundException(message);
      }

      return userPopulated;
    } catch (error) {
      console.log(error.message);
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }
  async findOnePopulated(id: number) {
    const userPopulated = await this.findOnePopulatedHelper(id);
    return findOneSuccessAutoTranslated(userPopulated);
  }
  async findOnePopulatedHelper(id: number, query = null) {
    console.log('user findOnePopulated');
    if (!query) query = { id };
    if (isNaN(id))
      throw new UnprocessableEntityException('user Id must be a number');

    try {
      const userPopulated = await this.userRepository.findOne({
        where: query,
      });

      if (!userPopulated) throw new NotFoundException('لا يمكن ايجاد المستخدم');
      return userPopulated;
    } catch (error) {
      console.log('error.message', error.message);

      throw new UnprocessableEntityException(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      const message = notFoundErrorAutoTranslatedString();
      throw new NotFoundException(message);
    }
    try {
      Object.assign(user, updateUserDto);
      await this.userRepository.save(user);
      return updateSuccessAutoTranslated('تم تحديث المستخدم بنجاح');
    } catch (error) {
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }

  async remove(id: number) {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      const message = notFoundErrorAutoTranslatedString();
      throw new NotFoundException(message);
    }

    await this.userRepository.softRemove(user);
    return deleteSuccessAutoTranslated('User deleted successfully');
  }
  // async updateUserPassword(id, updatePasswordDto: UpdatePasswordDto) {
  //   const { old_password, new_password, confirm_new_password } =
  //     updatePasswordDto;
  //   if (new_password != confirm_new_password) {
  //     const message = translateThis('auth.user_passwords_not_match');

  //     throw new ConflictException({
  //       message: message,
  //     });
  //   }
  //   const user = await this.findOne(id);
  //   const isPasswordCorrect = await user.isCorrectPassword(old_password);
  //   if (!isPasswordCorrect) {
  //     const message = translateThis('auth.user_old_passwords_not_match');

  //     throw new ConflictException({
  //       message: message,
  //     });
  //   }
  //   user.password = await hashPasswordUtil(new_password);
  //   try {
  //     await this.update(user.id, user);
  //     return updateSuccessAutoTranslated();
  //   } catch (error) {
  //     const message = translateThis('default.general_error');

  //     throw new UnprocessableEntityException(error.message || message);
  //   }
  // }
  async countEntities() {
    const count = await this.userRepository.count();
    return count;
  }

  async findLastUsers(take: number = 5) {
    const last = await this.userRepository.find({
      order: { created_at: 'DESC' },
      take,
    });
    return last;
  }

  async saveEntity(userEntity: UserEntity) {
    const user = await this.userRepository.save(userEntity);
    return user;
  }
}
