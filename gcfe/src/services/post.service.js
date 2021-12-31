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
}

export default new PostService();
