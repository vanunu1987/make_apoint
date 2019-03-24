<template>
    <section class="workTimeContiner">
        <div class="day sun">
            <from-to/>
        </div>
        <div class="day mun">
            <from-to/>
        </div>
        <div class="day tue">
            <from-to/>
        </div>
        <div class="day wen">
            <from-to/>
        </div>
        <div class="day fri">
            <from-to/>
        </div>
    </section>
</template>
<script>
import FromTo from '@/components/FromTo.vue'
export default {
    components:{
        FromTo
    }
}
</script>
<style scoped>
.workTimeContiner{
    display: flex;
}
.day{
    display: flex;
    flex-direction: column;
    margin: 5px;

}
</style>


