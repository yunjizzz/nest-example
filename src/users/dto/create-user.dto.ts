import { IsString, MinLength, Matches, MaxLength, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

/*
 회원가입 요청 중 이름, 이메일, 패스워드를 받는 dto
*/

export class CreateUserDto{

    //패스워드와 일치하는 지 확인
    @Transform(({ value, obj }) => {
        if (obj.password.includes(value.trim())) {
          throw new BadRequestException('password는 name과 같은 문자열을 포함할 수 없습니다.');
        }
        return value.trim();
     })
    //공백제거
    @Transform(params => params.value.trim())
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    readonly name: string;

    @IsString()
    @IsEmail()
    @MaxLength(60)
    readonly email: string;
    
   
    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string;

    
}

