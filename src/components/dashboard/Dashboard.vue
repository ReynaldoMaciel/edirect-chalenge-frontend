<template>
  <div class="Dashboard">
    <div class="hero-body">
      <div class="container">
        <div class="column">
          <h1 class="is-size-4 has-text-weight-bold is-pulled-left">
            Projects
          </h1>
          <b-button type="is-info is-medium is-pulled-right" @click="openModalCreateProject">
            Create Project
          </b-button>
        </div>
        <br />
        <br />
        <div class="is-centered">
          <ListProjects />
        </div>
      </div>
    </div>
    <b-modal :active.sync="showModalCreateProject" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <b-field
            label="Name"
            :type="errors.first('name') ? 'is-danger' : ''"
            :message="errors.first('name')"
          >
            <b-input
              autofocus="true"
              ref="name"
              v-model="name"
              v-validate="'required'"
              autocomplete="off"
              placeholder="Name of your project"
              type="text"
              name="name"
            >
            </b-input>
          </b-field>
          <br />
          <div class="control">
            <button
              class="button is-medium is-fullwidth is-rounded is-info"
              @click="createProject"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import api from '@/services/api'
import ListProjects from './ListProjects'

export default {
  name: 'Dashboard',
  data() {
    return {
      showModalCreateProject: false
    }
  },
  computed: {
    ...mapFields('project', ['name'])
  },
  mounted() {
    api.get('projects').then(response => {
      this.addProjects(response.data)
    }).catch(error => {
      this.$toast.open({
        duration: 5000,
        message: error.message ? error.message : 'Error on getting projects info',
        position: 'is-top',
        type: 'is-danger'
      })
    })
  },
  methods: {
    ...mapActions('project', [
      'addProjects',
      'addProject'
    ]),
    openModalCreateProject () {
      this.showModalCreateProject = true
      this.name = ''
    },
    async createProject () {
      try {
        let allFieldsValidated = await this.$validator.validateAll()
        if (allFieldsValidated) {
          let { name } = this
          let response = await api.post('project', { name })
          if (response.status !== 201) throw new Error(response.message)
          this.addProject(response.data)
          this.$toast.open({
            duration: 5000,
            message:
              'Project created',
            position: 'is-top',
            type: 'is-success'
          })
          this.showModalCreateProject = false
        } else {
          this.$toast.open({
            duration: 5000,
            message: 'Fill all fields correctly before continue',
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
  },
  components: {
    ListProjects,
  }
}
</script>
