export const Layout = {
  template: `
    <q-layout view="hHh Lpr lff" container class="shadow-2 rounded-borders">
      <q-drawer
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
        <q-list>
          <q-item key="home" clickable @click="handleHomeClick">
            <q-item-section>
              Home
            </q-item-section>
          </q-item>
        </q-list>      
      </q-drawer>
      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  `,
  methods: {
    handleHomeClick(this: { $router: any }) {
      this.$router.push("/");
    },
  },
};
