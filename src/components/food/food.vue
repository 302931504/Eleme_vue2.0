<template>
  <div class="food" v-show="showFlag" ref="foodWrapper">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="backGoods"><i class="icon-arrow_lift"></i></div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
        </div>
        <div class="buy-wrapper">
          <cartbutton :food="food" v-show="food.count&&food.count !== 0"></cartbutton>
          <div class="buy" v-show="!food.count || food.count === 0" @click.stop="addFirst">加入购物车</div>
        </div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="infoTitle">商品介绍</h1>
        <p class="infoText">{{food.info}}</p>
      </div>
      <split v-show="food.info"></split>
      <div class="rating">
        <h1 class="ratinTitle">商品评价</h1>
        <ratingselect :desc="desc" :ratings="food.ratings" :select-type="selectType" :onlyhave-content="onlyhaveContent"
        @changeType="changeType" @changeOnly="changeOnly"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings">
            <li v-show="showRate(item.rateType, item.text)" v-for="item in food.ratings" class="rating-item">
              <div class="user">
                <span class="username">{{item.username}}</span>
                <img :src="item.avatar" class="avatar" width="12" height="12">
              </div>
              <div class="time">{{initDate(item.rateTime)}}</div>
              <p class="rateText">
                <span :class="{'icon-thumb_up':item.rateType === 0,'icon-thumb_down':item.rateType === 1}"></span>
                {{item.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll';
  import cartbutton from '../cartbutton/cartbutton';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';
  import Vue from 'vue';
  import {initTime} from '../../common/js/myScript.js';

  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        selectType: ALL,
        onlyhaveContent: false
      };
    },
    components: {
      cartbutton,
      split,
      ratingselect
    },
    methods: {
      show () {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.foodWrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      backGoods () {
        this.showFlag = false;
      },
      addFirst () {
        Vue.set(this.food, 'count', 1);
      },
      showRate (type, text) {
        if (this.onlyhaveContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      changeType (type) {
        this.selectType = type;
      },
      changeOnly (value) {
        this.onlyhaveContent = value;
      },
      initDate (time) {
        return initTime(time);
      }
    }
  };  
</script>
<style scoped>
  .food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
  }  
  .image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  .image-header img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .back{
    position: absolute;
    top: 10px;
    left: 0;
  }
  .icon-arrow_lift{
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }
  .content{
    position: relative;
    padding: 18px;
  }
  .title{
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
  }
  .detail{
    margin-bottom: 18px;
    line-height: 18px;
    font-size: 0;
    height: 10px;
  }
  .sell-count, .rating{
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .sell-count{
    margin-right: 12px;
  }
  .price{
    font-weight: 700;
    line-height: 24px;
  }
  .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
  .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .buy-wrapper{
    position: absolute;
    right: 18px;
    bottom: 18px;
  }
  .buy{
    z-index: 10;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    color: #fff;
    border-radius: 12px;
    background: rgb(0,160,220);
  }
  .info{
    padding: 18px;
  }
  .infoTitle{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .infoText{
    padding: 0 8px;
    line-height: 24px;
    font-size: 12px;
    color: rgb(77,85,93);
  }
  .rating{
    padding-top: 18px;
  }
  .ratinTitle{
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .rating-wrapper{
    padding: 0 18px;
  }
  .rating-item{
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7,17,27,.1);
  }
  .user{
    position: absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
    font-size: 0;
  }
  .username{
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147,153,159);
    margin-right: 6px;
  }
  .avatar{
    border-radius: 50%
  }
  .time{
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .rateText{
    line-height: 16px;
    font-size: 12px;
    color: rgb(7,17,27);
  }
  .icon-thumb_up, .icon-thumb_down{
    line-height: 16px;
    margin-right: 4px;
    font-size: 12px;
  }
  .icon-thumb_up{
    color: rgb(0,160,220);
  }
  .icon-thumb_down{
    color: rgb(147,153,159);
  }
  .no-rating{
    font-size: 12px;
    color: #000;
  }
</style>