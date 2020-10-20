export const EditProfile = {
  props: ["username"],
  template: `
    <form v-if="user" v-on:submit.prevent="handleSubmit"> 
      <div class="row q-pa-md">
        <q-input outlined v-model="user.firstName" label="First Name" type="text"/>
        <q-input outlined v-model="user.lastName" label="Last Name" type="text"/>
      </div>
      <div class="row q-pa-md">
        <q-input outlined v-model="user.company" label="Company" type="text"/>
        <q-input outlined v-model="user.city" label="City" type="text"/>
      </div>
      <div class="q-pa-md" style="max-width: 300px">
        <q-input 
          outlined 
          v-model="user.bio" 
          label="Personal Bio"
          type="textarea"
        />
      </div>
      <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-btn fab icon="save" type="submit" />
      </q-page-sticky>
    </form>
  `,
  data() {
    return {
      user: null,
    };
  },
  created(this: { user: any; username: string }) {
    fetch("http://localhost:8000/users/" + this.username, { method: "GET" })
      .then((response) => {
        return response.json();
      }).then((userData) => {
        this.user = userData;
      });
  },
  methods: {
    handleSubmit(
      this: { $router: any; msg: string; user: any; username: string },
    ) {
      this.user["error"] = null;
      fetch("http://localhost:8000/users/" + this.username, {
        method: "PUT",
        body: JSON.stringify(this.user),
      }).then((response) => {
        this.$router.push("/profile/" + this.username);
      });
    },
  },
};
