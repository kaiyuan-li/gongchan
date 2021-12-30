<template>
  <div class="container">
    <table class="table table-hover" v-if="isAdmin">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Roles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="userInfo in content" v-bind:key="userInfo.id">
          <th scope="row">{{ userInfo.username }}</th>
          <td>{{ userInfo.email }}</td>
          <td>{{ userInfo.roles }}</td>
        </tr>
      </tbody>
    </table>
    <h1 v-else>{{ content }}</h1>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Admin",
  data() {
    return {
      content: "",
      isAdmin: false,
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.isAdmin = response.status != 403;
        if (this.isAdmin) {
          this.content = response.data;
        } else {
          this.content = "No Admin access!";
        }
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
