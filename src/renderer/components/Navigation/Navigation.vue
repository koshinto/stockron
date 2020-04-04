<template>
  <nav id="navigation">
    <ul id="links">
      <li><router-link to="/">
        <img src="./icons/home_icon_light.svg" width="40" height="40">
        <p>ホーム</p>
      </router-link></li>
      <hr class="style-border" noshadow/>
      <li><router-link to="/home">
        <img src="./icons/create_icon_light.svg" width="40" height="40">
        <p>入力</p>
      </router-link></li>
      <hr class="style-border" noshadow/>
      <li><router-link to="/histories">
        <img src="./icons/board_icon_light.svg" width="40" height="40">
        <p>履歴</p>
      </router-link></li>
      <hr class="style-border" noshadow/>
      <li><router-link to="/select">
        <img src="./icons/spanner_icon_light.svg" width="40" height="40">
        <p>設定</p>
      </router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
}
</script>

<style scoped>
a {
  color: #707070;
  text-decoration: none;
}

#navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  width: 15%;
  height: 100%;
  background-color: white;
  float: left;
}

#links {
  text-align: center;
  list-style: none;
}

.style-border {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  border-top: #DDD 6.5px solid;
  border-radius: 4px;
  box-shadow: none;
  width: 20px;
}
</style>