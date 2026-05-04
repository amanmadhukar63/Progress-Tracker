import { IUser } from "../models/user.model.js";
import { IClinic } from "../models/clinic.model.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
