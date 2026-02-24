import { userModel } from "../model/user.model.js";
import { comparePassword, hassPassword } from "../utils/hashPass.js";
import { createToken } from "../utils/token.js";

// ----------- Register
export const registerController = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;

    const hashPass = await hassPassword(password);
    const user = { name, username, password: hashPass, role };

    const newUser = await userModel.create(user);
    console.log("User created:", newUser); // Added logging
    if (!newUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not Created" });
    }
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(400).json({ error: error.message });
  }
};

// ----------- Login
export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = await createToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// -------- Get All doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await userModel.find({ role: "doctor" }).select("-password");
    
    res.status(200).json({ 
      success: true, 
      message: doctors.length > 0 ? "get doctors" : "No doctors found", 
      doctors: doctors || [] 
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// --------------get all patient
export const getAllPatient = async (req, res) => {
  try {
    const patients = await userModel
      .find({ role: "patient" })
      .select("-password");
    res.status(200).json({ 
      success: true, 
      message: patients.length > 0 ? "get patients" : "No patients found", 
      patients: patients || [] 
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

