<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectList(index, $event)">
          <span class="text"><span class="icon" v-show="item.type > 0" :class="supportsType[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <span class="item-title">{{item.name}}</span>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="clickFood(food)">
              <div class="foodicon"><img :src="food.icon" width="57" height="57"></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
                </div>
                <div class="cartButton-wrapper">
                  <cartbutton :food="food" v-on:cartAdd="_drop"></cartbutton>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- <shopcart ref="shopcart" :foods-list="foodsList" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart> -->
    <food :food="selectedFood" ref="foodTarget"></food>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartbutton from '../cartbutton/cartbutton';
  import food from '../food/food';
  import bus from '../../common/js/bus.js';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        listHeightValue: 0,
        selectedFood: {}
      };
    },
    components: {
      shopcart,
      cartbutton,
      food
    },
    created () {
      this.$http.get('/api/goods').then(res => {
        let data = res.data;
        if (!data.errno) {
          this.goods = data.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      }).catch(err => err);
      this.supportsType = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    watch: {
      foodsList () {
        bus.$emit('get-list', this.foodsList);
      }
    },
    computed: {
      currentIndex () {
        let i = 0; 
        while (i < this.listHeight.length) {
          i++;
          let height1 = this.listHeight[i - 1];
          let height2 = this.listHeight[i];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i - 1;
          }
        }
        return 0;
      },
      foodsList () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      clickFood (food) {
        this.selectedFood = food;
        this.$refs.foodTarget.show();
      },
      _drop (target) {
        bus.$emit('send-target', target);
      },
      _initScroll () {
        this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new Bscroll(this.$refs.foodWrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        let i = 0; 
        while (i < foodList.length) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
          i++;
        }
      },
      selectList (index, ev) {
        if (!ev._constructed) {
          return;
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      }
    }
  };
</script>
<style scoped>
  .goods{
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
  }
  .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;

  }
  .foods-wrapper{
    flex: 1;  
  }
  .menu-item{
    display: table;
    height: 50px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
  }
  .icon{
    display: inline-block;
    vertical-align: top;
    width: 14px;
    height: 14px;
    margin-right: 2px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .decrease{
    background-image: url('./decrease_3@2x.png');
  }
  .discount{
    background-image: url('./discount_3@2x.png');
  }
  .guarantee{
    background-image: url('./guarantee_3@2x.png');
  }
  .invoice{
    background-image: url('./invoice_3@2x.png');
  }
  .special{
    background-image: url('./decrease_3@2x.png');
  }
  .text{
    font-size: 12px;
    display: table-cell; 
    width: 56px;
    vertical-align: middle;
    border-bottom: 1px solid rgba(7,17,27,.1);
  }
  .item-title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    background: #f3f5f7;
  }
  .food-item{
    display: flex;
    margin: 18px;
    position: relative;
    padding-bottom: 18px;
  }
  .food-item:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7,17,27,.1);
    content: '';
    width: 100%;
  }
  .food-item:after:last-child{
    display: none; 
  }
  .food-item:last-child{
    margin-bottom: 0;
  }
  .foodicon{
    flex: 00 57px;
    margin-right: 10px;
  }
  .content{
    flex: 1;
  }
  .name{
    font-size: 14px;
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    color: rgb(7,17,27);
  }
  .desc,.extra{  
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .desc{
    margin-bottom: 8px;
    line-height: 14px;
  }
  .extra .count{
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
  .current{
    position: relative;
    margin-top: -1px;
    z-index: 10;
    font-weight: 700;
    background: #fff;
  }
  .cartButton-wrapper{
    position: absolute;
    right: 0;
    bottom: 12px;
  }
</style>