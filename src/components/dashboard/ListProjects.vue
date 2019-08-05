<template>
  <div class="ListProjects">
    <b-collapse :open="false" class="card" :aria-id="'aria_id_' + index" v-for="(project, index) in listProjects" :key="index">
      <div
        slot="trigger" 
        slot-scope="props"
        class="card-header"
        role="button"
        :aria-controls="'aria_id_' + index"
        @click="selectProject(project.idProject, props.open)">
        <div class="card-header-title">
          <div class="wrapper-project-name">
            {{ project.name }}
          </div>
        </div>
        <a class="card-header-icon">
          <b-icon
            :icon="props.open ? 'menu-up' : 'menu-down'">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="is-pulled-right">
            <b-button type="is-info" size="is-small" class="margin-right" @click="editProject(project.idProject)">
              Edit project
            </b-button>
            <b-button type="is-danger" size="is-small" @click="confirmRemoveProject(project.idProject)">
              Delete project
            </b-button>
          </div>
          <ListTasks :idProject="project.idProject"/>
        </div>
      </div>
    </b-collapse>
    <b-modal :active.sync="showModalEditProject" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
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
              @click="confirmEditProject"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import api from '@/services/api'
import ListTasks from './ListTasks'

export default {
  name: 'ListProjects',
  data() {
    return {
      showModalEditProject: false
    }
  },
  methods: {
    ...mapActions({
      addTasks: 'task/addTasks',
      setIdProject: 'project/setIdProject',
      updateProject: 'project/updateProject',
      removeProject: 'project/removeProject',
      removeAllTasksByProject: 'task/removeAllTasksByProject'
    }),
    async confirmRemoveProject (idProject) {
      try {
        // TODO: Check if project has tasks
        let response = await api.delete(`project/${idProject}`)
        if (response.status !== 200 && response.data !== 1) throw new Error(response.data.message)
        this.removeProject(idProject)
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
    },
    async confirmEditProject () {
      try {
        let allFieldsValidated = await this.$validator.validateAll()
        if (allFieldsValidated) {
          let { name } = this
          let response = await api.put(`project/${this.idProject}`, { name })
          if (response.status !== 200) throw new Error(response.data.message)
          this.updateProject(response.data)
          this.$toast.open({
            duration: 5000,
            message:
              'Project updated',
            position: 'is-top',
            type: 'is-success'
          })
          this.showModalEditProject = false
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
    },
    editProject (idProject) {
      this.showModalEditProject = true
      this.name = this.listProjects.find(project => project.idProject === idProject).name
      this.setIdProject(idProject)
    },
    async selectProject(idProject, open) {
      try {
        this.removeAllTasksByProject(idProject)
        if(!open) {
          let response = await api.get(`tasksByProject/${idProject}`)
          this.addTasks(response.data)
        }
      } catch (error) {
        this.$toast.open({
          duration: 5000,
          message: error.message ? error.message : 'Error on getting projects info',
          position: 'is-top',
          type: 'is-danger'
        })
      }
    }
  },
  computed: {
    ...mapState({
      listProjects: state => state.project.listProjects,
      idProject: state => state.project.idProject
    }),
    ...mapFields('project', ['name'])
  },
  components: {
    ListTasks
  }
}
</script>

<style>
.margin-right{
  margin-right: 7px;
}
</style>

