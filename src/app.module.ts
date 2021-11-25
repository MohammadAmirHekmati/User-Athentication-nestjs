import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UploadfileModule } from './uploadfile/uploadfile.module';
import { SentmailModule } from './sentmail/sentmail.module';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, UploadfileModule, SentmailModule]
})
export class AppModule {}
