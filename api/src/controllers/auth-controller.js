exports.login = (req, res, next) => {
  return res.json({message: `Login`});
}


exports.signup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body['confirm-password'];



  return res.json({message: `Signup`});
}
