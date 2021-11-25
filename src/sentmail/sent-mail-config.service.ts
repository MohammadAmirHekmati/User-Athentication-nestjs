import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';

export class SentMailConfigService implements MailerOptionsFactory{
  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    const options:MailerOptions={
      transport:{
        host:'smtp.gmail.com',
        port:'465',
        secure:true,
        auth:{
          user:'mamadtest1153@gmail.com',
          pass:'Amir11538832@'
        }
      }
    }
    return options
  }

}