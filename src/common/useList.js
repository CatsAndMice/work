import { ref, shallowRef } from "vue"
import getType from "medash/lib/getType";
import {eq} from "lodash-es"
import isFunc from "medash/lib/isFunc";
const isPromise = (result) => eq(getType(result), "Promise")

export default (query, cb) => {
    const listRef = ref([])
    const loading = shallowRef(false)
    const getList = async (params, cb1) => {
        loading.value = true
        const requestQuery = params ? params : query;
        const result = cb(requestQuery)
        if (isPromise(result)) {
            result.then(r => {
                console.log(r,111);

                listRef.value = r ? r : []
                loading.value = false
                isFunc(cb1) ? cb1() : null
            }, (error) => {
                console.log(error);
                loading.value = false
            })
        }
    };

    return {
        loading,
        listRef,
        getList
    }
}