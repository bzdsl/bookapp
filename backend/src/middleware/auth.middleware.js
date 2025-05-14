/** @format */

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    //get token
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "Unauthorized, access denied" });

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute;
