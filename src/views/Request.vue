<template>
    <app-loader v-if="loading"></app-loader>
    <app-page back title="Заявка" v-else-if="request">
        <p><strong>Имя</strong>: {{ request.fio }}</p>
        <p><strong>Телефон</strong>: {{ request.phone }}</p>
        <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
        <p><strong>Статус</strong>: <app-status :type="request.status" /></p>
        
        <div class="form-control">
            <label for="status">Статус</label>
            <select id="status" v-model="status">
                <option value="done">Done</option>
                <option value="cancel">Cancel</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
            </select>   
        </div>

        <button class="btn danger" @click="remove">Delete</button>
        <button class="btn" @click="update" v-if="hasChanges">Update</button>
    </app-page>
    <h3 v-else class="text-center text-white">Заявки с id = {{$route.params.id}} нет.</h3>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppPage from '../components/ui/AppPage.vue'
import AppLoader from '../components/ui/AppLoader.vue'
import AppStatus from '../components/ui/AppStatus.vue'
import { useStore } from 'vuex'
import {currency} from '../utils/currency'
export default {
    setup() { 
        const route = useRoute() 
        const router = useRouter() 
        const store = useStore()
        const status = ref()
        const loading = ref(true)
        const request = ref({})

        onMounted( async () => { 
            loading.value = true; 
            request.value = await store.dispatch('request/loadOne', route.params.id)
            status.value = request.value?.status
            loading.value = false; 
        })
        const hasChanges = computed(() => request.value.status !== status.value)

        const remove = async () => { await store.dispatch('request/remove', route.params.id); router.push('/') }
        const update = async () => { 
            const data = {...request.value, status:status.value, id:route.params.id}
            await store.dispatch('request/update', data); router.push('/') 
            request.value.status = status.value
        }

        console.log(route.params.id)
        return { loading, request, currency, remove, status, update,hasChanges } //
     },
    components: { AppPage, AppLoader, AppStatus },
    
}
</script>