<template>
  <view :class="{
    'w-screen': true,
    'h-screen': true,
    flex: eq(type, START),
    'justify-center': eq(type, START),
    'items-center': eq(type, START),
    'flex-col': eq(type, START)
  }">
    <block v-if="eq(type, START)">
      <view class="text-center text-4xl font-medium">这个b班上的值不值</view>
      <view class="text-center mt-6 text-sm">算算你的工作值不值，该跑路还是继续苟</view>
      <view class="text-center mb-6 mt-1 text-sm text-slate-400">算法来自知乎@拉拉拍皮球</view>
      <van-button type="info" custom-style="border-radius:0.5rem;" @chooseavatar="chooseavatar"
        open-type="chooseAvatar">开始测试</van-button>
    </block>

    <block v-if="eq(type, WORK_EARNINGS)">
      <view class="p-3">
        <view>
          <view class="py-2 text-sm text-slate-600">平均日薪</view>
          <van-field :value="work.averageDailyFirewood" @input="work.averageDailyFirewood = $event.detail"
            placeholder="计算公式：月薪/工作日" custom-style="border:1px solid rgb(203 213 225);border-radius:0.5rem;"
            :border="false" type="digit" />
        </view>

        <view>
          <view class="py-2 text-sm text-slate-600">工作时长</view>
          <van-field :value="work.workingHours" @input="work.workingHours = $event.detail" placeholder="计算公式：下班时间-上班时间"
            custom-style="border:1px solid rgb(203 213 225);border-radius:0.5rem;" :border="false" type="digit" />
        </view>

        <view>
          <view class="py-2 text-sm text-slate-600">通勤时长</view>
          <van-field :value="work.commuteLength" @input="work.commuteLength = $event.detail" placeholder="单位小时"
            custom-style="border:1px solid rgb(203 213 225);border-radius:0.5rem;" :border="false" type="digit" />
        </view>

        <view class="mb-3">
          <view class="py-2 text-sm text-slate-600">每天摸鱼时长(小时)</view>
          <van-field :value="work.hoursFish" @input="work.hoursFish = $event.detail" placeholder="不干活+吃饭+午休的时长"
            custom-style="border:1px solid rgb(203 213 225);border-radius:0.5rem;" :border="false" type="digit" />
        </view>

        <van-button type="info" @click="nextStep" custom-style="border-radius:0.5rem;" block>下一步</van-button>

        <!-- 在页面内添加对应的节点 -->
        <van-notify id="van-notify" />
      </view>
    </block>


    <block v-if="eq(type, WORK_ENVIRONMENT)">
      <view class="p-3">
        <view>
          <view class="py-2 text-sm text-slate-600">选择学历</view>
          <van-action-sheet :actions="qualifications" :show="show" @close="close" @select="select" @cancel="close"
            cancel-text="取消" />
          <view class="rounded-lg overflow-hidden" style="border:1px solid rgb(203 213 225);"> <van-cell
              :title="selectName" :border="false" is-link @click="open" /></view>
        </view>

        <view>
          <view class="py-2 text-sm text-slate-600">工作环境系数</view>
          <van-action-sheet :actions="workEnv" :show="workEnvShow" @close="workEnvClose" @select="workEnvSelect"
            @cancel="workEnvClose" cancel-text="取消" />
          <view class="rounded-lg overflow-hidden" style="border:1px solid rgb(203 213 225);"> <van-cell
              :title="workEnvSelectName" :border="false" is-link @click="workEnvOpen" /></view>
        </view>

        <view>
          <view class="py-2 text-sm text-slate-600">异性环境系数</view>
          <van-action-sheet :actions="oppositeSex" :show="oppositeSexShow" @close="oppositeSexClose"
            @select="oppositeSexSelect" @cancel="oppositeSexClose" cancel-text="取消" />
          <view class="rounded-lg overflow-hidden" style="border:1px solid rgb(203 213 225);"> <van-cell
              :title="oppositeSexSelectName" :border="false" is-link @click="workEnvOpen" /></view>
        </view>


        <view>
          <view class="py-2 text-sm text-slate-600">同事环境系数</view>
          <van-action-sheet :actions="ditto" :show="dittoSexShow" @close="dittoClose" @select="dittoSexSelect"
            @cancel="dittoClose" cancel-text="取消" />
          <view class="rounded-lg overflow-hidden" style="border:1px solid rgb(203 213 225);"> <van-cell
              :title="dittoSelectName" :border="false" is-link @click="dittoSexOpen" /></view>
        </view>


        <view>
          <view class="py-2 text-sm text-slate-600">职业资格系数</view>
          <van-action-sheet :actions="occupation" :show="occupationSexShow" @close="occupationClose"
            @select="occupationSelect" @cancel="occupationClose" cancel-text="取消" />
          <view class="rounded-lg overflow-hidden" style="border:1px solid rgb(203 213 225);"> <van-cell
              :title="occupationSelectName" :border="false" is-link @click="occupationSexOpen" /></view>
        </view>


        <view>
          <view class="py-2 text-sm text-slate-600">选择上班时间</view>
          <van-radio-group :value="startWorkTimeSelectValue">
            <van-cell-group :border="false">
              <view v-for="(s, i) in startWorkTimes" :key="s.name" :class="{
    'rounded-lg': true,
    'overflow-hidden': true,
    'mt-2': i
  }" style="border:1px solid rgb(203 213 225);">
                <van-cell :title="s.name" :border="false" @click="startWorkTimeSelect({ detail: s })"
                  :data-name="s.key">
                  <van-radio slot="right-icon" :name="s.key" label-position="left" />
                </van-cell>
              </view>
            </van-cell-group>
          </van-radio-group>
        </view>

        <view class="flex my-4">
          <van-button type="default" custom-style="border-radius:0.5rem;" @click="predStep">上一步</van-button>
          <view class="rounded-lg overflow-hidden ml-2 grow">
            <van-button type="info" block @click="onLookResult">查看结果</van-button>
          </view>
        </view>
      </view>
    </block>
    <block v-if="eq(type, LOOK_RESULT)">
      <view class="text-center py-2 text-rose-600">请您分享给他(她)测测！</view>
      <view class="py-2 bg-sky-200 text-center font-medium">工作性价比(计算参考)</view>
      <view class="flex text-center justify-between relative items-center border-slate-500  border-t border-solid"
        style="height: 30px;">
        <view class="grow py-1">低于0.8</view>
        <view class="h-full w-px bg-slate-500 absolute top-0 right-2/4"></view>
        <view class="grow py-1">很惨!!</view>
      </view>
      <view class="flex text-center justify-between relative items-center border-slate-500  border-t border-solid"
        style="height: 30px;">
        <view class="grow py-1">高于1.5</view>
        <view class="h-full w-px bg-slate-500 absolute top-0 right-2/4"></view>
        <view class="grow py-1 ">很爽!!</view>
      </view>
      <view
        class="flex text-center justify-between relative items-center border-slate-500  border-b border-t border-solid"
        style="height: 30px;">
        <view class="grow py-1">高于2.0</view>
        <view class="h-full w-px bg-slate-500 absolute top-0 right-2/4"></view>
        <view class="grow py-1">爽到爆!!</view>
      </view>

      <view class="py-2 bg-sky-200 mt-4 text-center font-medium ">本次工作性价比计算结果</view>
      <view
        class=" flex text-lg text-center justify-between relative items-center border-slate-500  border-b border-t border-solid"
        style="height: 30px;">
        <view class="grow py-1 text-red-500">{{ result }}</view>
        <view class="h-full w-px bg-slate-500 absolute top-0 right-2/4"></view>
        <view class="grow py-1 text-red-500">{{ getResultMessage(result) }}</view>
      </view>
      <view class="my-4">
        <van-button type="info" custom-style="border-radius:0.5rem;margin:0 16px;width:calc(100% - 32px);"
          @click="predStep" block>再测一次</van-button>
      </view>
      <van-button open-type="share" type="default" block
        custom-style="border-radius:0.5rem;margin:0 16px;width:calc(100% - 32px);">分享给好友</van-button>
    </block>
  </view>
