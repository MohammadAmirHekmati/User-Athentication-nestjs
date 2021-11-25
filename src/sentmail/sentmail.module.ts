import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { SentMailConfigService } from './sent-mail-config.service';

@Module({
  imports:[MailerModule.forRootAsync({useClass:SentMailConfigService})]
})
export class SentmailModule {}
