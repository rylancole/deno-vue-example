export const Login = {
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  template: `
    <form v-on:submit.prevent="handleSubmit">
      <div class="row">
        <q-input outlined v-model="username" label="Username"/>
        <q-input outlined v-model="password" label="Password"/>
        <q-btn outline rounded label="Login" type="submit"></q-btn>
      </div>
    </form>
  `,
  methods: {
    handleSubmit: function (this: { $router: any; username: string }) {
      this.$router.push("/profile/" + this.username);
    },
  },
};
