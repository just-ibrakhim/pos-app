<template>
        <footer class="BottomNav row position-absolute bottom-0 bg-light shadow">
                <b-col cols="4" :class="$store.state.barRespons ? 'isClicked' : ''" @click="showBar()" class=" btn border">Столы</b-col>
                <b-col cols="4" :class="$store.state.menuRespons  ? 'isClicked' : ''" @click="showMenu()" class=" btn border">Меню</b-col>
                <b-col cols="4" :class="$store.state.orderRespons  ? 'isClicked' : ''" @click="showOrders()" class=" btn border">Заказы</b-col>
        </footer>
</template>

<script>
import { mapState , mapMutations } from 'vuex';
export default {
    data() {
        return {
            isClicked: false,
            windowWidth: window.innerWidth
        }
    },
    computed: mapState([
        'barRespons',
        'menuRespons',
        'orderRespons',
    ]),
    methods: mapMutations([
        'showBar',
        'showMenu',
        'showOrders',
    ]),
    mounted() {
        if(this.windowWidth < 768) {
            this.showBar();
        } else {
            console.log("Error")
        }
    }
}
// mapMutations([
//     'showBar'
// ])
</script>

<style scoped>
    .BottomNav {
        min-width: 100%;
        height: 50px;
        display: none;
        margin: 0;
    }
    .isClicked {
        background: #00022e !important;
        color: #fff !important;
        font-size: 1.3rem !important;
    }

    @media only screen and (max-width: 767px) and (min-width: 200px) {
        .BottomNav {
            display: flex;
        }
    }
</style>