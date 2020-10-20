// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      const e = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(e)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
      return v;
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("pages/Login", [], function (exports_1, context_1) {
    "use strict";
    var Login;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("Login", Login = {
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
                    handleSubmit: function () {
                        this.$router.push("/profile/" + this.username);
                    },
                },
            });
        }
    };
});
System.register("pages/Profile", [], function (exports_2, context_2) {
    "use strict";
    var Profile;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("Profile", Profile = {
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
                created() {
                    fetch("http://localhost:8000/users/" + this.username, { method: "GET" })
                        .then((response) => {
                        return response.json();
                    }).then((userData) => {
                        this.user = userData;
                    });
                },
                methods: {
                    handleEditClick() {
                        this.$router.push("/e/profile/" + this.username);
                    },
                },
            });
        }
    };
});
System.register("pages/EditProfile", [], function (exports_3, context_3) {
    "use strict";
    var EditProfile;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            exports_3("EditProfile", EditProfile = {
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
                created() {
                    fetch("http://localhost:8000/users/" + this.username, { method: "GET" })
                        .then((response) => {
                        return response.json();
                    }).then((userData) => {
                        this.user = userData;
                    });
                },
                methods: {
                    handleSubmit() {
                        this.user["error"] = null;
                        fetch("http://localhost:8000/users/" + this.username, {
                            method: "PUT",
                            body: JSON.stringify(this.user),
                        }).then((response) => {
                            this.$router.push("/profile/" + this.username);
                        });
                    },
                },
            });
        }
    };
});
System.register("pages/index", ["pages/Login", "pages/Profile", "pages/EditProfile"], function (exports_4, context_4) {
    "use strict";
    var Login_ts_1, Profile_ts_1, EditProfile_ts_1;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (Login_ts_1_1) {
                Login_ts_1 = Login_ts_1_1;
            },
            function (Profile_ts_1_1) {
                Profile_ts_1 = Profile_ts_1_1;
            },
            function (EditProfile_ts_1_1) {
                EditProfile_ts_1 = EditProfile_ts_1_1;
            }
        ],
        execute: function () {
            exports_4("Login", Login_ts_1.Login);
            exports_4("Profile", Profile_ts_1.Profile);
            exports_4("EditProfile", EditProfile_ts_1.EditProfile);
        }
    };
});
System.register("router/router", ["pages/index"], function (exports_5, context_5) {
    "use strict";
    var index_ts_1, routes, router;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (index_ts_1_1) {
                index_ts_1 = index_ts_1_1;
            }
        ],
        execute: function () {
            routes = [
                { path: "/", component: index_ts_1.Login },
                { path: "/profile/:username", component: index_ts_1.Profile, props: true },
                { path: "/e/profile/:username", component: index_ts_1.EditProfile, props: true },
            ];
            exports_5("router", router = new VueRouter({
                routes: routes,
            }));
        }
    };
});
System.register("router/index", ["router/router"], function (exports_6, context_6) {
    "use strict";
    var router_ts_1;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (router_ts_1_1) {
                router_ts_1 = router_ts_1_1;
            }
        ],
        execute: function () {
            exports_6("default", router_ts_1.router);
        }
    };
});
System.register("components/Layout", [], function (exports_7, context_7) {
    "use strict";
    var Layout;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            exports_7("Layout", Layout = {
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
                    handleHomeClick() {
                        this.$router.push("/");
                    },
                },
            });
        }
    };
});
System.register("components/index", ["components/Layout"], function (exports_8, context_8) {
    "use strict";
    var Layout_ts_1;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (Layout_ts_1_1) {
                Layout_ts_1 = Layout_ts_1_1;
            }
        ],
        execute: function () {
            exports_8("Layout", Layout_ts_1.Layout);
        }
    };
});
System.register("main", ["router/index", "components/index"], function (exports_9, context_9) {
    "use strict";
    var index_ts_2, index_ts_3, app;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (index_ts_2_1) {
                index_ts_2 = index_ts_2_1;
            },
            function (index_ts_3_1) {
                index_ts_3 = index_ts_3_1;
            }
        ],
        execute: function () {
            Vue.component("layout", index_ts_3.Layout);
            app = new Vue({
                el: "#app",
                router: index_ts_2.default,
            });
        }
    };
});

__instantiate("main", false);
