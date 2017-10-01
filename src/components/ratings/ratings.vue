<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings">
      <div class="comScore">
        <div class="score">
          <h1>{{seller.score}}</h1>
          <h2>综合评分</h2>
          <p>高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="attitude">
          <div class="attScore">
            <p class="text">服务态度</p>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="scoresm">{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <p class="text">商品评分</p>
            <star :size="36" :score="seller.foodScore" class="star"></star>
            <span class="scoresm">{{seller.foodScore}}</span>
          </div>
          <div class="timeSend">
            <p class="text">送达时间</p><span>{{seller.deliveryTime}}送达</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :select-type="selectType" :onlyhave-content="onlyhaveContent" @changeType="changeType" @changeOnly="changeOnly"></ratingselect>
      <ul class="userRating">
        <li v-show="showRate(item.rateType, item.text)" v-for="(item, index) in ratings" :key="index">
          <div class="singleRate">
            <div class="userInfo">
              <div class="head"><img :src="item.avatar"></div>
              <div class="userRate">
                <h1 class="username">{{item.username}}</h1>
                <star class="ratingStar" :score="item.score" :size="24"></star>
                <span class="singleSendTime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <p class="rateTime">{{initDate(item.rateTime)}}</p>
            </div>
            <div class="ratingContent">
              <p class="content">{{item.text}}</p>
              <div class="recommends">
                <span :class="{'icon-thumb_up':item.rateType === 0,'icon-thumb_down':item.rateType === 1}"></span>
                <span class="rec" v-for="food in item.recommend">{{food}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import star from '../star/star';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';
  import Bscroll from 'better-scroll';
  import {initTime} from '../../common/js/myScript.js';

  const ALL = 2;

  export default {
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyhaveContent: true
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    created () {
      this.getRatings();
    },
    methods: {
      _initBscroll () {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.ratingsWrapper, {
            click: true
          });
        } else {
          this.scroll.refresh();
        } 
      },
      getRatings () {
        this.$http.get('/api/ratings').then((res) => {
          let data = res.data;
          if (!data.errno) {
            this.ratings = data.data;
            this.$nextTick(() => {
              this._initBscroll();
            });
          }
        }).catch(err => err);
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
  .ratingsWrapper{
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
  }
  .comScore{
    display: flex;
    padding: 18px 0;
  }
  .score{
    text-align: center;
    flex: 0 0 137.5px;
    width: 137.5px;
    border-right: 1px solid rgba(147,153,159,.2);
  }
  .score h1{
    font-size: 24px;
    color: rgb(255,153,0);
    line-height: 28px;
    margin-bottom: 6px;
  }
  .score h2{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 12px;
    margin-bottom: 8px;
  }
  .score p{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 6px;
  }
  .attitude{
    padding: 0 24px;
    font-size: 0;
  }
  .attitude .text{
    display: inline-block;
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
    margin-right: 12px;
  }
  .star{
    display: inline-block;
    vertical-align: top;
  }
  .scoresm{
    font-size: 12px;
    color: rgb(255,153,0);
    line-height: 18px;
  }
  .attScore, .foodScore{
    margin-bottom: 8px;
  }
  .timeSend span{
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 18px;
  }
  .userRating li{
    padding: 0 18px;
  }
  .singleRate{
    padding: 18px 0;
    border-bottom: 1px solid rgba(7,17,27,.1);  
  }
  .head{
    width: 28px;
    height: 28px;
    float: left;
    margin-right: 12px;
  }
  .head img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .userRate{
    float: left;
  }
  .rateTime{
    float: right;
  }
  .userInfo:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
  }
  .username{
    font-size: 10px;
    color: rgb(7,17,27);
    line-height: 12px;
    margin-bottom: 4px;
  }
  .singleSendTime{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 12px;
    font-weight: 200;
  }
  .rateTime{
    font-size: 10px;
    color: rgb(147,153,159);
    font-size: 200;
    line-height: 12px;
  } 
  .ratingContent{
    margin-left: 40px;
    margin-top: 6px;
  }
  .content{
    font-size: 12px;
    line-height: 18px;
    color: rgb(7,17,27);
  }
  .recommends{
    font-size: 0;
    margin-top: 8px;
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
  .rec{
    display: inline-block;
    background: #fff;
    border: 1px solid rgba(7,17,27,.1);
    border-radius: 2px;
    font-size: 9px;
    color: rgb(147,153,159);
    line-height: 16px;
    padding: 6px;
    margin-left: 8px;
    margin-top: 6px;
  }
</style>