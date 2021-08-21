<template>
         <b-col v-show="getOrders" class="border-left" xl="3" lg="4" md="5" sm="12">
             <div class="orders-header w-100 border-bottom bg-light">
                 <h3>Заказы</h3>
             </div>
             <b-container class=" p-3 scrolling">
                 <div class="mt-5 text-center" v-if="!orders.length">
                    <h3 class="text-center">Закажите что-нибудь</h3>
                     <img class="w-75" src="https://thumbs.dreamstime.com/b/order-food-online-man-holding-smartphone-vector-illustration-flat-design-concept-shopping-application-orders-97658871.jpg" alt="">
                 </div>
                 <b-card no-body style="min-width: 100%;" class="border-success mt-2" v-for="(order,index) in orders" :key="index">
                    <b-row no-gutters>
                        <b-col xl="3" lg="3" md="3" sm="3" cols="3" class="d-flex justify-content-center align-items-center"> 
                            <b-card-img :src="order.img" alt="Image" class="w-75"></b-card-img>
                        </b-col>
                        <b-col  cols="5" xl="5" lg="5" md="5" sm="5" class="p-0">
                            <b-card-body>
                                <b-card-group columns>
                                    <b-card-text>{{ order.name }}</b-card-text>
                                    <div class="counter">
                                        <button @click="min(order)" class="min">-</button><div>{{ order.quantity }}</div><button @click="plus(order)" class="plus">+</button>
                                    </div>
                                </b-card-group>
                            </b-card-body>
                        </b-col>
                        <b-col cols="4" xl="4" lg="4" md="4" sm="4" class="p-0">
                            <b-card-body>
                                <b-card-group class=" text-center" columns>
                                    <b-card-text>{{ order.quantity * order.price | numeral('0,0') }} сум</b-card-text>
                                    <div class="w-100 text-center">
                                        <font-awesome-icon icon="trash" @click="removeProduct(order)" class="t-icon"/>
                                    </div>
                                </b-card-group>
                            </b-card-body>
                        </b-col>
                    </b-row>
                 </b-card>
             </b-container>
             <div class="orders-footer w-100 bg-light border-top border-success p-2" v-if="orders.length">
                 <div class=" d-flex justify-content-between w-100">
                     <p>Обслуживание(15%):</p>
                     <p>{{ getService | numeral('0,0') }} сум</p>
                 </div>
                 <div class=" d-flex justify-content-between w-100">
                    <p><b>Общий счет:</b> </p>
                    <p><b>{{ getTotal | numeral('0,0') }}</b> сум</p>
                 </div>
                 <div class="text-center w-100">
                     <b-button v-b-modal.modal1 @click="openModal" variant="success">Закрыть заказ</b-button>
                 </div>
             </div>
             
             <!-- ///////////////////////MODAL WINDOW//////////////////////////////// -->

                <b-modal id="modal1" ref="my-modal" body-class=" p-0" size="fullscreen" hide-header hide-footer title="Extra Large Modal">
                    <b-container fluid class="p-0 main h-100 d-flex flex-md-wrap flex-sm-wrap flex-wrap">
                            <div class=" col-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12"> 
                                <b-container fluid class="d-none flex-wrap d-xl-flex d-lg-flex d-md-flex d-sm-none">
                                    <div class=" w-100 d-flex">
                                        <b-button @click="addNum('7')" class="numbers bg-light text-dark fs-1 m-2">7</b-button>
                                        <b-button @click="addNum('8')" class="numbers bg-light text-dark fs-1 m-2">8</b-button>
                                        <b-button @click="addNum('9')" class="numbers bg-light text-dark fs-1 m-2">9</b-button>
                                    </div>
                                    <div class=" w-100 d-flex">
                                        <b-button @click="addNum('4')" class="numbers bg-light text-dark fs-1 m-2">4</b-button>
                                        <b-button @click="addNum('5')" class="numbers bg-light text-dark fs-1 m-2">5</b-button>
                                        <b-button @click="addNum('6')" class="numbers bg-light text-dark fs-1 m-2">6</b-button>
                                    </div>
                                    <div class=" w-100 d-flex">
                                        <b-button @click="addNum('1')" class="numbers bg-light text-dark fs-1 m-2">1</b-button>
                                        <b-button @click="addNum('2')" class="numbers bg-light text-dark fs-1 m-2">2</b-button>
                                        <b-button @click="addNum('3')" class="numbers bg-light text-dark fs-1 m-2">3</b-button>
                                    </div>
                                    <div class=" w-100 d-flex">
                                        <b-button @click="clear()" class="numbers bg-light text-dark fs-1 m-2">C</b-button>
                                        <b-button @click="addNum('0')" class="numbers bg-light text-dark fs-1 m-2">0</b-button>
                                        <b-button @click="del()" class="numbers bg-light text-dark fs-1 m-2">⟵</b-button>
                                    </div>
                                </b-container>
                            </div>
                            <div class="col h-100 p-3 shadow d-flex flex-column justify-content-between">
                                <header class="text-end">
                                    <font-awesome-icon @click="hideModal" class="times" icon="times" />
                                </header>
                                <div>
                                    <div class="d-flex justify-content-between">
                                        <div><h3>К оплате</h3></div>
                                        <div><h3>{{ getTotal | numeral('0,0') }}</h3></div>
                                    </div>
                                    <div class="d-flex mt-4 justify-content-between h-50">
                                        <div><h4>Сдача</h4></div>
                                        <div><h4>{{ totalPayBack }}</h4></div>
                                    </div>
                                </div>
                                <div>   
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div><h5>Наличными</h5></div>
                                        <b-form-input 
                                            placeholder="0" 
                                            v-model="inCash" 
                                            class="w-50 fs-5"
                                             @focus="onFocusToField('inCash')" 
                                            type="number"></b-form-input> 
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mt-4">
                                        <div><h5>Карточкой</h5></div>
                                        <b-form-input
                                             placeholder="0" 
                                             v-model="byCard" 
                                             class="w-50 fs-5"
                                             @focus="onFocusToField('byCard')" 
                                             type="number"></b-form-input>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between" >
                                    <h5>Распечатать чек</h5>
                                    <switches v-model="isPrint" theme="bulma" type-bold="true" color="blue"></switches>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h5>Перевести через Semurg</h5>
                                    <switches v-model="isNavigateSemurg" theme="bulma" type-bold="true" color="blue"></switches>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-button class="bton cancel" @click="hideModal">Отменить</b-button>
                                    <b-button v-b-modal.success-modal class="bton pay" @click="print">Оплатить</b-button>
                                </div>
                            </div>

                            <b-modal id="success-modal" ref="success-modal" hide-header hide-footer title="Modal with Popover" ok-only>
                                <div>
                                    <b-iconstack font-scale="6" class=" w-100 text-success">
                                        <b-icon stacked icon="circle"></b-icon>
                                        <b-icon stacked icon="check"></b-icon>
                                    </b-iconstack>
                                    <div class="text-center text-success fs-5 mt-3">
                                        <p class=" text-center">Чек закрыт</p>
                                    </div>
                                    <div class="text-center fs-5 mt-4">
                                        <p class=" text-center">Сумма чека {{ getTotal }}</p>
                                    </div>
                                    <div class="text-center fs-5 mt-4">
                                        <p class=" text-center">Сдача {{ totalPayBack }}</p>
                                    </div>
                                    <div class=" text-center p-2">
                                       <b-button class=" rounded mt-5" @click="finish" variant="success">OK, новый заказ</b-button> 
                                    </div>
                                </div>
                            </b-modal>
                    </b-container>
                    <print :printed="print" class="myPrinter" />
                    
                </b-modal>
         </b-col>
