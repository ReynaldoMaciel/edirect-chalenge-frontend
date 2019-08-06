<template>
  <div class="ListTasks">
    <h5>To Do</h5>
    <ul class="list_tasks">
      <li v-for="task in notDoneTasks(idProject)" :key="task.idTask" class="is-flex item_task">
        <div class="is-flex item_task_description">
          <b-checkbox @input="markAsDone(task.idTask)">
          </b-checkbox>
          <!-- <span>{{ task.description }}</span> -->
          <input type="text" class="input_edit_inline" @blur="updateTaskOnBlur(task.idTask)" v-model="task.description"/>
        </div>
        <div class="is-flex item_actions">
          <b-button class="is-small is-danger" @click="removeTaskById(task.idTask)">
            <b-icon
              icon="delete"
            />
          </b-button>
        </div>
      </li>
      <li>
        <button class="is-small button is-success" @click="showModalAddTask">
          <b-icon icon="plus"></b-icon>
          <span>Add task</span>
        </button>
      </li>
    </ul>
    <h5>Done</h5>
    <ul class="list_tasks">
      <li v-for="task in doneTasks(idProject)" :key="task.idTask" class="is-flex item_done">
        <div>
          <b-checkbox :disabled="true" :value="task.finishDate ? true : false">
            <span class="list_item_done">{{ task.description }}</span>
          </b-checkbox>
        </div>
        <div>
          <span> finished at {{ new Date(task.finishDate).toLocaleString() }}</span>
        </div>
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
              autofocus="true"
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
import { mapGetters, mapActions, mapState } from 'vuex'
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
      removeTask: 'task/removeTask',
      resetNameTask: 'task/resetNameTask',
      removeAllTasksByProject: 'task/removeAllTasksByProject',
    }),
    async removeTaskById(idTask) {
      try {
        let response = await api().delete(`task/${idTask}`)
        if (response.status !== 200) throw new Error(response.data.message)
        this.removeTask(response.data)
      } catch (error) {
        this.$toast.open({
          duration: 5000,
          message: error.message ? error.message : 'Error on delete task',
          position: 'is-top',
          type: 'is-danger'
        })
      }
    },
    async updateTaskOnBlur (idTask) {
      try {
        let { description, idProject } = this.listTasks.find(task => task.idTask === idTask)
        let response = await api().put(`task/${idTask}`, { description })
        if (response.status !== 200) throw new Error(response.data.message)
        // this.$toast.open({
        //   duration: 5000,
        //   message:
        //     'Task updated',
        //   position: 'is-top',
        //   type: 'is-success'
        // })
      } catch (error) {
        let { idProject } = this.listTasks.find(task => task.idTask === idTask)
        this.refreshTasks(idProject)
        this.$toast.open({
          duration: 5000,
          message: error.message ? error.message : 'Error on update task',
          position: 'is-top',
          type: 'is-danger'
        })
      }
      // this.updateTask({ idTask, description })
    },
    async refreshTasks(idProject) {
      try {
        let response = await api().get(`tasksByProject/${idProject}`)
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
        let response = await api().put(`task/${idTask}`, { done: true })
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
      this.description = ''
      this.showModal = true
    },
    async confirmAddTask() {
      try {
        let allFieldsValidated = await this.$validator.validateAll()
        if (allFieldsValidated) {
          let { description, idProject } = this
          let response = await api().post(`task`, { description, idProject })
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
    ...mapState({
      listTasks: state => state.task.listTasks
    }),
    ...mapFields('task', ['description'])
  },
}
</script>

<style>
.list_tasks{
  list-style-type: none !important;
  list-style-position: unset;
}
.list_item_done{
  text-decoration: line-through
}
.item_task{
  background-color: #f9f9f9;
  padding: 6px;
  flex-direction: row;
  justify-content: space-between
}
.item_task_description{
  align-items: center;
  width: 100%;
}
.item_actions button{
  margin-right: 2px;
}
.input_edit_inline{
  background-color: inherit;
  border: none;
  font-size: 1em;
  width: 100%;
}
.input_edit_inline:focus{
  background-color: inherit;
  border: none;
  outline: none;
}
.item_done{
  background-color: #f9f9f9;
  justify-content: space-between;
}
</style>
