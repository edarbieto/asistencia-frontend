<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { userApi } from "./api/user.api";
import { useAuthStore } from "./stores";

const authStore = useAuthStore();

const newPassword = ref("test");

const openChangePassword = () => {
  newPassword.value = "";
};

const changePassword = async () => {
  await userApi.updateSelfPassword(newPassword.value);
  authStore.logout();
};
</script>

<template>
  <!-- Change Password Modal -->
  <div
    class="modal fade"
    id="changePasswordModal"
    tabindex="-1"
    aria-labelledby="changePasswordModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="changePasswordModalLabel">
            Cambiar contraseña
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input
            v-model="newPassword"
            type="password"
            class="form-control"
            placeholder="Nueva contraseña"
          />
          <div class="d-grid mt-3">
            <button
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="changePassword"
            >
              Actualizar contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="app-container bg-light" style="min-height: 100vh">
    <nav
      v-show="authStore.user"
      class="navbar navbar-expand navbar-dark bg-dark"
    >
      <div class="navbar-nav">
        <span class="navbar-brand mx-3"
          >- {{ authStore.user?.username }} -</span
        >
        <RouterLink to="/" class="nav-item nav-link">
          Marcar asistencia
        </RouterLink>
        <RouterLink
          v-show="authStore.user?.roles.includes('admin')"
          to="/admin"
          class="nav-item nav-link"
        >
          Admin
        </RouterLink>
        <a
          href=""
          class="nav-item nav-link"
          data-bs-toggle="modal"
          data-bs-target="#changePasswordModal"
          @click="openChangePassword"
        >
          Cambiar contraseña
        </a>
        <a href="" @click="authStore.logout()" class="nav-item nav-link">
          Salir
        </a>
      </div>
    </nav>
    <div class="container pt-4 pb-4">
      <RouterView />
    </div>
  </div>
</template>
