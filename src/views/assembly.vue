 <template lang='pug'>
    v-row(class="text-center")
      v-col(cols="12" xs="12" sm="10" md="10" lg="8" offset-lg="2" offset-md="1" offset-sm="1").pics-heading Click on image below to enlarge 
          v-card
            v-container(fluid)
              v-row
                v-col(v-for="item in parts" class="d-flex child-flex" cols="4")
                    v-card(flat tile class="d-flex")
                      v-img(:src="item.src" :lazy-src="item.src" aspect-ratio="1" class="grey lighten-2" @click="openDialog(item)" style="cursor: pointer;")
                        template(v-slot:placeholder)
                          v-row(class="fill-height ma-0" align="center" justify="center")
                            v-progress-circular(indeterminate color="grey lighten-5")

      v-dialog(v-model="dialog" :max-width="image.width" aspect-ratio="1" class="grey lighten-2")
        v-card(flat tile)
          v-row(align="center" justify="center")
            v-card-title(:class="{'pb-0':dense}").d-block.pics-heading {{image.title}}
            v-img(:src="image.src" :max-width="image.width*.95") 
          br
          v-card-text().pics-content {{image.description}}
</template>
<script>
export default {
  data: () => ({
    dialog:false,
    image: {},
    term: "",
    parts: [
      {
        title: "Transmission front view",
        description: "Front view of transmission with radiator underneath",
        src: "transmission.jpg",
        width: "600"
      },
      {
        title: "Gear Assembly",
        description:
          "This is the gear assembly in the transmission. The bottom shaft is connected to the engine. The center shaft is for counter rotation and for establishing part of the ration from the engine to the propeller.The top shaft is what changes the gears and drives the propellor. The cylinder laying in the middle is located to the top (output) shaft. is is in an assemble above the counter shaft and is moved from inside by the pilot.",
        src: "gear-assembly.jpg",
        width: "600"
      },
      {
        title: "Transmission case",
        description:
          "",
        src: "transmission-case.jpg",
        width: "500"
      },
      {
        title: "Transmission",
        description:
          "",
        src: "transmission-front.jpg",
        width: "500"
      },
      {
        title: "Air valve",
        description:
          "Air valve converted to release the antifreeze from the engine into the engine area to put out a fire. fire is the worse possible thing that can happen in an airplane.",
        src: "air-valve.jpg",
        width: "500"
      },
      {
        title: "Control Sticks",
        description:
          "This is a pic of the control sticks . The one on the left is a copy pf the stick in the world famous Spitfire that won the Battle of Brition in the 2nd world war. I molded the with my hands The buttons are for the push to talk on the radio. The button on the spitfire was to trigger the machine gun.",
        src: "control-sticks.jpg",
        width: "500"
      }
    ],
    lastUpdated: {
      sort: { last_update: "desc" },
      size: 10
    }
  }),
  methods : {
    openDialog(img) {
      this.dialog = true;
      this.image = img;
    }
  }
};
</script>
<style lang="stylus">
  .pics-heading
    text-align: center;
    font-family: 'Roboto Mono', monospace;
    font-weight: bold
  .pics-content
    font-family: 'Roboto Mono', monospace
</style>
              