<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2)" class="block positive" :class="{'positive-active':selecttype ===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'positive-active':selecttype ===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'negative-active':selecttype ===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{'switch-on':onlyhavecontent}">
      <span @click="toggleContent" class="icon-check_circle"></span>
      <span class="text">只看内容评价</span>
    </div>
  </div>
</template>
<script>
  const POSITIVE = 0;
  const NEGATIVE = 1; 
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyhaveContent: false
    },
    data () {
      return {
        selecttype: this.selectType,
        onlyhavecontent: this.onlyhaveContent
      };
    },
    computed: {
      positive () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negative () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select (type) {
        this.selecttype = type;
        this.$emit('changeType', type);
      },
      toggleContent () {
        this.onlyhavecontent = !this.onlyhavecontent;
        this.$emit('changeOnly', this.onlyhavecontent);
      }
    }
  };
</script>
<style scoped>
  .rating-type{
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7,17,27,.1);
    font-size: 0;
  }
  .block{
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    color: rgb(77,85,93);
    font-size: 12px;
  }
  .count{
    font-size: 8px;
    margin-left: 2px;
    line-height: 16px;
  }
  .positive{
    background: rgba(0,160,220,.2);
  } 
  .positive-active{
    background: rgb(0,160,220);
    color: #fff;
  }
  .negative{
    background: rgba(77,85,93,.2);
  }  
  .negative-active{
    background: rgb(77,85,93);
    color: #fff;
  } 
  .switch{
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27,.1);
    color: rgb(147,153,159);
    font-size: 0;
  }
  .icon-check_circle{
    font-size: 24px;
    margin-right: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .switch-on .icon-check_circle{
    color: #00c850;
  }
  .text{
    font-size: 12px;
  }
</style>