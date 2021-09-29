<template>
  <div>
    <SignUpForm
      v-if="isNewcommer"
      :sign-up="signUp"
      :error="error"
      :toggle-is-newcommer="toggleIsNewcommer"
    />
    <LoginForm
      v-else
      :sign-in="signIn"
      :error="error"
      :toggle-is-newcommer="toggleIsNewcommer"
    />
  </div>
</template>

<script lang="ts">
import vue from 'vue'
import { $axios } from '@/utils/api'

export default vue.extend({
  data() {
    return {
      isNewcommer: false,
      error: '',
    }
  },
  methods: {
    async signIn(email: string, password: string) {
      await this.$fire.auth
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          if (!res || !res.user) return
          const idToken = await res.user.getIdToken(true)

          localStorage.setItem('access_token', idToken.toString())
          localStorage.setItem(
            'refresh_token',
            res.user.refreshToken.toString()
          )
          this.$router.push('/')
        })
        .catch((error: Error) => {
          this.error = error.message
        })
    },
    async signUp(name: string, email: string, password: string) {
      localStorage.clear()

      await this.$fire.auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          if (!res || !res.user) return
          const idToken = await res.user.getIdToken(true)

          localStorage.setItem('access_token', idToken.toString())
          localStorage.setItem(
            'refresh_token',
            res.user.refreshToken.toString()
          )
          await $axios.$post(
            '/api/users',
            {
              user: {
                email,
                name,
              },
            },
            { headers: { Authorization: idToken.toString() } }
          )
          this.$router.push('/')
        })
        .catch((error: Error) => {
          this.error = error.message
        })
    },
    toggleIsNewcommer() {
      this.isNewcommer = !this.isNewcommer
    },
  },
})
</script>
