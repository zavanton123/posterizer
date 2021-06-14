import axios from "axios";

export const fetchPosts = async () => {
  const response = await axios.get(`http://localhost:5000/api`);
  const data = await response.data;
  return await data.posts;
}
