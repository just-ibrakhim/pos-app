<template>
    <b-col v-if="getBar" lg="1" md="1" sm="12" cols="12" class="d-xl-flex d-lg-flex d-md-flex"> 
        <div class="bar bg-dark">
            <div class="logo text-light">
                <h5>{{ tableName }}</h5>
            </div>
            <div class="tables">
                <div
                    v-for="table in tables" :key="table.id">
                    <b-link
                        @click="showName(table)"
                        class="btn btn-secondary table-btn b-avatar">{{ table.title }}
                    </b-link>
                </div>
            </div>
        </div>
    </b-col>
</template>

<script>
import tables from '/Data/tables'
export default {
    data() {
        return {
            tableName: 'Столы',
            windowWidth: window.innerWidth
        }
    },
    computed: {
        tables() {
            return tables
        },
        getBar() {
            return this.$store.getters.getBar
        }
    },
    watch: {
        windowWidth:function(){
            if(768 > window.innerWidth ){
                 this.barRespons = false
            }else {
                this.barRespons = true
            }
        }
    },
    mounted() {
         window.onresize=()=>{
            this.windowWidth = window.innerWidth
        }
    },
    methods: {
        showName(table){
            this.tableName = 'Стол:' + table.id;
        }
    }
}
</script>

<style scoped>
    .bar {
        width: 100%;
        height: 100vh;
        border-right: 1px solid grey;
    }
    .logo {
        width: 100%;
        height: 80px;
        border-bottom: 1px solid grey;
        padding: 10px 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* .res-bar {
        
    } */
    .tables {
        width: 100%;
        height: calc(100vh - 80px);
        text-align: center;
        padding: 20px 0;
        overflow-y: scroll;
    }
    .tables::-webkit-scrollbar  {
        background-color: #aaa;
        border-radius: 9px;
        width: 4px;
        height: 5px;
    } 
    .tables::-webkit-scrollbar-thumb {
        background: #000;
        border-radius: 9px;
        background-clip: content-box;
    }

   @media only screen and (max-width: 1550px) and (min-width: 1081px) {
        .table-btn {
            width: 80%;
            height: 50px;
            margin: 5px 0;
            font-size: 1rem;
            border: 1px solid #fff !important;
            background: transparent;
        }
        .logo h5 {
            font-size: 1.6rem;
        }
    }
    @media only screen and (max-width: 1080px) and (min-width: 768px) {
        .table-btn {
            border-radius: 50%;
            margin: 8px 0;
            font-size: 1rem;
        }
    }
    @media only screen and (max-width: 767px) and (min-width: 714px) {
        .tables {
            display: flex;
            flex-wrap: wrap;
            justify-content: unset !important;
        }
    }
    @media only screen and (max-width: 767px) {
        .table-btn {
            width: 80px;
            height: 80px;
            border-radius: 25px;
            font-size: 1rem;
            margin: 10px;
            background: #fff;
            color: #00022e;
            font-size: 1.5rem;
            /* border-radius: 50%; */
            border: 2px solid #00022e !important;
        }
        .tables {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            height: calc(100vh - 130px);
            padding: 5px;
        }
        .bar {
            background: #fff !important;
        }
        .logo h5 {
            color: #000 !important;
            font-size: 2rem !important;
        }
        .table-btn:focus {
            background: #00022e;
        }
    }
</style>