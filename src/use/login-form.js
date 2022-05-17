import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'


export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const {value:email, errorMessage:eError, handleBlur:eBlur} = useField(
        'email', yup.string().trim().required('Enter email, please')
        .email('Необходимо ввести корректный email')
    )
    const {value:password, errorMessage:pError, handleBlur:pBlur} = useField(
        'password', yup.string().trim().required('Enter password, please')
        .min(6, 'Пароль не может быть меньше 6 символов')
    )
    const isTooManyAttempts = computed(() => submitCount.value >= 3)
    watch(isTooManyAttempts, v => { if(v) { setTimeout(() => submitCount.value = 0, 1500) }})

    const onSubmit = handleSubmit(async values => { 
        console.log('form', values); 
        await store.dispatch('auth/login', values)
        router.push('/')
    })
    return {email, password, eError, pError, eBlur, pBlur, onSubmit, isSubmitting,
        isTooManyAttempts}
}