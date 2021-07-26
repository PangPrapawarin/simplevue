<template>
  <div>
      <table align="center">
          <thead>
              <th>Date</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Total</th>
              <th>Note</th>
              <th>Action</th>
          </thead>
          <tbody>
              <tr v-for="(dt,index) in allData" v-bind:key="index">
                  <td v-if="index !== editIndex">{{dt.dateTime}}</td>
                  <td v-if="index === editIndex">
                      <input type="date" min="2021-07-23" v-model="form.dateTime">
                  </td>
                  
                  <td v-if="index !== editIndex">{{dt.income}}</td>
                  <td v-if="index === editIndex">
                      <input type="text" v-model="form.income">
                  </td>
                  
                  <td v-if="index !== editIndex">{{dt.expense}}</td>
                  <td v-if="index === editIndex">
                      <input type="text" v-model="form.expense">
                  </td>
                  
                  <td>{{dt.sum}}</td>

                  <td v-if="index !== editIndex">{{dt.note}}</td>
                  <td v-if="index === editIndex">
                      <input type="text" v-model="form.note">
                  </td>

                  <td id="openButton" v-if="index !== editIndex">
                      <button @click="openForm(index,dt)">Click to edit</button>
                  </td>
                  <td id="editButton" v-if="index === editIndex">
                      <button @click="editData">Update</button>
                      <button @click="closeForm">Cancel</button>
                  </td>
              </tr>
          </tbody>
      </table>
      <div>
          <br>
          <p>Total {{this.cal()}} Baht | Income {{this.allIncome()}} Baht | Expense {{this.allExpense()}} Baht</p>
      </div>
  </div>
</template>

<script>
import DataStore from '@/store/Account'
export default {
    data() {
        return {
            allData : [],
            editIndex : -1,
            form : {
                income : 0,
                expense : 0,
                dateTime : '',
                note : '',
                sum : 0
            },
            totalIncome: 0,
            totalExpense: 0
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            DataStore.dispatch('fetchData')
            this.allData = DataStore.getters.allData
            this.totalIncome = DataStore.getters.allIncome
            this.totalExpense = DataStore.getters.allExpense
            console.log(this.totalIncome)
        },
        openForm(index,dt) {
            this.editIndex = index
            let cloned = JSON.parse(JSON.stringify(dt))
            this.form.income = cloned.income
            this.form.expense = cloned.expense
            this.form.dateTime = cloned.dateTime
            this.form.note = cloned.note
            this.form.sum = cloned.sum
        },
        closeForm() {
            this.editIndex = -1
            this.form = {
                income : '',
                expense : '',
                dateTime : '',
                note : '',
                sum : 0
            }
        },
        editData() {
            if (this.form.income > 0 && this.form.expense >0 && this.form.dateTime !== '') {
            let payload = {
                index : this.editIndex,
                income : this.form.income,
                expense : this.form.expense,
                sum : this.form.income-this.form.expense,
                dateTime : this.form.dateTime,
                note : this.form.note
            }
            DataStore.dispatch('editData',payload)
            this.closeForm()
            }
        },
        cal() {
            var sum = 0
            this.allData.forEach(function(data) {
                sum+=parseInt(data.sum)
            }
            )
            return sum
        },
        allIncome() {
            var sum = 0
            this.allData.forEach(function(data) {
                sum += parseInt(data.income)
            }
            )
            return sum
        },
        allExpense() {
            var sum = 0
            this.allData.forEach(function(data) {
                sum += parseInt(data.expense)
            }
            )
            return sum
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen {
    .table {
        width: 100%;
    }
}
td, th {
    color: #000000;
  border: 1px solid #f4f756;
  background-color: antiquewhite;
  text-align: center;
  padding: 8px;
}
td {text-align: left;
background-color: #ffffff;
color: rgb(66, 66, 66);}
button {
    margin-right: 5px;
    margin-left: 5px;
    color: rgb(141, 75, 0);
    background-color: #ffdfbb;
}
</style>>