<template>
  <app-page title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">Create</button>
    </template>
    <request-table :requests="[]"></request-table>
    <teleport to="body">
      <app-modal title="Create request" v-if="modal" @close="modal = false">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref} from 'vue'
import RequestModal from '../components/request/RequestModal'
import RequestTable from '../components/request/RequestTable'
import AppModal from '../components/ui/AppModal'
import AppPage from '../components/ui/AppPage'

export default {
  setup() { 
    const modal = ref(false)
    return {modal, close: () => modal.value = false}
  },
  components: { AppPage, RequestTable, AppModal, RequestModal }
}
</script>