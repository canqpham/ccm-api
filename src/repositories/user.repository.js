import User from '../models/user.model';
import NotFoundException from '../errors/not-found.error';

import mongoose from 'mongoose'
class UserRepository {
  constructor() { }

  handlerLogin = async (email, password) => {
    // console.log(email)
      const user = await User.findOne({ email });
      // console.log(user)
      const isPassValid = user.comparePassword(password);
      if (!isPassValid) return false;
      return user;
    
  }

  handlerRegister = async (data) => {
      // const { email } = data
      // let user = await User.findOne({ email });
      // if(user) throw new Error('Email already exists !');
      let user = await User.create(data);
      return user;
  }

  getUserInfo = async (id) => {
    let user = await User.findById(id)
    return user
  }

  getListByParams = async data => {
    let users = await User.find(data)
    return users
  }

  getUserByParams = async data => {
    let user = await User.findOne(data)
    return user
  }

  update = async (id, data) => {
    let user = await User.findByIdAndUpdate(id, data)
    return user
  }

  getListEmail = async email => {
    if(email) {
      let users = await User.find(
        {
          email: { $regex: email }
        },
        {
          email: "$email",
          displayName: "$displayName",
          fullName: "$fullName"
        }
      ).limit(5)
      return users
    } else {
      return []
    }
  }
}

export default UserRepository;