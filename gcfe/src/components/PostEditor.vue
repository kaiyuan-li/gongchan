<template>
  <div>
    <div class="form-group">
      <label for="title">Title</label>
      <input v-model="title" class="form-control" name="title" id="title" placeholder="Title" @input='presistTitle'/>
    </div>
    <div class="form-group">
      <label for="content">Content (Markdown with preview)</label>
      <editor id="content" v-model:preMark="content"></editor>
    </div>
    <button @click="handleSubmitPost" class="btn btn-primary">Submit</button>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue";
export default {
  name: "PostEditor",
  components: {
    Editor,
  },
  data() {
      return {
          title: localStorage.title || '',
          content: '',
          message: '',
      }
  },
  methods: {
    handleSubmitPost() {
      if (!this.title) {
          this.message = "Title cannot be empty!"
          return
      }
      this.message = ''
      const post = {
          title: this.title,
          content: this.content,
          author: this.$store.state.auth.user.username,
      }
      console.log(`submitting post ${JSON.stringify(post)}`);
      this.$store.dispatch('post/submit', post).then(()=> {
          console.log('post submitted!')
      })
    },
    presistTitle(e) {
        localStorage.title = e.target.value
    }
  },
};
</script>