</template>

<script>
import print from '../components/print.vue'
import Switches from 'vue-switches';
export default {
    data() {
        return {
            inCash: '',
            byCard: '',
            isPrint: true,
            isNavigateSemurg: false,
            focusInField: '',
            windowWidth: window.innerWidth
        }
    },
    components: {
        Switches,
        print,
    },
    props: {
        orders:{ type: Array },
    },
    computed: {
        getTotal() {
            return this.orders.reduce(function (sum, order) {
            return sum + (order.price * order.quantity) }, 0)
        },
        getService() {
            return (this.getTotal / 100) * 15
        },
        getOrders() {
            return this.$store.getters.getOrders
        },
        totalPayBack() {
                let totalPayBack = (+this.inCash + +this.byCard) - this.getTotal;

                if (totalPayBack < 0)
                    totalPayBack = 0;

                return totalPayBack;
        },
    },
    // watch: {
    //     windowWidth:function(){
    //         if(window.innerWidth < 768){
    //              this.orderRespons = false
    //         }else {
    //             this.orderRespons = true
    //         }
    //     }
    // },
    // mounted() {
    //      window.onresize=()=>{
    //         this.windowWidth = window.innerWidth
    //     }
    // },
    methods: {
        plus(order) {
            order.quantity++;
            order.overall = order.quantity * order.price;
         },
         min(order) {
             order.quantity--;
             order.overall = order.overall - order.price;
             if(order.quantity <= 0) {
               this.orders.splice(this.orders.indexOf(order), 1);
               order.quantity = '';
                this.$toast.open({
                    message: "Удалено: " + order.name,
                    type: "warning",
                    duration: 1000,
                    position: 'top-right',
                    dismissible: true
                })
             } 
         },
         onFocusToField(field) {
            this.focusInField = field;
        },
        onInputNumeric(key) {
            if (this.focusInField && this.focusInField === 'bycard') {
                this.Sale.byCard.Value = String(this.Sale.PaymentCardCurrencyValue.Value + key).slice(0);
            }
        },
         removeProduct(order) {
             this.orders.splice(this.orders.indexOf(order), 1);
             order.quantity = '';
             this.$toast.open({
                message: "Удалено: " + order.name,
                type: "warning",
                duration: 1000,
                position: 'top-right',
                dismissible: true
             })
         },
        addNum(num) {
            if (this.focusInField && this.focusInField === 'byCard') {
                this.byCard = String(this.byCard + num).slice(0);
            } else {
                this.inCash = String(this.inCash + num).slice(0);
            }
        },
        clear() {
            if (this.focusInField && this.focusInField === 'byCard')  {
                this.byCard = '';
            }  else {
                this.inCash = '';
            }
        },
        del() {
            if (this.focusInField && this.focusInField === 'byCard') {
                this.byCard = this.byCard.slice(0, this.byCard.length - 1);
            } else {
                this.inCash = this.inCash.slice(0, this.inCash.length - 1);
            }
		},
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        openModal() {
            this.$refs['my-modal'].show()
        },
        print() {
            if(this.isPrint === true){
                // this.$htmlToPaper('printHtml');
                window.print();
            }
        },
        finish() {
            this.orders = '';
            this.$refs['my-modal'].hide()
        }
    }
}
</script>

