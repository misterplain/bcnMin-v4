const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc Refresh
// @route GET /users/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  let refreshToken = req.get("Authorization");
  refreshToken = refreshToken.slice(refreshToken.indexOf(" ") + 1);
  console.log(refreshToken);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden " + err });

      const foundUser = await User.findOne({
        email: decoded.email,
      }).exec();
      console.log(foundUser);

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

module.exports = { refresh };