</template>
<script>
import { shallowRef, reactive, toRaw, unref, toRefs } from "vue"
import { eq, each, isEmpty, toNumber } from "lodash-es"
import { qualifications, workEnv, oppositeSex, ditto, occupation, startWorkTimes } from "./workEnvironment"
import useActionSheet from "./useActionSheet"
import { computeResult } from "./computeResult"
import { getResultMessage } from "./getResultMessage"
import { computedWork } from "@/api/work/work.js"
import { to } from "await-to-js"
const { default: Notify } = require('../../wxcomponents/vant/notify/notify.js')
const WORK_EARNINGS = 'WORK_EARNINGS',
  START = 'START',
  WORK_ENVIRONMENT = 'WORK_ENVIRONMENT',
  LOOK_RESULT = 'LOOk_RESULT',
  notifyConfig = {
    averageDailyFirewood: '平均日薪还没输入哦',
    workingHours: '工作时长还没输入哦',
    commuteLength: '通勤时长还没输入哦',
    hoursFish: '每天摸鱼时长还没输入哦'
  }

export default {
  props: {
    resultProp: {
      type: String,
      default: '0'
    },
    typeProp: {
      type: String,
      default: START
    }
  },
  setup(props) {
    const { typeProp, resultProp } = toRefs(props)
    console.log(typeProp);
    const type = shallowRef(unref(typeProp))
    const result = shallowRef(toNumber(unref(resultProp)))
    const work = reactive({
      averageDailyFirewood: '',
      workingHours: '',
      commuteLength: '',
      hoursFish: ''
    })

    // 选择学历
    const { selectName, selectValue, show, select, open, close } = useActionSheet(qualifications)
    // 选择工作环境
    const { selectName: workEnvSelectName, selectValue: workEnvSelectValue, show: workEnvShow, select: workEnvSelect, open: workEnvOpen, close: workEnvClose } = useActionSheet(workEnv)
    // 选择异性环境
    const { selectName: oppositeSexSelectName, selectValue: oppositeSexSelectValue, show: oppositeSexShow, select: oppositeSexSelect, open: oppositeSexOpen, close: oppositeSexClose } = useActionSheet(oppositeSex)
    // 选择同事环境
    const { selectName: dittoSelectName, selectValue: dittoSelectValue, show: dittoSexShow, select: dittoSexSelect, open: dittoSexOpen, close: dittoClose } = useActionSheet(ditto)
    // 选择职业资格
    const { selectName: occupationSelectName, selectValue: occupationSelectValue, show: occupationSexShow, select: occupationSelect, open: occupationSexOpen, close: occupationClose } = useActionSheet(occupation)
    // 选择上班时间
    const { selectValue: startWorkTimeSelectValue, select: startWorkTimeSelect } = useActionSheet(startWorkTimes)

    const startTest = (e) => {
      type.value = WORK_EARNINGS
    }

    const chooseavatar = (e) => {
      console.log(e.detail);
    }

    const nextStep = () => {
      const rawWork = toRaw(work)
      console.log(rawWork);
      let isPass = true
      each(notifyConfig, (value, key) => {
        if (!isPass) return
        if (isEmpty(rawWork[key])) {
          isPass = false
          Notify({
            message: value,
            type: 'warning',
          });
        }
      })
      if (isPass) {
        type.value = WORK_ENVIRONMENT
      }
    }

    const predStep = () => {
      type.value = WORK_EARNINGS
    }

    const onLookResult = async () => {
      const actionSheet = {
        ...toRaw(work),
        qualification: unref(selectValue),
        workEnv: unref(workEnvSelectValue),
        oppositeSex: unref(oppositeSexSelectValue),
        ditto: unref(dittoSelectValue),
        occupation: unref(occupationSelectValue),
        startWorkTime: unref(startWorkTimeSelectValue)
      }
      result.value = computeResult(actionSheet)
      type.value = LOOK_RESULT

      await to(computedWork({
        ...actionSheet,
        result: unref(result)
      }))
      uni.$emit('updateWorkRanking')
    }

    const onShareAppMessage = () => {
      let path = 'pages/index/index'
      if (eq(unref(type), LOOK_RESULT)) {
        path = `pages/index/index?resultProp=${unref(result)}&typeProp=${LOOK_RESULT}`
      }
      return {
        title: '我的工作性价比是??,快来测试您的工作性价比吧!',
        path
      }
    }

    const onShareTimeline = () => {
      let query = 'pages/index/index'
      if (eq(unref(type), LOOK_RESULT)) {
        query = `pages/index/index?resultProp=${unref(result)}&typeProp=${LOOK_RESULT}`
      }
      return {
        title: '我的工作性价比是??,快来测试您的工作性价比吧!',
        query
      }
    }

    return {
      chooseavatar,
      onShareTimeline,
      onShareAppMessage,
      getResultMessage,
      result,
      onLookResult,
      predStep,
      qualifications,
      workEnv, oppositeSex, ditto, occupation, startWorkTimes,
      type,
      work,
      WORK_EARNINGS,
      WORK_ENVIRONMENT,
      LOOK_RESULT,
      START,
      eq,
      nextStep,
      startTest,
      show,
      open,
      close,
      select,
      selectName,
      selectValue,
      workEnvSelectName,
      workEnvShow,
      workEnvSelect,
      workEnvOpen,
      workEnvClose,
      oppositeSexSelectName,
      oppositeSexShow,
      oppositeSexSelect,
      oppositeSexOpen,
      oppositeSexClose,
      dittoSelectName,
      dittoSexShow,
      dittoSexSelect,
      dittoSexOpen,
      dittoClose,
      occupationSelectName,
      occupationSexShow,
      occupationSelect,
      occupationSexOpen,
      occupationClose,
      startWorkTimeSelectValue,
      startWorkTimeSelect
    }
  }

}
</script>
