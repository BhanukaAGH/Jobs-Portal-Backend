const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    profileImg: user.photoUrl,
  }
}

module.exports = createTokenUser
