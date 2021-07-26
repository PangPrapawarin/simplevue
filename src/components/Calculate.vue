<template>
<div class="center">
    <h1><i>Income and Expense Account</i></h1>
    <h3>Add income and expense (BAHT) ✨</h3>
    <div>
        <div>
            <label for="name">Income : </label>
            <input type="text" v-model="form.income">
        </div>
        <div>
            <label for="name">Expense : </label>
            <input type="text" v-model="form.expense">
        </div>
        <div>
            <label for="name">Date : </label>
            <input type="date" min="2021-07-25" v-model="form.dateTime">
        </div>
        <div>
            <label for="name">Note : </label>
            <input type="text" v-model="form.note" maxlength="50">
        </div>
        <div>
            <button @click="addData">Submit</button>
        </div>
    </div>

</div>
</template>

<script>
import DataStore from '@/store/Account'
export default {
    data() {
        return {
            form : {
                income : 0,
                expense : 0,
                dateTime : '',
                note : '',
                sum : 0
            }
        }
    },
    methods: {
        clearForm() {
            this.form = {
                income : 0,
                expense : 0,
                dateTime : '',
                note : '',
                sum : 0
            }
        },
        addData() {
            if (this.form.income > 0 && this.form.expense >0 && this.form.dateTime !== '') {
            let payload = {
                income: this.form.income,
                expense: this.form.expense,
                note: this.form.note,
                dateTime: this.form.dateTime,
                sum: this.form.income-this.form.expense
            }
            DataStore.dispatch('addData',payload)
            this.clearForm()
            }
        },
    }

}
</script>

<style lang="scss" scoped>
h1 {
    margin-top: 3%;
    margin-bottom: 2%;
    color: rgb(141, 75, 0);
}
div {
    margin-bottom: 1%;
}
button {
    margin-bottom: 2%;
    color: rgb(141, 75, 0);
    background-color: #ffdfbb;
}
</style>>