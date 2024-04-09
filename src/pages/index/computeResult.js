import { toNumber } from "lodash-es"

export const computeResult = (params) => {
    const { averageDailyFirewood, workingHours, commuteLength, hoursFish, qualification, workEnv, oppositeSex, ditto, occupation, startWorkTime } = params
    const comprehensive = 1 * workEnv * oppositeSex * ditto
    const result = (toNumber(averageDailyFirewood) * comprehensive) / (35 * (toNumber(workingHours) + toNumber(commuteLength) - 0.5 * toNumber(hoursFish)) * qualification * occupation)
    return (result * startWorkTime).toFixed(2)
}