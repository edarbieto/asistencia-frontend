<template>
  <div class="container">
    <h2 class="text-center my-4">Marcar asistencia</h2>
    <div class="row align-items-center">
      <div class="col-12 col-md-6">
        <label for="notas" class="form-label">
          Indicar alguna nota, justificación u observación
        </label>
        <textarea
          v-model="notes"
          class="form-control mb-5"
          id="notas"
          rows="7"
        ></textarea>
      </div>
      <div class="col-12 col-md-6">
        <div class="d-grid gap-2">
          <button
            class="btn btn-primary"
            :disabled="today === null || today?.length === 2"
            @click="register"
          >
            Marcar {{ typeLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { attendanceApi } from "../api/attendance.api";

export default {
  data() {
    return {
      notes: "",
      today: null,
    };
  },
  methods: {
    async register() {
      const type = this.today?.length === 0 ? "IN" : "OUT";
      const attendance = await attendanceApi.register(type, this.notes);
      this.$router.go();
    },
  },
  computed: {
    typeLabel() {
      if (!this.today || this.today?.length === 2) return "INGRESO";
      return this.today?.length === 0 ? "INGRESO" : "SALIDA";
    },
  },
  async beforeMount() {
    const today = await attendanceApi.getToday();
    this.today = today;
  },
};
</script>
