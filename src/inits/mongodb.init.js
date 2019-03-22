import mongoose from 'mongoose';
import { DatabaseConfig } from '../../configs/index';

export default () => {
  mongoose.connect(DatabaseConfig.URL)
    .then(() => {
      console.log('[MongoDB] Connected mongoodb server.')
    }).catch(error => {
      console.log('[MongoDB] Failed when try connect Mongodb.');
      console.log('[Error Mongodb] ' + error);
    })
}
