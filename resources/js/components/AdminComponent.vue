<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          link
          :to="item.action"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
        <v-list>
          <v-list-item
            v-for="item in items2"
            :key="item.text"
            link
          >
            <v-list-item-avatar>
              <img
                :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list>
        <!--<v-list-item-->
          <!--class="mt-4"-->
          <!--link-->
        <!--&gt;-->

          <!--&lt;!&ndash;<v-list-item-title class="grey&#45;&#45;text text&#45;&#45;darken-1">&ndash;&gt;-->
           <!--&lt;!&ndash;<v-switch v-model="theme" class="ma-4" label="Switch Theme"></v-switch>&ndash;&gt;-->
          <!--&lt;!&ndash;</v-list-item-title>&ndash;&gt;-->
        <!--&lt;!&ndash;</v-list-item>&ndash;&gt;-->

        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="theme" color="error" class="ma-4"></v-switch>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Switch Theme</v-list-item-title>
        </v-list-item>


        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Logout</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="red"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Admin Dashboard</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col md="12"><!-- column start -->

           <router-view></router-view>
          </v-col><!-- column end -->
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      theme:true,
      items: [
        { icon: 'mdi-account', text: 'Manage User',action:'users' },
        { icon: 'mdi-apple', text: 'Manage Product' },
        { icon: 'mdi-shopping', text: 'Manage Order' },
        { icon: 'mdi-cash-usd', text: 'Manage Payment' },
        { icon: 'mdi-file-pdf', text: 'Roles',action:'/admin/roles' },
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    watch:{
      theme:function (old, newval) {
        this.$vuetify.theme.dark = old
      }
    },
    methods:{
      logout:function () {
         localStorage.removeItem('token');
        this.$router.push({name: 'Login'});
      }
    }//end of method
  }
</script>
<style scoped></style>
