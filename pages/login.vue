<template>
  <div class="container max-w-4xl mx-auto">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    signIn() {
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          if (!res || !res.user) return
          res.user.getIdToken(true).then((idToken: any) => {
            localStorage.setItem('access_token', idToken.toString())
            localStorage.setItem(
              'refresh_token',
              res!.user!.refreshToken.toString()
            )
            this.$router.push('/')
          })
        })
        .catch((error: Error) => {
          this.error = error.message
        })
    },
    async signUp() {
      await this.$fire.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (res) => {
          if (!res || !res.user) return
          const idToken = await res.user.getIdToken(true)

          localStorage.setItem('access_token', idToken.toString())
          localStorage.setItem(
            'refresh_token',
            res.user.refreshToken.toString()
          )
        })
        .catch((error: Error) => {
          this.error = error.message
        })
    },
  },
})
</script>
