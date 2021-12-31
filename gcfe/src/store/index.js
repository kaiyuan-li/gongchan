import { createStore } from 'vuex'
import { auth } from './auth.module'
import { post } from './post.module'

const store = createStore({
    modules: {
        auth,
        post,
    }
})

export default store