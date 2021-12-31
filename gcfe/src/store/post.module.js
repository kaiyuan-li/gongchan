import PostService from "../services/post.service";
export const post = {
  namespaced: true,
  state: {
      content: '',
      title: '',
  },
  actions: {
    submit(_, post) {
        return PostService.submit(post).then(
            () => {
                console.log('successfully submitted post')
            }
        )
    },

  },
}
