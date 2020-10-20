export const Profile = {
  props: ["username"],
  template: `
    <div v-if="user && !user.error">
      <h3>{{ user.firstName }} {{ user.lastName }}</h3>
      <p>Works at: {{ user.company }} | Lives in: {{ user.city }}</p>
      <p>{{ user.bio }}</p>
      <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-btn fab icon="edit" @click="handleEditClick" />
      </q-page-sticky>
    </div>
    <div v-else>
      <p>There is no profile for {{ username }}</p>
      <q-btn @click="handleEditClick">Create Profile</q-btn>
    </div>
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
    handleEditClick(this: { $router: any; username: string }) {
      this.$router.push("/e/profile/" + this.username);
    },
  },
};
