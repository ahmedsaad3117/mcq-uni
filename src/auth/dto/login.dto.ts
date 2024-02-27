import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidationArguments,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly user: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
