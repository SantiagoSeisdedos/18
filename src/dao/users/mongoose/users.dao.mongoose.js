import { errorStatusMap } from "../../../utils/errorCodes.js";

export class UsersDaoMongoose {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async register(userData) {
    try {
      const newUser = await this.usersModel.register(userData);
      if (!newUser) {
        const error = new Error("User not created");
        error.code = errorStatusMap.UNEXPECTED_ERROR;
        throw error;
      }
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(email) {
    return await this.usersModel.findOne({ email }).lean();
  }

  async getUsers() {
    return await this.usersModel.find().lean();
  }

  async authentication(credentials) {
    const user = await this.usersModel.authentication(credentials);
    return user;
  }

  async login(username, password) {
    const user = await this.usersModel.login(username, password);
    return user;
  }

  async updateUser(email, userData) {
    try {
      const updatedUser = await this.usersModel
        .findOneAndUpdate({ email }, userData, { new: true })
        .lean();

      if (!updatedUser) {
        const error = new Error("User not found");
        error.code = errorStatusMap.NOT_FOUND;
        throw error;
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
