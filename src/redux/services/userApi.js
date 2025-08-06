
import axios from "axios";

export const fetchUsers = async () => {
  const res = await axios.get("/api/users");
  return res.data.users;
};


export const createUsers = async (user) => {
  console.log(user,"redux");
  try {
    const res = await axios.post("/api/users", user);

    return res.data.users;
  } catch (error) {
    console.error("Error creating users:", error);
    throw error;
  }
};


// export const updateUsers = async (id, data) => {
//   const res = await axios.put(`/api/users/${id}`, data);
//   return res.data;
// };

export const deleteUsers = async (id) => {
  await axios.delete(`/api/users?id=${id}`);
};
