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
      <label class="block text-grey-darker text-sm font-bold mb-2" for="name">
        ユーザー名
      </label>
      <input
        id="name"
        v-model="name"
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
        type="text"
        placeholder="Name"
      />
    </div>

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
      <Button @click.native="signUp"> Sign up </Button>
      <NuxtLink to="/login"> 既にアカウントをお持ちの方 </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { $axios } from '@/utils/api'

export default Vue.extend({
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async signUp() {
      localStorage.clear()

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
          await $axios.$post('/api/users', {
            user: res.user,
            name: {"name":this.name},
          })
          this.$router.push('/')
        })
        .catch((error: Error) => {
          this.error = error.message
        })
    },
  },
})
</script>
