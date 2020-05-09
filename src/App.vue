<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link :to="{name:'index'}" style="text-decoration: none;" class="white--text">
        <h2>Aero2Speed</h2>
      </router-link>
      <v-icon large>mdi-airplane-takeoff</v-icon>
      <v-spacer></v-spacer>
      <router-link :to="{name:'assembly'}" style="text-decoration: none;margin:5px;" class="white--text">
          <h4>Assembly</h4>
      </router-link>
      | 
      <a href="#" onClick="window.open('blueprint.pdf')" style="text-decoration: none;margin:5px" class="white--text">
          <h4>Blueprints</h4>
      </a>
    </v-app-bar>
    <v-footer color="secondary" dark :fixed="fixed" app>
      Copyright © Aero2Speed {{new Date().getFullYear()}}
      <v-spacer></v-spacer>
      Contact: eacs62 at gmail.com
    </v-footer>
    <v-content>
      <router-view />
    </v-content>

  </v-app>  
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
<style lang="stylus">
  a 
    font-family: 'Roboto Mono', monospace 
</style>
