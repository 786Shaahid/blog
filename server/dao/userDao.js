import User from "../models/user.model.js";

class UserDao {
  createUser(name, email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = new User({
          name: name,
          email: email,
          password: password,
        });
        await user.save();
        resolve(user);
      } catch (err) {
        if (err.code === 11000) {
          err = {
            status: 200,
            message: "user already registered",
          };
        }
        reject(err);
      }
    });
  }

  getUserByEmail(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ email: email });
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  getUserById(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(userId).select("-password");
        if (!user) throw "username does not exist";
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default UserDao;