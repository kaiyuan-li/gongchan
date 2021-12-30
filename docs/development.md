# Development

## Database

### MongoDB in memory
[Reference](https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/) with API authentication

[example test](https://github.com/nodkz/mongodb-memory-server/blob/master/packages/mongodb-memory-server-core/src/__tests__/singleDB.test.ts)

## Authentication

[Reference](https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport)

## Testing

It's strongly recommeded to test server app with Mocha rather than Jest ([ref](https://mongoosejs.com/docs/jest.html)). Because jest for testing react applications.


## Misc

### Commit emoji
[ref](https://gist.github.com/kaiyuan-li/f3d8c664a0534a40891e55c1762945c5)

### Examples
Tons of node mongoose vue3 [examples](https://github.com/bezkoder/node-js-jwt-auth-mongodb)


### Good test example
[ref](https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai)

[Official integration with mocha](https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners/#mocha--chai)


### Do not try to use vuetify
Vuetify only supports vue2. Which will generate a lot of lagging for both vuex and vue router.