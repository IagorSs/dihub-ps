import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'Need to be CPF formatted like 000.000.000-00',
  })
  cpf: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
