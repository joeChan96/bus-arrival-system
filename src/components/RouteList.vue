<script setup>
import kmbAPI from '@/api/kmb';
import { reactive } from 'vue';
import moment from 'moment';
import { ref } from 'vue'
import stopMap from '@/utils/stopMap';

const showDialog = ref(false)
const state = reactive({ 
  dataObjList: [], 
  stopID: '140E4137EAC319B5'
})

const fetchStopETA = async () => {
  state.dataObjList = [];

  const result = await kmbAPI.fetchStopETA(state.stopID);
  if(!result.data || result.data.length == 0) {
    return;
  }

  for (const data of result.data) {
    let routeIsRepeated = false;

    for (const obj of state.dataObjList) {
      if (obj.route == data.route) {
        routeIsRepeated = true;
        break;
      };
    }

    if (!routeIsRepeated) {
      await state.dataObjList.push({
        route: data.route,
        eta: !data.eta ? '未有預定班次' : moment(data.eta).format('HH:mm')
      });
    }
  }
}

const openDialog = () => {
  showDialog.value = true;
}

const closeDialog = () => {
  showDialog.value = false;

  fetchStopETA();
}

const updateStopID = (stopID) => {
  state.stopID = stopID;
  state.dataObjList = [];
  closeDialog();
}

setInterval(() => {
  fetchStopETA();
}, 15000);

fetchStopETA();

defineExpose({
  openDialog
})
</script>

<template>
  <v-container>
    <v-row justify="end" align="center" style="background-color: red; height: 60px;">
      <v-col cols="6" class="d-flex justify-start">
        <div class="text-h5" style="color: azure;">{{ stopMap[state.stopID] }}</div>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <div class="text-h5" style="color: azure;">到達時間</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="px-0 py-2">
        <v-list-item 
          v-for="data in state.dataObjList"
          class="px-0 border-b-thin"
        >
          <template v-slot:prepend>
            <v-list-item class="text-h2 py-4 px-0 ">{{ data.route }}</v-list-item>
          </template>

          <template v-slot:append>
            <v-list-item class="text-h4 py-4 px-0">{{ data.eta }}</v-list-item>
          </template>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog 
    v-model="showDialog"
    max-width="500"
  >
    <v-card>
      <v-card-title>選擇巴士線/路線</v-card-title>
      <v-select
        label="巴士站"
        :items="[
          {id: '140E4137EAC319B5', value: '光輝圍 (KW113)'},
          {id: 'D6A21211E4788F7B', value: '光輝圍 (KW114)'},
          {id: '4626B2F2CF370D72', value: '葵興站 (KW926)'},
        ]"
        item-title="value"
        item-value="id"
        v-model="state.stopID"
        @update:modelValue="updateStopID"
      ></v-select>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>