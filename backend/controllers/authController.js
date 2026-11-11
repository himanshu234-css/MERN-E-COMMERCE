import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signupUser = async (req, res) => {
     try {
          const { name, email, password } = req.body;
          const userExists = await User.findOne({ email });
          if (userExists) {
               return res.status(400).json({ message: "User already exists" });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          await User.create({ name, email, password: hashedPassword });
          res.status(201).json({ message: "User created successfully" });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
     }
};
 export const loginUser = async (req, res) => {
     try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
               return res.status(400).json({ message: "Invalid credentials" });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
               return res.status(400).json({ message: "Invalid credentials" });
          }
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
               expiresIn: "1h",
          });
          res.json({
               message: "Login successful",
               token,
               user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
               },
          });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
     }
};