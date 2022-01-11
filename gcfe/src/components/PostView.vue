<template>
  <div>
      <h2 >{{post.title}}</h2>
      <div v-html="postMark"></div>
  </div>
</template>

<script>
import { marked } from "marked";
import PostService from "../services/post.service";

// import { ref, computed, onMounted, watch } from "vue";
export default {
  name: "PostView",
  props: ['id'],
  data() {
    return {
      post: {},
    };
  },
  computed: {
    postMark() {
      return marked(this.post.content || "", { breaks: true, smartypants: true });
    },
  },
  created() {
    PostService.getPost(this.id).then(res => {
      this.post = res.data
    })
  },
  methods: {
    likePost () {
      // unimplemented functionality
      console.log('this post is liked by user')
    }
  },
};
// export default {
//   setup() {
//     const preMark = ref("");
//     const postMark = computed({
//       get: () => marked(preMark.value, { breaks: true, smartypants: true }),
//     });
//     onMounted(() => {
//       if (localStorage.preMark) {
//         preMark.value = localStorage.preMark;
//       }
//     });
//     watch(preMark, (val, newVal) => {
//       localStorage.preMark = newVal;
//     });
//     return { preMark, postMark };
//   },
// };
</script>
