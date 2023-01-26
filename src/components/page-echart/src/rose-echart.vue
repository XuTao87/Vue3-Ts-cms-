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
  roseData: IDataType[]
}>()
const options = computed(() => {
  return {
    legend: {
      orient: 'horizontal'
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
