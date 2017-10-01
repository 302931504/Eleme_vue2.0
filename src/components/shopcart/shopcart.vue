<template>
  <div class="cart">
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'logoLight':totalCount > 0}"><span class="icon-shopping_cart" :class="{'priceLight':totalCount > 0}"></span></div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'priceLight':totalCount > 0}">￥ {{totalPrice}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{'enough':totalPrice >= 20}" @click.stop="payMoney">{{payDesc}}</div>
        </div>
        <div class="ball-container">
          <transition name="drop" v-for="(ball,index) in balls" :key="index" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
        <transition name="slide">
          <div class="shopcart-list" v-show="listshow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
              <ul>
                <li class="food" v-for="(food, index) in foodsList" :key="index">
                  <span class="name">{{food.name}}</span>
                  <div class="price2">
                    <span>￥{{food.price * food.count}}</span>
                  </div>
                  <div class="cartButton"><cartbutton :food="food"></cartbutton></div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>  
    <transition tag="div" name="mask">
      <div class="list-mask" v-show="listshow"></div>
    </transition>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'; 
  import cartbutton from '../cartbutton/cartbutton';
  import bus from '../../common/js/bus.js';
  export default {
    props: {
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          }, 
          {
            show: false
          }, 
          {
            show: false
          }, 
          {
            show: false
          }, 
          {
            show: false
          }
        ],
        dropball: [],
        fold: true,
        foodsList: []
      };
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.foodsList.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.foodsList.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}起送`;
        } else {
          return `立即结算`;
        }
      },
      listshow () {
        if (!this.totalCount || this.fold) {
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return true;
      }
    },
    created () {
      this.drop();
      bus.$on('get-list', (list) => {
        this.foodsList = list;
      });
    },
    methods: {
      drop () {
        bus.$on('send-target', (el) => {
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) {
              ball.show = true;
              ball.el = el;
              this.dropball.push(ball);
              return;
            }
          }
        });  
      },
      beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = 'block';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3D(0, 0, 0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterEnter (el) {
        let ball = this.dropball.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList () {
        this.fold = !this.fold;
      },
      empty () {
        this.foodsList.forEach((food) => {
          food.count = 0;
        });
      },
      payMoney () {
        window.alert('嘻嘻^_^……');
      }
    },
    components: {
      cartbutton
    }
  };
</script>
<style scoped>
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background: #000;
  }    
  .content{
    display: flex;
    background: #141d27;
    font-size: 0;
  }
  .content-left{
    flex: 1; 
  }
  .logo-wrapper{
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 6px;
    padding: 6px;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%; 
    background: #141d27;
    z-index: 4;
  }
  .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
  }
  .icon-shopping_cart{
    font-size: 24px;
    color: #80858a;
    line-height: 44px;
  }
  .price, .desc{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    color: rgba(255,255,255,.4);
  }
  .price{
    margin-top: 12px; 
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255,255,255,.1);
    font-size: 16px;
    font-weight: 700;  
  }
  .desc{
    margin: 12px 0 0 12px;
    font-size: 10px;
  }
  .content-right{
    flex: 0 0 105px;
    width: 105px;
  }
  .pay{
    font-size: 12px;
    line-height: 48px; 
    height: 48px;
    text-align: center;
    color: rgba(255,255,255,.4);
    font-weight: 700;
    background: #2b333b;
  }
  .num{
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
  }
  .logoLight{
    background: rgb(0,160,220);
  }
  .priceLight{
    color: #fff;
  }
  .enough{
    background: #00b43c;
    color: #fff;
  }
  .ball-container{

  }
  .ball{
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
  .inner{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(0,160,220);
    transition: all .6s;
  }
  .shopcart-list{
    position: absolute;
    bottom: 47px;
    left: 0;
    z-index: 3;
    width: 100%; 
    background: #000;
  }
  .list-header{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,.1);
  }
  .title{
    float: left;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .empty{
    float: right;
    font-size: 12px;
    color: rgb(1,160,220);
  }
  .list-content{
    padding: 0 18px;
    max-height: 217px;
    background: #fff;
    overflow: hidden;
  }
  .food{
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border: 1px solid rgba(7,17,27,.1);
  }
  .name{
    line-height: 24px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .price2{
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240,20,20);
  }
  .cartButton{
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(7,17,27,.6);
  }
  .mask-enter-active, .mask-leave-active {
    transition: opacity .8s;
  }
  .mask-enter, .mask-leave-to {
    opacity: 0;
  }
  .slide-transition{
    transition: all .6s;
    transform: translateY(-100%);
  }
  .slide-enter{
    transform: translateY(0);
  }
</style>