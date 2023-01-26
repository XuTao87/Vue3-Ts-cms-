<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import userEchat from '../hooks/useEchart'
const echartDivRef = ref<HTMLElement>()

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

onMounted(() => {
  const { setOption } = userEchat(echartDivRef.value!)
  setOption(props.options)
  watchEffect(() => {
    setOption(props.options)
  })
})
</script>

<style scoped></style>
