declare const VueRouter: any;

import { EditProfile, Login, Profile } from "../pages/index.ts";

const routes = [
  { path: "/", component: Login },
  { path: "/profile/:username", component: Profile, props: true },
  { path: "/e/profile/:username", component: EditProfile, props: true },
];

export const router = new VueRouter({
  routes: routes,
});
