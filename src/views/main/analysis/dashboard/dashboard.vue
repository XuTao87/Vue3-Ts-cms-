<template>
  <div id="dashboard">
    <el-row :gutter="20" class="twos">
      <el-col
        :span="6"
        v-for="(item, index) in addMount"
        :key="index"
        class="ell"
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #ffff;
            height: 100px;
            padding: 0 20px;
          "
        >
          <div style="text-align: start">
            <div style="margin-bottom: 10px">{{ item?.titie }}</div>
            <div style="font-size: 30px">{{ item?.number1 }}</div>
          </div>
          <div>
            <el-icon size="50">
              <component
                :is="item?.icon"
                :style="{ color: item?.color }"
              ></component>
            </el-icon>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="ones">
      <el-col :span="7">
        <Hycard title="分类商品数量(饼图)">
          <PieEchart :pieData="categotyGoodsCount"></PieEchart> </Hycard
      ></el-col>
      <el-col :span="10"
        ><Hycard title="不同城市商品销量">
          <MapEchart :mapData="addressGoodsSale"></MapEchart> </Hycard
      ></el-col>
      <el-col :span="7"
        ><Hycard title="分类商品数量(玫瑰图)">
          <RoseEchart :roseData="categotyGoodsCount"></RoseEchart> </Hycard
      ></el-col>
    </el-row>
    <el-row :gutter="20" class="martop">
      <el-col :span="12"
        ><Hycard title="不同城市商品销量">
          <LineEchart v-bind="categoryGoodsSale"></LineEchart> </Hycard
      ></el-col>
      <el-col :span="12"
        ><Hycard title="收藏量排行榜">
          <BarEchart v-bind="categoryGoodsFavor"></BarEchart> </Hycard
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Hycard from '@/base-ui/card'
import { useStore } from '@/store'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echart/index'
export default defineComponent({
  name: 'dashboard',
  components: {
    Hycard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    // eslint-disable-next-line vue/no-unused-components
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboarModule/getDashboarDataAction')
    const categotyGoodsCount = computed(() => {
      return store.state.dashboarModule.categoryGoodsCount.map((v) => {
        return { name: v.name, value: v.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboarModule.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboarModule.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboarModule.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    const addMount = computed(() => {
      return store.state.dashboarModule.amount.map((v) => {
        if (v.title === '商品总销量') {
          return {
            icon: 'TrendCharts',
            color: '#5dc9c6',
            titie: v.title,
            number1: v.number1
          }
        } else if (v.title === '商品总收藏') {
          return {
            icon: 'Star',
            color: '#50a3f8',
            titie: v.title,
            number1: v.number1
          }
        } else if (v.title === '商品总库存') {
          return {
            icon: 'HomeFilled',
            color: '#e9536d',
            titie: v.title,
            number1: v.number1
          }
        } else if (v.title === '商品总销售额') {
          return {
            icon: 'Handbag',
            color: '#52bea2',
            titie: v.title,
            number1: v.number1
          }
        }
      })
    })

    return {
      categotyGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale,
      addMount
    }
  }
})
</script>

<style scoped lang="less">
.martop {
  // margin-top: 20px;
  // border-top: 20px solid #eff1f4 !important;
  background-color: #eff1f4;
}
.ones {
  border-top: 20px solid #eff1f4 !important;
  background-color: #eff1f4;
}
.twos {
  background-color: #eff1f4;
}
.ww {
  padding: 10px 20px !important;

  // background-color: #ffff;
}
.el-icon {
  transition: all 0.3s linear !important;
}
.ell {
  cursor: pointer;
}
.ell:hover .el-icon {
  transform: scale(1.5) !important;
}
</style>
