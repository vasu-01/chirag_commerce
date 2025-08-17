import { User } from "../model/user.model.js";
import { uploadCloudinary } from "../utils/Cloudinary.js";

const registerUser = async (req, res) => {
  try {
    //accessing all the fields from user/frontend
    const { firstName, lastName, userName, email, password } = req.body;
    // console.log(firstName, lastName, userName, email, password);

    if (!firstName || !lastName || !userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //checking if user is not already exists in db
    const userPresent = await User.findOne({
      $or: [
        {
          userName,
        },
        { email },
      ],
    });
    if (userPresent) {
      return res.status(409).json({
        message: "User already exists !",
      });
    }

    //accessing avatar file path
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      return res.status(400).json({ message: "Avatar file is required" });
    }
    // console.log(avatarLocalPath);

    const avatar = await uploadCloudinary(avatarLocalPath);
    if (!avatar) {
      return res.status(400).json({ message: "Avatar file is required " });
    }

    //storing user details in db
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      avatar: avatar.secure_url,
    });

    console.log(user);

    //checking if user created succesfully or not
    const userCreated = await User.findById(user._id).select("-password");
    if (!userCreated) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
    return res
      .status(200)
      .json({ success: true, user, message: "User created successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "hi", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Please enter correct details! " });
    }
    // console.log(userName, password);

    const user = await User.findOne({
      userName,
    });
    if (!user) {
      return res.status(404).json({ message: "User does not exists! " });
    }
    // console.log(user);

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user credentials! " });
    } else {
      console.log("valid password");
    }

    const loggedInUser = await User.findById(user._id).select("-password");
    if (!loggedInUser) {
      return res.status(404).json({ message: "User does not exists! " });
    }
    console.log(loggedInUser);

    return res.status(200).json({
      success: true,
      loggedInUser,
      message: "User logged in successfully!",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: "something wrong" });
  }
};

export { registerUser, loginUser };
