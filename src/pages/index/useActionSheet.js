import { shallowRef } from "vue"

export default (actions) => {
    const show = shallowRef(false)
    const selectValue = shallowRef(actions[0].key)
    const selectName = shallowRef(actions[0].name)

    const open = () => {
        show.value = true
    }

    const close = () => {
        show.value = false
    }

    const select = (event) => {
        const detail = event.detail
        selectName.value = detail.name
        selectValue.value = detail.key
    }

    return {
        show,
        selectName,
        selectValue,
        open,
        close,
        select
    }
}