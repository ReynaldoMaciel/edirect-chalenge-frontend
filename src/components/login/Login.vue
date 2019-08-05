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
                    icon="email"
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
                    icon="lock"
                  >
                  </b-input>
                </b-field>
                <br />
                <div class="control">
                  <button
                    class="button is-medium is-fullwidth is-rounded is-primary"
                    @click="authenticate"
                  >
                    Login
                  </button>
                  <br />
                  <router-link
                    :to="{ name: 'cadastro' }"
                    class="buttons is-centered"
                  >
                    <div class="button is-primary is-small is-outlined">
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
import { mapActions } from 'vuex'
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
    ...mapActions('token', [
      'setToken'
    ]),
    async authenticate() {
      try {
        let allFieldsValidated = await this.$validator.validateAll()
        if (allFieldsValidated) {
          let { email, password } = this
          let response = await api.post('user/login', { email, password })
          if (response.status !== 200) throw new Error()
          this.$toast.open({
            duration: 5000,
            message:
              'Logged successfuly',
            position: 'is-top',
            type: 'is-success'
          })
          this.setToken(response.data.token)
          this.$router.push({ name: 'dashboard' })
        } else {
          this.$toast.open({
            duration: 5000,
            message:
              'Fill all fields correctly before continue',
            position: 'is-top',
            type: 'is-danger'
          })
        }
      } catch (error) {
        let message = error.message ? error.message : 'Unknown error'
        if (error.isAxiosError) {
          message = error.response.data
        }
        this.$toast.open({
          duration: 5000,
          message: message,
          position: 'is-top',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
