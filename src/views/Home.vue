<template>
  <app-loader v-if="loading" />
  <app-page title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Create</button>
    </template>
    <request-table :requests="[requests]"></request-table>
    <teleport to="body">
      <app-modal title="Create request" v-if="modal" @close="modal = false">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import RequestModal from '../components/request/RequestModal'
import RequestTable from '../components/request/RequestTable'
import AppModal from '../components/ui/AppModal'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'
import { useStore } from 'vuex'

export default {
  setup() { 
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    onMounted(async () => { 
      loading.value = true
      await store.dispatch('request/load') 
      loading.value = false
    })
    const requests = computed(() => store.getters['request/requests'])
    return { modal, requests, loading } //close: () => modal.value = false
  },
  components: { AppPage, RequestTable, AppModal, RequestModal, AppLoader }
}
</script>