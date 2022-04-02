const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator');

module.exports = {
    
    Mutation: {
        registerUser: async (_, {firstName, lastName, email, password}) => {
            try {
                console.log("register");
                if(!validator.isAlphanumeric(firstName) || !validator.isAlphanumeric(lastName) || !validator.isEmail(email) || !password) {
                    return {
                        __typename: "UserFail",
                        message: `At least one of firstName, email, or password is invalid`,
                        statusCode: 401
                    };
                }
                
                // firstName = sanitizeContent(firstName);
                firstName = validator.escape(firstName);
                firstName = validator.trim(firstName);

                // lastName = sanitizeContent(lastName);
                lastName = validator.escape(lastName);
                lastName = validator.trim(lastName);

                // email = sanitizeContent(email);
                email = validator.escape(email);
                email = validator.trim(email);

                // password = sanitizeContent(password);
                password = validator.escape(password);
                password = validator.trim(password);

                const user = await User.findOne({email: email});
                if(user) {
                    return {
                        __typename: "UserFail",
                        message: `The user with email ${email} already exists`,
                        statusCode: 409
                    };
                }

                const newUser = new User({
                    firstName,
                    lastName,
                    email
                });

                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(password, salt);
                
                await newUser.save();
                return {
                    __typename: "UserRegisterSuccess",
                    user: newUser,
                    statusCode: 200
                };
            }
            catch (error) {
                return {
                    __typename: "UserFail",
                    message: `${error}`,
                    statusCode: 500
                };
            }
        },

        loginUser: async (_, {email, password}) => {
            try {
                console.log("login");
                if(!validator.isEmail(email) || !password) {
                    return {
                        __typename: "UserFail",
                        message: `At least one of firstName, email, or password is invalid`,
                        statusCode: 401
                    };
                }

                // email = sanitizeContent(email);
                email = validator.escape(email);
                email = validator.trim(email);

                // password = sanitizeContent(password);
                password = validator.escape(password);
                password = validator.trim(password);

                const user = await User.findOne({email: email});
                if(!user) {
                    return {
                        __typename: "UserFail",
                        message: `The user with email ${email} cannot be found`,
                        statusCode: 404
                    };
                }

                const checkPassMatch = await bcrypt.compare(password, user.password);
                if(!checkPassMatch) {
                    return {
                        __typename: "UserFail",
                        message: `The password does not match`,
                        statusCode: 401
                    };
                }
                
                const token = await jwt.sign({id: user._id}, "burnYourCalories", {expiresIn: 86400});
                return {
                    __typename: "UserLoginSuccess",
                    user: user,
                    token: token,
                    statusCode: 200
                };
            }
            catch(err) {
                return {
                    __typename: "UserFail",
                    message: `${error}`,
                    statusCode: 500
                };
            }
        }
    }
};
