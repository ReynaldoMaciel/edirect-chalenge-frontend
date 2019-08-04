<template>
  <div class="Login">
    <section class="hero is-fullheight is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="column has-text-centered">
            <h1 class="is-size-4 has-text-weight-bold">
              Login
            </h1>
          </div>
          <div class="columns is-centered">
            <div class="column is-two-thirds-tablet is-one-third-desktop">
              <div class="box">
                <b-field
                  label="Email"
                  :type="errors.first('email') ? 'is-danger' : ''"
                  :message="errors.first('email')"
                >
                  <b-input
                    ref="email"
                    v-model="email"
                    v-validate="'required|email'"
                    autocomplete="off"
                    placeholder="Email"
                    type="email"
                    name="email"
                  >
                  </b-input>
                </b-field>
                <b-field
                  label="Senha"
                  :type="errors.first('password') ? 'is-danger' : ''"
                  :message="errors.first('password')"
                >
                  <b-input
                    ref="password"
                    v-model="password"
                    v-validate="'required'"
                    autocomplete="off"
                    placeholder="Informe uma password"
                    type="password"
                    name="password"
                    :password-reveal="true"
                  >
                  </b-input>
                </b-field>
                <br />
                <div class="control">
                  <button
                    class="button is-medium is-fullwidth bg_first color_white is-rounded"
                    @click="authenticate"
                  >
                    Login
                  </button>
                  <br />
                  <router-link
                    :to="{ name: 'cadastro' }"
                    class="buttons is-centered"
                  >
                    <div class="button is-danger is-small is-outlined">
                      I don't have an account
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import api from '@/services/api'

export default {
  name: 'Login',
  data() {
    return {}
  },
  computed: {
    ...mapFields('user', ['email', 'password'])
  },
  created() {
    // this.email = 'r@r.com'
    // this.password = '123qwe'
  },
  methods: {
    async login() {
      let { email, password } = this
      let result = await api.post('user/login', { email, password })
      console.log(result)
    },
    authenticate() {
      try {
        this.$validator.validateAll().then(validated => {
          if (!validated) {
            this.$toast.open({
              duration: 5000,
              message:
                'Fill all fields correctly before continue',
              position: 'is-bottom',
              type: 'is-danger'
            })
            return
          }
          this.login()
        })
      } catch (error) {
        this.$swal('Ops..', 'Error on login', 'error')
      }
    }
  }
}
</script>
