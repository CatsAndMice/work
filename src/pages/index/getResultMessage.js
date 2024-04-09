import { unref } from "vue"
export const getResultMessage = (result) => {
    const unrefResult = unref(result)

    if (unrefResult < 0.8) {
        return "很惨呀"
    } else if (unrefResult <= 1.5) {
        return "一般"
    } else if (unrefResult <= 2) {
        return "很爽"
    } else {
        return "爽爆炸"
    }
}