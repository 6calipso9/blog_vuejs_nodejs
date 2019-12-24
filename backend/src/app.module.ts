import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/bstu-blog', { useNewUrlParser: true }),
    BlogModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
