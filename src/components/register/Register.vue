<template>
  <div class="Register">
    <br />
    <div class="columns">
      <div class="column has-text-centered">
        <h1 class="is-size-4 has-text-weight-bold">
          Register
        </h1>
      </div>
    </div>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-thirds-tablet is-one-third-desktop">
          <div class="box">
            <b-field
              label="Name"
              :type="errors.first('name') ? 'is-danger' : ''"
              :message="errors.first('name')"
            >
              <b-input
                ref="name"
                v-model="name"
                v-validate="'required'"
                autocomplete="off"
                placeholder="Nome"
                type="text"
                name="name"
              >
              </b-input>
            </b-field>
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
              label="Password"
              :type="errors.first('password') ? 'is-danger' : ''"
              :message="errors.first('password')"
            >
              <b-input
                ref="password"
                v-model="password"
                v-validate="'required'"
                autocomplete="off"
                placeholder="Type a password"
                type="password"
                name="password"
                :password-reveal="true"
              >
              </b-input>
            </b-field>
            <b-field
              label="Confirmation"
              :type="errors.first('confirmation_password') ? 'is-danger' : ''"
              :message="errors.first('confirmation_password')"
            >
              <b-input
                ref="confirmation_password"
                v-model="confirmation_password"
                v-validate="'required|confirmed:password'"
                autocomplete="off"
                placeholder="Retype your password"
                type="password"
                name="confirmation_password"
                :password-reveal="true"
              >
              </b-input>
            </b-field>
            <button
              class="button is-medium is-fullwidth is-rounded"
              @click="register()"
            >
              Register
            </button>
            <br />
            <router-link :to="{ name: 'login' }" class="buttons is-centered">
              <div class="button is-danger is-small is-outlined">
                I already have an account
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'Register',
  data() {
    return {
      loadingCep: false,
      disableCidade: true,
      loadingCidades: false,
      cidades: []
    }
  },
  computed: {
    ...mapFields('user', [
      'name',
      'email',
      'password',
      'confirmation_password'
    ]),
  },
  created() {
    this.name = 'Reynaldo'
    this.email = 'r@r.com'
    this.password = '123qwe'
    this.confirmation_password = '123qwe'
  },
  methods: {
    register() {
      try {
        this.$validator.validateAll().then(validated => {
          if (!validated) {
            this.$toast.open({
              duration: 5000,
              message:
                'Fill all fields correctly before continue',
              position: 'is-top',
              type: 'is-danger'
            })
          }
        })
      } catch (error) {
        this.$swal('Ops..', 'Error on register', 'error')
      }
    }
  }
}
</script>
