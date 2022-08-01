import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { EmailModule } from './email/email.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UserEntity } from './users/user.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [UsersModule, EmailModule, 
    ConfigModule.forRoot({
        envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
        load: [emailConfig],
        isGlobal: true,
        validationSchema
    }
  ),
    TypeOrmModule.forRoot()
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/users');
  }
}
