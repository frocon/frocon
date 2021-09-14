<template>
  <!-- <div class="container max-w-4xl mx-auto">
    <div class="w-64">
      <p class="flex justify-between my-2">
        <label for="e-mail">E-mail</label>
        <input id="e-mail" v-model="email" class="border-2" type="email" />
      </p>
      <p class="flex justify-between my-2">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          class="border-2"
          type="password"
        />
      </p>
      <p>
        <button class="border-2 p-2" @click="signIn">Sign In</button>
        <button class="border-2 p-2" @click="signUp">Sign Up</button>
      </p>
      <p v-show="error" class="text-red-500">
        {{ error }}
      </p>
    </div>
  </div> -->
  <div id="firebaseui-auth-container"></div>
</template>

<script lang="ts">
import Vue from 'vue'
// import * as firebaseui from 'firebaseui'
import { EmailAuthProvider } from 'firebase/auth'
import { auth, signUp, signIn } from '@/infrastructures/firebase'
import { userStore } from '@/store'

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  created() {
    if (!process.client) return
    const firebaseui = require('firebaseui')
    const ui = new firebaseui.auth.AuthUI(auth)
    ui.start('#firebaseui-auth-container', {
      signInOptions: [EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/',
    })
  },
  methods: {
    signIn() {
      signIn(this.email, this.password)
        .then(async ({ user }) => {
          const uid = await user.getIdToken()
          userStore.login(uid)
          this.$router.push({ path: '/' })
        })
        .catch((error) => {
          this.error = error.message
        })
    },
    signUp() {
      signUp(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.error = error.message
        })
    },
  },
})
</script>
