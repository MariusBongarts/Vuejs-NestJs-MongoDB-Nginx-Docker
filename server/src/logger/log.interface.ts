import { Document} from 'mongoose';
export interface Log extends Document {
  email: string;
  _user: string;
  url: string;
  createdAt: number;
}
