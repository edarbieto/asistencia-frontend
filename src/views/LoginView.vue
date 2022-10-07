<template>
  <div>
    <div class="card" style="max-width: 300px">
      <div class="card-body">
        <h4 class="card-title text-center">Ingresar</h4>
        <h6 class="card-subtitle text-center text-muted">
          Por favor, ingrese sus credenciales
        </h6>
        <div class="card-text my-3 d-grid gap-3">
          <input
            v-model="username"
            type="text"
            class="form-control"
            placeholder="Nombre de usuario"
          />
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Contraseña"
          />
        </div>
        <div class="d-grid">
          <button @click="login" class="btn btn-primary">Ingresar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const authStore = useAuthStore();
      await authStore.login(this.username, this.password);
    },
  },
};
</script>
