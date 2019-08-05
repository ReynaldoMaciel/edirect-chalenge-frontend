<template>
  <div class="ListTasks">
    <h5>To Do</h5>
    <ul class="list_tasks">
      <li v-for="task in notDoneTasks(idProject)" :key="task.idTask">
        <b-checkbox @input="markAsDone(task.idTask)">
          <p>
            {{ task.description }}
          </p>
        </b-checkbox>
      </li>
      <li>
        <b-button type="is-small" @click="showModalAddTask">
          Add
        </b-button>
      </li>
    </ul>
    <h5>Done</h5>
    <ul class="list_tasks">
      <li v-for="task in doneTasks(idProject)" :key="task.idTask" class="list_item_done">
        <b-checkbox :disabled="true" :value="task.finishDate ? true : false" @input="markAsDone(task.idTask)">
          {{ task.description }}
        </b-checkbox>
      </li>
    </ul>
    <b-modal :active.sync="showModal" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <b-field
            label="Description"
            :type="errors.first('description') ? 'is-danger' : ''"
            :message="errors.first('description')"
          >
            <b-input
              ref="description"
              v-model="description"
              v-validate="'required'"
              autocomplete="off"
              placeholder="Description of your task"
              type="text"
              name="description"
            >
            </b-input>
          </b-field>
          <br />
          <div class="control">
            <button
              class="button is-medium is-fullwidth is-rounded is-info"
              @click="confirmAddTask"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import api from '@/services/api'

export default {
  name: 'ListTasks',
  data() {
    return {
      showModal: false
    }
  },
  props: {
    idProject: {
      type: Number,
      required: true
    },
  },
  methods: {
    ...mapActions({
      addTask: 'task/addTask',
      addTasks: 'task/addTasks',
      updateTask: 'task/updateTask',
      removeAllTasksByProject: 'task/removeAllTasksByProject',
    }),
    async refreshTasks(idProject) {
      try {
        let response = await api.get(`tasksByProject/${idProject}`)
        this.removeAllTasksByProject(idProject)
        this.addTasks(response.data)
      } catch (error) {
        this.$toast.open({
          duration: 5000,
          message: error.message ? error.message : 'Error on refresh tasks of project',
          position: 'is-top',
          type: 'is-danger'
        })
      }
    },
    async markAsDone (idTask) {
      try {
        let response = await api.put(`task/${idTask}`, { done: true })
        if (response.status !== 200) throw new Error(response.data.message)
        this.refreshTasks(response.data.idProject)
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
    showModalAddTask () {
      this.showModal = true
    },
    async confirmAddTask() {
      try {
        let allFieldsValidated = await this.$validator.validateAll()
        if (allFieldsValidated) {
          let { description, idProject } = this
          let response = await api.post(`task`, { description, idProject })
          if (response.status !== 201) throw new Error(response.data.message)
          this.addTask(response.data)
          this.showModal = false
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
  computed: {
    ...mapGetters({
      notDoneTasks: 'task/notDone',
      doneTasks: 'task/done'
    }),
    ...mapFields('task', ['description'])
  },
}
</script>

<style>
.list_tasks{
  /* list-style-type: none !important; */
}
.list_item_done{
  text-decoration: line-through
}
</style>
