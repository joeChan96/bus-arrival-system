<script setup>
import RouteList from './components/RouteList.vue';
import { reactive } from 'vue';
import moment from 'moment';

const state = reactive({
  currentTime: moment().format('DD/MM/YYYY HH:mm:ss'),
})

setInterval(() => {
  state.currentTime = moment().format('DD/MM/YYYY HH:mm:ss');
}, 1000);
</script>

<template>
  <div class="layout">
    <div class="left-grid">
      <img alt="3ASV" src="@/assets/3asv.jpg" width="100%" height="100%" />

      <div class="bg-primary d-flex flex-row justify-space-between align-center py-2 px-2" style="height: 20%;">
        <div class="text-h4" style="color: azure;">{{ state.currentTime }}</div>
        <v-btn text="更改巴士站/路線" @click="$refs.routeList.openDialog()" style="align-self: center;">
        </v-btn>

      </div>
    </div>

    <div class="right-grid">
      <RouteList ref="routeList" />
    </div>
  </div>
</template>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
}

.left-grid {
  width: 70%;
  /* height: 100vh; */
}

.right-grid {
  width: 30%;
}

@media (min-width: 1024px) {}
</style>
