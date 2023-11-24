const { defineConfig } = require('cypress')
//import { defineConfig } from 'cypress'

module.exports = defineConfig({
  //export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
  },
  fixturesFolder: false,//we wil not use the folder fixture because that we will put this false
  video: false,
})