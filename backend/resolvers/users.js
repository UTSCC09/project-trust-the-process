const User = require("../models/Users");
const bcrypt = require("bcrypt");

module.exports = {
    Mutation: {
        registerUser: async (_, {name, email, password}) => {
            try {
                const user = await User.findOne({email});
                if(user) {
                    return {
                        __typename: "UserRegisterFail",
                        message: `The user with email ${email} has already existed`,
                        statusCode: 409
                    }
                }

                const newUser = new User({
                    name,
                    email
                });

                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(password, salt);
                
                const savedUser = await newUser.save();
                return {
                    __typename: "UserRegisterSuccess",
                    user: newUser,
                    statusCode: 200
                }
            }
            catch (error) {
                return {
                    __typename: "UserRegisterFail",
                    message: `${error}`,
                    statusCode: 500
                }
            }
        }
    }
}