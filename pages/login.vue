<template>
  <div
    class="
      bg-white
      shadow-md
      rounded
      mx-8
      my-10
      px-8
      pt-6
      pb-8
      mb-4
      flex flex-col
    "
  >
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
        Eメール
      </label>
      <input
        id="email"
        v-model="email"
        class="
          shadow
          appearance-none
          border
          rounded
          w-full
          py-2
          px-3
          text-grey-darker
        "
        type="email"
        placeholder="Email"
      />
    </div>
    <div class="mb-6">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="password"
      >
        パスワード
      </label>
      <input
        id="password"
        v-model="password"
        class="
          shadow
          appearance-none
          border border-red
          rounded
          w-full
          py-2
          px-3
          text-grey-darker
          mb-3
        "
        type="password"
        placeholder="******************"
      />
      <p v-show="error" class="text-red-500">
        {{ error }}
      </p>
    </div>
    <div class="flex items-center justify-between">
      <Button @click.native="signIn"> Sign in </Button>
      <NuxtLink to="/signup"> アカウントをお持ちでない方 </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { $axios } from '@/utils/api'
import { signUp, signIn } from '@/infrastructures/firebase'
import { userStore } from '@/store'

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
        .then(async ({ user }) => {
          const idToken = await user.getIdToken()
          userStore.login(idToken)
          await $axios
            .post(
              'http://localhost:3000/api/users',
              { user: { email: user.email } },
              { headers: { Authorization: idToken } }
            )
            .then(() => {
              this.$router.push('/')
            })
          this.$router.push('/')
        })
        .catch((error) => {
          this.error = error.message
        })
    },
  },
})
</script>
