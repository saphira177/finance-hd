<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="pt-5 blue darken-4">
          <v-toolbar-title class="white--text"><h4>Finance HD</h4></v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Enter your e-mail address"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Enter your password"
                    v-model="password"
                    min="8"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    @click:append="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="passwordRules"
                    counter
                    required
                  ></v-text-field>
                  <v-layout justify-space-between>
                      <v-btn
                        @click="submit"
                        :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                      >Login</v-btn>
                      <a href="">Forgot Password</a>
                  </v-layout>
                </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <a href="https://unsplash.com/photos/i6Wc5qZO5MQ" target="_blank">
      <v-card class="photoCredit teal">
        <v-card-title>
          <div class="white--text">
            Photo by Tatyana Dobreva on Unsplash
          </div>
        </v-card-title>
      </v-card>
    </a>
  </v-container>
</template>

<style>
#app {
  background-image: url("https://images.unsplash.com/photo-1497733942558-e74c87ef89db?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=");
  background-size: cover;
  overflow:hidden;
}
.loginOverlay {
  background:rgba(33,150,243,0.3);
}
.photoCredit{
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>

<script>
import jwtDecode from 'jwt-decode';
import { login } from '@/utils/apis';

export default {
  data: () => ({
    valid: false,
    e1: false,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid', // eslint-disable-line
    ],
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const response = await login(this.email, this.password);
          const { data: { accessToken } } = response;
          this.$localStorage.set('jwt', accessToken);
          this.$localStorage.set('user', jwtDecode(accessToken).userId);
          this.$router.push('/');
        } catch (error) {
          console.log('error', error);
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
