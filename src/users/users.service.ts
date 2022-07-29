import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { UserInfo } from './UserInfo';


/**
 * injectable 데코레이터의 경우 UsersService 내에 해당 데코레이터를 선언함으로써
 * 어떤 Nest 컴포넌트에서도 주입할 수 있는 프로바이더가 된다.
 * 별도의 scope를 설정하지 않으면 일반적으로 싱글톤 인스턴스가 생성된다.
 */
@Injectable()
export class UsersService {
  
  constructor(private emailService: EmailService){}
  
  async getUserInfo(userId: string): Promise<UserInfo> {
      // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없으면 에러
      // 2. 조회된 데이터를 UserInfo 타입으로 전달.

      throw new Error('Method not implemented.');
  }
 
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createUser(name: string, email: string, password: string){
    //await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name,email,password,signupVerifyToken);
    await this.sendMemberJoinEmail(email,signupVerifyToken);
  }


  private checkUserExists(email: string) {
    throw new Error('Method not implemented.'); //TODO DB 연동 후 구현
  }

  
  private saveUser(name: string, email: string, password: string, signupVerifyToken: string) {
    return ; //TODO DB 연동 후 구현
  }
  
  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(email,signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string>{
    //TODO
    // DB에서 singupVerifyToken 으로 회원가입 처리중인 유저가 있는지 조회 후 없다면 에러
    // 바로 로그인 상태가 되도록 JWT 발급
    throw new Error('Method not implemented');
  }



  async login(email:string, password:string): Promise<string>{
    //TODO
    // DB에서 email, password를 가진 유저가 존재하는지 DB에서 확인 후 없다면 에러
    // JWT 발급
    throw new Error('Method not implemented');
  }

}