import axios from 'axios';

import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v0/post/';

class PostService {
  async submit(post) {
    const response = await axios
      .post(API_URL + 'submit', {
        title: post.title,
        content: post.content,
        author: post.author,
        createdAt: Date.now(),
      }, { headers: authHeader() });
    return response.data;
  }

  async getAllPosts() {
    const res = await axios.get(API_URL + 'all_posts')
    return res
  }

  async getPost(id) {
    const res = await axios.get(API_URL + 'post', {params: {_id: id}})
    return res
  }
}

export default new PostService();
