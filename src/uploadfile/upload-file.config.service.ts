import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export class UploadFileConfigService implements MulterOptionsFactory{
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const options:MulterModuleOptions={
      storage:diskStorage({
        destination:'./uploaded-file',
        filename:(req,file,cb)=>{
          const name=file.originalname.split('.')[0]
          const fileExtention=file.originalname.split('.')[1]
          const newFileName=name.split('').join('__')+Date.now()+'.'+fileExtention
          cb(null,newFileName)
        }
      }),
      fileFilter:(req,file,cb)=> {
        if (file.originalname.split('.')[1] !== 'jpg') {
        return cb(null,false)
        }
        return cb(null,true)


      }
    }
    return options
  }

}