<template>
  <div>
    <div>
      <textarea
        name="content"
        class="form-control"
        rows="10"
        :value="preMark"
        @input="update"
      >
      </textarea>
    </div>
    <div class="card">
      <h2 class="card-title">Preview:</h2>
      <div v-html="postMark"></div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import _ from "lodash";

// import { ref, computed, onMounted, watch } from "vue";
export default {
  name: "Editor",
  data() {
    return {
      preMark: localStorage.preMark || "",
    };
  },
  computed: {
    postMark() {
      return marked(this.preMark, { breaks: true, smartypants: true });
    },
  },
  created() {
    // update parent when getting preMark from localStorage.
    this.$emit("update:preMark", this.preMark);
  },
  methods: {
    update: _.debounce(function (e) {
      localStorage.preMark = e.target.value;
      this.preMark = e.target.value;
      this.$emit("update:preMark", e.target.value);
    }, 300),
  },
};
</script>
