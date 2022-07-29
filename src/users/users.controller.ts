import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}
    

    //회원가입 구현
    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void>{
        const{name, email, password} = dto;
        await this.usersService.createUser(name,email,password);
        
        console.log(dto);
    }

    //이메일 검증
    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string>{
        const{signupVerifyToken} = dto;

        return await this.usersService.verifyEmail(signupVerifyToken);
    }

    //로그인
    @Post('/login')
    async login(@Body() dto:UserLoginDto): Promise<string>{
        const{email, password} = dto;
        
        return await this.usersService.login(email,password);
    }

    //특정 회원 정보 가져오기
    @Get('/:id')
    async getUserInfo(@Param('id') userId: string):Promise<UserInfo>{
        
        return await this.usersService.getUserInfo(userId);
    }

}
