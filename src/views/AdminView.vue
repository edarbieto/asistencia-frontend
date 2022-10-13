<template>
  <div>
    <!-- Create User Modal -->
    <div
      class="modal fade"
      id="createUserModal"
      tabindex="-1"
      aria-labelledby="createUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="createUserModalLabel">
              Crear nuevo usuario
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Nombre de usuario</p>
            <input
              v-model="newUser.username"
              type="text"
              class="form-control mb-3"
              placeholder="Nombre de usuario"
            />
            <p>Roles</p>
            <div
              v-for="possibleRole in possibleRoles"
              class="form-check form-check-inline"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :id="possibleRole + 'RoleCheck'"
                :value="possibleRole"
                v-model="newUser.roles"
              />
              <label class="form-check-label" :for="possibleRole + 'RoleCheck'">
                {{ possibleRole }}
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="createNewUser"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
      v-show="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editUserModalLabel">
              Usuario: {{ selectedUser?.username }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Cambiar contraseña</p>
            <input
              v-model="newPassword"
              type="password"
              class="form-control"
              placeholder="Nueva contraseña"
            />
            <div class="d-grid my-3">
              <button class="btn btn-primary" @click="updatePassword">
                Actualizar contraseña
              </button>
            </div>
            <p>Cambiar roles</p>
            <div
              v-for="possibleRole in possibleRoles"
              class="form-check form-check-inline"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :id="possibleRole + 'RoleCheck'"
                :value="possibleRole"
                v-model="newRoles"
              />
              <label class="form-check-label" :for="possibleRole + 'RoleCheck'">
                {{ possibleRole }}
              </label>
            </div>
            <div class="d-grid mt-3">
              <button class="btn btn-primary" @click="updateRoles">
                Actualizar roles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <h5>Lista de usuarios</h5>
      </div>
      <div class="col">
        <button
          class="btn btn-primary btn-sm float-end"
          data-bs-toggle="modal"
          data-bs-target="#createUserModal"
          @click="selectCreateUser"
        >
          Crear nuevo usuario
        </button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre de usuario</th>
          <th scope="col">Acciones</th>
          <th scope="col">Registro del día</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td scope="row" class="align-middle">{{ user.id }}</td>
          <td class="align-middle">{{ user.username }}</td>
          <td class="align-middle">
            <button
              class="btn btn-danger btn-sm me-2"
              @click="deleteUser(user.id)"
            >
              <i class="fa-regular fa-trash-can"></i>
            </button>
            <button
              class="btn btn-success btn-sm"
              @click="registerUser(user.id)"
            >
              <i class="fa-regular fa-calendar-check"></i>
            </button>
          </td>
          <td class="align-middle">
            <ul>
              <li
                v-for="att in userAttendance(user.id)"
                :class="`fs-6 ${att.onTime ? '' : 'text-danger fw-bold'}`"
              >
                {{ att.type === "IN" ? "Entrada" : "Salida" }} -
                {{ att.createdAt }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { userApi } from "../api/user.api";
import { authApi } from "../api/auth.api";
import { attendanceApi } from "../api/attendance.api";

export default {
  data() {
    return {
      users: [],
      selectedUserId: null,
      modal: false,
      newPassword: "",
      newRoles: [],
      possibleRoles: ["user", "admin"],
      newUser: {
        username: "",
        roles: [],
      },
      attendances: [],
    };
  },
  methods: {
    selectUser(id) {
      this.modal = true;
      this.selectedUserId = id;
      this.newPassword = "";
      this.newRoles = this.users
        .find((user) => user.id === id)
        .roles.map((role) => role.name);
    },
    async deleteUser(id) {
      await userApi.deleteUser(id);
      this.$router.go();
    },
    async updatePassword() {
      await userApi.updatePassword(this.selectedUserId, this.newPassword);
      this.$router.go();
    },
    async updateRoles() {
      await userApi.updateRoles(this.selectedUserId, this.newRoles);
      this.$router.go();
    },
    selectCreateUser() {
      this.newUser = {
        username: "",
        roles: [],
      };
    },
    userAttendance(userId) {
      return this.attendances.filter(
        (attendance) => attendance.userId === userId
      );
    },
    async createNewUser() {
      const toCreateUser = this.newUser;
      toCreateUser.password = toCreateUser.username;
      await authApi.signup(toCreateUser);
      this.$router.go();
    },
    async registerUser(userId) {
      await attendanceApi.register(userId);
      this.$router.go();
    },
  },
  computed: {
    selectedUser() {
      const a = this.users.find((user) => user.id === this.selectedUserId);
      return a;
    },
  },
  async beforeMount() {
    const users = await userApi.getUsers();
    const attendances = await attendanceApi.getTodayUsers();
    this.users = users;
    console.log(attendances);
    this.attendances = attendances;
  },
};
</script>
