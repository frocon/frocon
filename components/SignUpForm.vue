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
        placeholder="ユーザー名"
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
      <a @click="toggleIsNewcommer"> 既にアカウントをお持ちの方 </a>
    </div>
    <div class="flex items-center justify-between">
      <Button @click.native="onSubmit">サインアップ</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SignUpForm',
  props: {
    signUp: {
      type: Function,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    toggleIsNewcommer: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      this.$props.signUp(this.name, this.email, this.password)
    },
  },
})
</script>
