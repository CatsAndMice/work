import { eq } from "lodash-es"

export const config = {
    baseURL: eq(process.env.NODE_ENV, 'production') ? 'https://work.linglan01.cn' : 'https://work.linglan01.cn'
}
