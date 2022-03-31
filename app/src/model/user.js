let userList = [];
const addUser = (user) => (userList = [...userList, user]);
const removeUser = (id) => {
  return (userList = userList.filter((user) => user.id !== id));
};
const getListUsersByRoom = (room) => {
  return userList.filter((user) => user.room === room);
};
const getUserById = (id) => {
  userList.find((user) => user.id === id);
};

module.exports = {
  addUser,
  removeUser,
  getListUsersByRoom,
  getUserById,
};
