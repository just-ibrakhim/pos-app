<template>
    <b-col v-show="getMenu" xl="8" lg="7" md="6" sm="12" cols="12" class="h-100 bg-light">
        <div class="first-block">
                <div class="first-block-header border-bottom">
                    <h2><b>Меню</b></h2>
                    <b-input-group class="w-50">
                            <b-form-input v-model.trim="search" placeholder="Поиск...."></b-form-input>
                            <b-button class=" bg-light text-dark border" @click="search=''">
                                <font-awesome-icon icon="times" />
                            </b-button>
                    </b-input-group>
                </div>
                <div>
               <div class="first-block-footer h-75 p-xl-0 p-lg-2 p-md-2 p-sm-2 p-2">
                    <b-card
                        class="card w-50 text-center m-xl-3 m-lg-2 m-md-2 m-sm-2 m-2 border-1 border-success pointer" 
                        style="min-width: 110px; height: 110px;"
                        :class="{isActive: null === activeItem}"
                        @click="allProd()"
                        >
                        <b-card-img
                            class="w-50 h-50"
                            src="https://cdn.onlinewebfonts.com/svg/img_318548.png" top>
                        </b-card-img>
                        <b-card-text class="h-50 w-100 d-flex align-items-center justify-content-center">
                            Все категории
                        </b-card-text>
                    </b-card>
                    <b-card
                        v-for="(tabs, index) in products" :key="index"
                        :class="{isActive: index === activeItem}"
                        class="card text-center m-xl-3 m-lg-2 m-md-2 m-sm-2 m-2 border-1 border-success pointer" 
                        style="min-width: 110px; height: 110px;"
                        @click="setTab(tabs,index)"
                        >
                        <b-card-img
                            class="w-50 h-50"
                            :src="tabs.img" top>
                        </b-card-img>
                        <b-card-text class="h-50 w-100 d-flex align-items-center justify-content-center">
                            {{ tabs.title }}
                        </b-card-text>
                    </b-card>
                </div>
            </div>
        </div>
        <b-container class="second-block p-xl-3 p-lg-2 p-sm-3 p-3 p-md-2 w-100 d-flex flex-wrap">  
             <b-card-group deck class="d-flex flex-wrap" v-for="(item,index) in searchHandler" :key="index">
                  <b-card
                        tag="article"
                        class="product-card m-xl-3 m-lg-3 m-md-2 m-sm-2 m-1 text-center border-1 border-success pointer"
                        @click="addItem(item)"
                        >
                            <b-card-img class="resp-img w-50" :src="item.img" alt="Image"></b-card-img>
                            <b-card-text class="h-50 d-flex align-items-center justify-content-center">
                                {{ item.name }} <br>
                                {{ item.price | numeral('0,0') }} сум
                            </b-card-text>
                            <template #footer>
                                <b-button class="w-100 bg-success border-0" variant="primary">
                                    Добавить
                                    <span v-if="item.quantity">({{ item.quantity }})</span>
                                </b-button>
                            </template>
                    </b-card>
             </b-card-group>
             <div v-if="!searchHandler.length" class="isFound w-100 d-flex justify-content-center">
                <img src="https://blog.makuno.co.ke/img/search_error.png" alt="">
             </div>
        </b-container>
    </b-col>
</template>

<script>
import products from '/Data/products'
import _ from "lodash"
export default {
    name: 'Menu',
    data() {
        return {
            products,
            orders: [],
            isActive: null,
            category: [],
            search: '',
            activeItem: '',
            windowWidth: window.innerWidth
        }
    },
    beforeMount(){
        this.allProd()
    },
    computed: {
        searchHandler() {
              return this.category.filter(item => {
                return item.name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        getMenu() {
            return this.$store.getters.getMenu
        }
    },
    watch: {
        windowWidth:function(){
            if(window.innerWidth < 768 ){   
                 this.menuRespons = false
            }else {
                this.menuRespons = true
            }
        }
    },
    mounted() {
         window.onresize=()=>{
            this.windowWidth = window.innerWidth
        }
    },
    methods: {
        addItem(item) {
            item.quantity++;
            this.orders.push(item);
            this.orders = [ ...new Set(this.orders)];
            this.$emit('dataChanged',this.orders);
            this.$toast.open({
                message: "Добавлено: " + item.name,
                type: "success",
                duration: 1000,
                position: 'top-right',
                dismissible: true
            })
        },
        setTab(tabs,index) {
            let vm = this;
            vm.category = tabs.items;
            this.isActive = true
            this.activeItem = index
            this.search = ''
        },
        
        allProd(){
            this.activeItem = null;
            this.category = []
            _.each(products,el=>{
                _.each(el.items,e=>{
                    this.category.push(e)
                })
            })
            this.search = '';
        },
    }
}
</script>

<style scoped>
    .first-block {
        width: 100%;
        height: 230px;
        padding: 0 20px;
        border-bottom: 1px solid #000;
    }
    .first-block-header {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .first-block-footer {
        width: 100%;
        display: flex;
        align-items: center;
        height: 120px;
        overflow: auto;
    }
    .first-block-footer::-webkit-scrollbar  {
        background-color: #f8f9fa;
        border-radius: 9px;
        width: 5px;
        height: 5px;
    } 
    .first-block-footer::-webkit-scrollbar-thumb {
        background: rgb(193,193,193);
        border-radius: 9px;
        background-clip: content-box;
    }
    .pointer {
        cursor: pointer;
    }
    .isActive {
        background: green;
        color: #fff;
    }
    .product-card {
        max-width: 10rem;
    }
    /* ////////////////////////////////////////// */

    .second-block {
        min-width: 100%;
        max-height: calc(100vh - 230px);
        overflow-y: auto;
    }
    .second-block::-webkit-scrollbar {
        background-color: #f8f9fa;
        border-radius: 9px;
        width: 5px;
        height: 8px;
    }
    .second-block::-webkit-scrollbar-thumb {
        background: rgb(193,193,193);
        border-radius: 9px;
        background-clip: content-box;
    }

    @media only screen and (max-width: 767px) and (min-width: 200px) {
        .second-block {
            max-height: calc(100vh - 280px);
        }
        .first-block {
            padding: 0 10px;
        }
    }
    @media only screen and (max-width: 500px) {
        .second-block {
            justify-content: space-between !important;
        }
    }
    @media only screen and (max-width: 372px) {
        .product-card {
            max-width: 100%;
            display: inline !important;
        }
    }
</style>