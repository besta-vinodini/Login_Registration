import User from "../models/User.js";


export const registerUser = async (req, res) => {
    try {
      console.log("📥 Incoming data:", req.body);  // 👈 log payload
  
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("❌ Registration error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("📩 Login request received:", req.body);
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const user = await User.findOne({ email });
      console.log("🔍 Found user:", user);
  
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
  
      console.log("✅ Login successful for:", email);
      res.json({ success: true, message: "Login successful", user });
    } catch (error) {
      console.error("❌ Login error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  