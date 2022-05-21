<template>
    <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
    <table v-else class="table">
        <thead>
            <tr><th>#</th><th>ФИО</th><th>Телефон</th><th>Сумма</th><th>Статус</th><th>Действия</th></tr>
        </thead>
        <tbody>
            <!-- <tr v-for="{r, idx} in requests[0]" :key="r.idx">
                <th>{{ idx+1 }}</th><th>#</th><th>#</th><th>#</th><th>#</th><th>#</th>
            </tr> -->
            <!-- <tr>
                <th>{{ requests[0][0].amount }}</th><th>#</th><th>#</th><th>#</th><th>#</th><th>#</th>
            </tr> -->
            <tr v-for="(r,idx) in requests[0]" :key="r.id">
                <td>{{idx+1}}</td>
                <td>{{r.fio}}</td>
                <td>{{r.phone}}</td>
                <td>{{ currency(r.amount) }}</td>
                <td><app-status :type="r.status"></app-status></td>
                <td>
                    <router-link v-slot="{navigate}" custom :to="{name:'Request', params: {id:r.id}}">
                        <button class="btn" @click="navigate">Open</button>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {currency} from '../../utils/currency'
import AppStatus from '../ui/AppStatus'

export default {
    props: ['requests'],
    setup() { return { currency }},
    components: {AppStatus}
}
</script>