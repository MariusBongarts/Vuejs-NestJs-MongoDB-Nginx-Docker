import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './log.interface';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new Logger('LoggerService');

  constructor(
    @InjectModel('Log') private logModel: Model<Log>) { }

  /**
   * Saves a log for a user. It will save the visits of users on url´s for further research
   *
   * @param {JwtPayload} userJwt
   * @param {string} url
   * @returns
   * @memberof LoggerService
   */
  async createLog(userJwt: JwtPayload, url: string) {
    try {
      const log: Partial<Log> = {
        email: userJwt.email,
        createdAt: new Date().getTime(),
        _user: userJwt._id,
        url: url
      };
      const createdLog = new this.logModel(log);
      return await createdLog.save();
    } catch (error) {
      this.logger.warn(`Could not create log`);
    }
  }

  /**
   * This returns all user logs.
   * IMPORTANT: Should definitely never be executed by user! Only for internal research.
   *
   * @returns
   * @memberof LoggerService
   */
  async getLogs() {
    return await this.logModel.find().exec();
  }
}