<style scoped>
    .orders-header {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .orders-footer {
        height: 140px;
    }
    .counter {
        display: flex;
        width: 100px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
        background: rgb(239, 239, 239);
        border-radius: 25px;
    }
    .plus {
        border-radius: 0px 25px 25px 0px;
        font-size: 1.2rem;
        border: none;
    }
    .min {
        border-radius: 25px 0px 0px 25px;
        font-size: 1.2rem;
        border: none;
    }
    .jcsb {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .scrolling {
        min-width: 100%;
        height: calc(100vh - 220px);
        overflow-y: auto;
    }
    .scrolling::-webkit-scrollbar {
        background-color: #fff;
        border-radius: 9px;
        width: 5px;
        height: 8px;
    }
    .scrolling::-webkit-scrollbar-thumb {
        background: rgb(193,193,193);
        border-radius: 9px;
        background-clip: content-box;
    }

    .t-icon {
        margin: 0 5px;
        cursor: pointer;
    }
    .t-icon:hover {
        color: red;
        animation: trash 0.2s 2 alternate;
        cursor: pointer;
    }
    @keyframes trash {
        25% {
            transform: rotate(20deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-20deg);
        }
    }
    .numbers {
        width: 30%;
        height: 22vh;
        display: flex;
        border-radius: 30px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .times {
        cursor: pointer;
        font-size: 2rem;
    }
    .bton {
        padding: 16px 48px;
        font-size: 1.5rem;
        border-radius: 50px;
    }
    .pay {
        background: rgb(20,83,136);
        border: none;
    }
    .cancel {
        background: rgb(236, 236, 236);
        border: none;
        color: #000;
    }
    .pay:hover {
        background: rgb(14, 63, 100);
    }
    .cancel:hover {
        background: rgb(220, 220, 220);
        color: #000;
    }
    .main {
        display: flex;
    }
    .myPrinter {
        display: none;
    }
    @media print {
        .myPrinter {
            display: block;
        }
        .main {
            display: none !important;
        }
    }

    @media only screen and (max-width: 767px) and (min-width: 200px) {
        .scrolling {
            height: calc(100vh - 270px);
        }
    }
    @media only screen and (max-width: 600px) {
        .bton {
            padding: 10px 28px;
            font-size: 1.3rem;
            border-radius: 50px;
        }
    }
    @media only screen and (max-width: 450px) {
        .bton {
            padding: 10px 25px;
            font-size: 1.1rem;
            border-radius: 50px;
        }
    }
</style>