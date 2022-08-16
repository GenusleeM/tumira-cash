import User from "../models/User.js";
import { get_signed_token } from "../util/getsingedtoken.js";
import { ROLES } from "../util/Roles.js";
import CryptoJS from "crypto-js";

export const register = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    id_number,
    password,
    phone,
    address,
    role,
  } = req.body;

  // double checking when creating a user
  let user = await User.findOne({ phone: phone } || { email: email });
  if (user !== null) {
    return res.json({
      success: false,
      message: "User with that phone already exist",
      data: { user },
    });
  }
  try {
    const user = await User.create({
      firstname,
      lastname,
      id_number,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SCR).toString(),
      phone,
      address,
      role,

      balance: "0.0",
    });
    res
      .json({
        success: "true",
        message: "User created successfully",
        data: {
          token: await get_signed_token(user),
        },
      })
      .status(200);
  } catch (error) {
    console.log(error);
    res
      .json({
        success: "false",
        message: error.message,
      })
      .status(201);
    return;
  }
};

export const login = async (req, res) => {
  console.log("......................................................");
  const { email, password } = req.body;
  console.log(req.body);

  if (!email && !password) {
    res
      .json({
        success: "false",
        message: "please provide email and password",
      })
      .status(404);
    return;
  }
  try {
    //1 check if the useremail  is in the database
    const user = await User.findOne({ email }).select("+password");

    // check if the user exist
    if (!user) {
      res
        .json({
          success: "false",
          message: "User with that details not found",
        })
        .status(401);
      return;
    }
    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SCR
    );
    const originalPassword = decryptedPass.toString(CryptoJS.enc.Utf8);
    // check if the passsword match
    if (password != originalPassword) {
      res
        .json({
          success: "false",
          message: "Provide correct password",
        })
        .status(401);
      return;
    }

    // if all tests have passed then success
    res.json({
      success: "true",
      message: "successfuly loged in",
      data: {
        token: await get_signed_token(user),
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: "false",
      message: error.message,
    });
    return;
  }
};
