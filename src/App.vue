<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import jwtDecode from 'jwt-decode';
import { loginWithToken } from '@/utils/apis';

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      //
    };
  },
  async beforeCreate() {
    const jwtToken = this.$localStorage.get('jwt');
    try {
      const { status } = await loginWithToken(jwtToken);
      if (status === 201) {
        this.$localStorage.set('user', jwtDecode(jwtToken).userId);
      } else {
        this.$localStorage.remove('user');
      }
    } catch (error) {
      console.log('error', error);
      this.$localStorage.remove('user');
    }
  },
};
</script>
