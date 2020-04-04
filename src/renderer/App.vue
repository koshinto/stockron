<template>
  <div id="app">
    <navigation/>
    <div id="content"><router-view/></div>
  </div>
</template>

<script>
  import Navigation from '../renderer/components/Navigation/Navigation'

  export default {
    name: 'electron-vue-demo',
    components: { Navigation }
  }
</script>

<style lang="sass">
*
  box-sizing: border-box
  margin: 0
  padding: 0


html
  height: 100vh
  font-family: "遊ゴシック Medium", "Yu Gothic Medium", sans-serif
  overflow: none


body
  height: 100vh


a
  color: #707070
  text-decoration: none


form
  margin-top: 30px


input
  width: 100%
  padding: 5px
  outline: none
  margin-bottom: 10px
  &:focus
    outline: solid #F39800 2px


table
  width: 100%


table tr
  border-bottom: black solid 1px


#app
  display: block
  width: 100%
  height: 100vh
  background-color: #F0F0F0


#content
  display: block
  width: 85%
  height: 100vh
  float: left
  overflow: scroll


#main
  display: block
  width: 80%
  margin-left: auto
  margin-right: auto


.info
  margin-bottom: 10px
  padding: 5px 0
  list-style: none
  color: rgb(0, 102, 255)
  background-color: rgba(51, 153, 255, 0.1)
  border: rgba(51, 153, 255, 0.3) solid 1px
  li
    margin: 2px 0
    padding: 0 10px


.errors
  color: red
  background-color: rgba(255, 0, 0, 0.1)
  border: rgba(255, 0, 0, 0.3) solid 1px


.btn
  display: block
  margin: 20px 0
  padding: 10px 100px
  border: none
  outline: none

.agree
  background-color: #005796
  color: white

.add
  background-color: #71BA2B
  color: white

.delete
  background-color: #CA1139
  color: white

.small
  padding: 10px 30px
</style>
