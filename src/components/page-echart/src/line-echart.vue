<template>
  <div>
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
import { IDataType } from '../types'
const props = defineProps<{
  xLabels: string[]
  values: any[]
}>()
const options = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
