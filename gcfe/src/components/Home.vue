<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">CreateAt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="postInfo in content" v-bind:key="postInfo.id">
          <th scope="row">
            <router-link :to="'/post/' + postInfo._id" class="nav-link">{{
              postInfo.title
            }}</router-link>
          </th>
          <td>{{ postInfo.author }}</td>
          <td>{{ postInfo.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PostService from "../services/post.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    PostService.getAllPosts().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
