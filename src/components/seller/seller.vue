<template>
  <div class="sellerWrapper" ref="sellerWrapper">
    <div class="seller">
      <div class="head">
        <div class="sellerInfo clearfix">
          <div class="info">
            <h1>{{seller.name}}</h1>
            <star :size="36" :score="seller.score" class="sellerStar"></star>
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span>月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect" @click="follow">
            <span class="icon-favorite" :class="isfollow === true ? 'icon-favorite-yes':'icon-favorite-no'"></span>
            <span class="text">{{followdesc}}</span>
          </div>
        </div>
        <div class="moneyTime">
          <div class="minPrice sellInfoBox">
            <p>起送价</p>
            <span class="main">{{seller.minPrice}}</span>
            <span class="super">元</span>
          </div>
          <div class="deliveryPrice sellInfoBox">
            <p>商家配送</p>
            <span class="main">{{seller.deliveryPrice}}</span>
            <span class="super">元</span>
          </div>
          <div class="deliveryTime sellInfoBox">
            <p>平均配送时间</p>
            <span class="main">{{seller.deliveryTime}}</span>
            <span class="super">分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="content">
        <div class="notice">
          <h1>公告与活动</h1>
          <p>{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supportsList">
          <li class="list-item" v-for="(item,index) in seller.supports" :key="index">
            <span class="itemIcon" :class="supportsType[seller.supports[index].type]"></span>
            <span class="item-text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="scene">
        <h1>商家实景</h1>
        <div class="picWrapper" ref="picWrapper">
          <ul class="picList" ref="picList">
            <li class="itemList" v-for="item in seller.pics"><img :src="item" width="120" height="90"></li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infoBox">
        <h1>商家信息</h1>
        <ul class="infoList">
          <li v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import star from '../star/star';
  import split from '../split/split';
  import Bscroll from 'better-scroll';
  export default {
    data () {
      return {
        supportsType: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        isfollow: false,
        followdesc: '收藏'
      };
    },
    props: {
      seller: Object
    },
    components: {
      star,
      split
    },
    watch: {
      seller (val) {
        this._initBscroll_1();
        this._initBscroll_2();
      },
      isfollow (val) {
        if (val === true) {
          this.followdesc = '已收藏';
        } else {
          this.followdesc = '收藏';
        }
      }
    },
    created () {
      this._initBscroll_1(); 
      this._initBscroll_2();
    },
    methods: {
      _initBscroll_1 () {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.sellerWrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      _initBscroll_2 () {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$nextTick(() => {
            document.getElementsByClassName('picList')[0].width = width + 'px';
            if (!this.scroll2) {
              this.scroll2 = new Bscroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.scroll2.refresh();
            }
          });
        }
      },
      follow () {
        this.isfollow = !this.isfollow;
      }
    }
  };
</script>
<style scoped>
  .sellerWrapper{
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
  }
  .head,.content{
    padding: 0 18px;
  }
  .sellerInfo{
    padding: 18px 0;
    width: 100%;
    border-bottom: 1px solid rgba(7,17,27,.1);
    font-size: 0;
  }
  h1{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .info span{
    font-size: 10px;
    color: rgb(77,85,93);
    line-height: 18px;
    display: inline-block;
  }
  .sellerStar{
    display: inline-block;
    vertical-align: top;
  }
  .ratingCount{
    margin-right: 12px;
    margin-left: 4px;
  }
  .icon-favorite{
    font-size: 24px;
    line-height: 24px;
  }
  .icon-favorite-no{
    color: rgb(77,85,93);
  }
  .icon-favorite-yes{
    color: rgb(240,20,20);
  }
  .collect .text{
    font-size: 10px;
    color: rgb(77,85,93);
    line-height: 10px;
    margin-top: 4px;
  }
  .collect span{
    display: block;
  }
  .info{
    float: left;
  }
  .collect{
    float: right;
    width: 50px;
    text-align: center;
  }
  .moneyTime{
    display: flex;
    padding: 18px 0;
  }
  .deliveryPrice{
    border-left: 1px solid rgba(7,17,27,.1);
    border-right: 1px solid rgba(7,17,27,.1); 
  }
  .sellInfoBox{
    flex: 1;
    text-align: center;
    font-size: 0;
  }
  .moneyTime p{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 8px;
  }
  .moneyTime span{
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 24px;
  }
  .main{
    font-size: 24px;
  }
  .super{
    font-size: 10px;
  }
  .notice{
    padding-top: 18px;
  }
  .notice p{
    font-size: 12px;
    font-weight: 200;
    color: rgb(240,20,20);
    line-height: 24px;
    margin-bottom: 16px;
    padding: 0 12px;
  }
  .itemIcon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .decrease{
    background-image: url('./decrease_2@2x.png');
  }
  .discount{
    background-image: url('./discount_2@2x.png');
  }
  .guarantee{
    background-image: url('./guarantee_2@2x.png');
  }
  .invoice{
    background-image: url('./invoice_2@2x.png');
  }
  .special{
    background-image: url('./decrease_2@2x.png');
  }
  .list-item{
    border-top: 1px solid rgba(7,17,27,.1); 
    padding: 16px 0;
    margin-left: 12px;
    font-size: 0;
  }
  .item-text{
    font-size: 12px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 16px;
  }
  .scene{
    padding: 18px;
  }
  .picWrapper{
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }
  .picList{
    font-size: 0;
    width: 498px;
  }
  .itemList{
    display: inline-block;
    width: 120px;
    height: 90px;
    margin-right: 6px;
  }
  .itemList:last-child{
    margin-right: 0;
  }
  .scene h1{
    margin-bottom: 12px;
  }
  .infoBox{
    padding: 18px;
  }
  .infoBox h1{
    margin-bottom: 12px;
  }
  .infoList li{
    padding: 16px 12px;
    border-top: 1px solid rgba(7,17,27,.1);
    font-size: 12px;
    color: rgb(7,17,27);
    font-weight: 200;
    line-height: 16px;
  }
</style>