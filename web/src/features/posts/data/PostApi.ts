import axios from "axios";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`/api/`);
    const data = await response.data;
    return await data.posts;
  } catch(err) {
    console.log('zavanton - fetchPosts error')
    console.log(err);
  }
}
