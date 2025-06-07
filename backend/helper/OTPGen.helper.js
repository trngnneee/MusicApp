module.exports.OTPGen = (length) => {
  const character = "0123456789";
  let res = "";
  for (let i = 0; i < length; i++)
  {
    res += character.charAt(Math.floor(Math.random() * character.length));
  }
  return res;
}