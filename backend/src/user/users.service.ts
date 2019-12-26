import { Model } from 'mongoose';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    if(this.userModel.findOne({email: createUserDto.email}).length == 0){
      let createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    }
    return {message: "email exist"};
  }

  async findOneByEmail(email): Model<User> {

    return await this.userModel.findOne({email: email});

  }

}