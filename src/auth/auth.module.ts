import { Module } from '@nestjs/common';
import { AdminAuthController } from './controllers/auth.dashboard.controller';
import { UsersModule } from 'src/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CustomerModule } from 'src/customer/customer.module';
import { EmailService } from 'src/_common/services/email/email.service';
import { NodeMailerProvider } from 'src/_common/services/email/email-providers/nodemailer.email.provider';
import { SendGridProvider } from 'src/_common/services/email/email-providers/sendgrid.email.provider';
// import { CustomerAuthController } from './controllers/auth.customer.controller';
import { SmsService } from 'src/_common/services/sms/test-sms-service';
import { AdminAuthService } from './providers/auth.admin.service';

@Module({
  imports: [UsersModule],
  controllers: [AdminAuthController],
  providers: [
    AdminAuthService,
    EmailService,
    SmsService,
    {
      provide: 'NodeMailerProvider',
      useClass: NodeMailerProvider,
    },
    {
      provide: 'SendGridProvider',
      useClass: SendGridProvider,
    },
  ],
})
export class AuthModule {}
