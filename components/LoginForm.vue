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
        placeholder="Eメール"
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
      <a @click="toggleIsNewcommer"> アカウントをお持ちでない方 </a>
    </div>
    <div class="flex items-center justify-between">
      <Button @click.native="onSubmit">サインイン</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginForm',
  props: {
    signIn: {
      type: Function,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
    toggleIsNewcommer: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      this.$props.signIn(this.email, this.password)
    },
  },
})
</script>
