import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  authorID: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  emoji: string;

  @IsString()
  @IsOptional()
  intro: string;

  @IsBoolean()
  @IsOptional()
  isPublic: boolean;

  @IsString()
  @IsOptional()
  major: string;

  @IsInt()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  semester: string;

  @IsInt()
  @IsOptional()
  subscribersNumber: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  university: string;

  @IsString()
  @IsOptional()
  year: string;
}
