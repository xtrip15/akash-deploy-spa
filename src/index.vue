<template lang='pug'>
  v-app
    v-container.index(fluid)
      div(style="position:relative")
        v-carousel.carousel(
          continuous
          cycle
          interval=10000
          height="600px"
          hide-delimiter-background
          show-arrows=false
          show-arrows-on-hover
        )
          v-carousel-item(v-for="item in pics" :src="item.img")
      br
      br
      p.heading
        router-link(:to="{name: 'assembly'}" title="assembly") View Plane Assembly Parts
      p
        div.about I built this airplane to research and fly an auto engine with a two speed transmission. The loose of my first experimental plane motivated me to use an auto engine. I had built a Quickie 200 with a Continental O-200 engine. This engine failed in flight. I was never able to rebuild the plane to safe standards. The engine had been rebuilt by one of the most reputable certified rebuilders. I then purchased a Cessna 172. I wanted to have this rebuilt to FAA standards but it had a crack in the crankshaft. I lost all confidence in the air cooled engine design. I have driven many cars and never had such bad luck, EXCEPT WITH A VOLKSWAGEN THAT BROKE THE CRANKSHAFT. The range of temperatures in all air-cooled engines is much larger than a water cooled engine. Water cooled engines can be built with much closer tolerances than air cooled thus water cooled engines are more reliable. 
      p 
        div.about I began this project in 1992. The purpose of this project was to build a reliable plane with an auto engine. I chose the Bearhawk 4 seat design but will only use 2 seats until all my research is completed. The Bearhawk design fits my needs. I considered using a variable pitch prop on an auto engine but gaskets have caused crashes and near disaster results. Most pilots only use two settings on the prop. One for takeoff and the other for cruise. I am not interested in aerobatics or using other setting for work like crop dusting that require multiple settings. I try to eliminate such risks.
      p
        div.about I have experimented with car engines with automatic transmissions. When the throttle is opened and held open, the transmissions shift to the next gear at peak hp and returns to peak torque at each gear until it reaches peak hp again. There is some variations by brand of engines and transmissions but typically, car engines peak torque is about 4200 RPM and peak hp is about 5400 RPM. I designed the transmission to use 5400 on takeoff and 4200 on cruise. The propeller will be turning at 2700 RPM at both of these peaks and in the appropriate gear. The pilot may choose those RPMs and gears if so desired.
      p
        div.about I choose the standard transmission gears and bearing made by Richmond. My transmission uses three shafts instead of the traditional counter shaft and a split input and output shaft. The input shaft and output shaft of standard transmission are inline. My transmission has an input shaft with a countershaft above that and an output shaft above that. The gears are 3.5 inches in dia meter, thus stacking them results in a 7 inch raised output shaft. Since the car engine output in lower than an aircraft engine the 7 inch raise brings the prop up and provides some clearance from the ground.
      p 
        div.about I designed the transmission and made the shafts and bought the gears. A mechanical engineer then drew it up and wrote the specs to accommodate a 600 hp engine. The blueprints were then taken to a machinist who made the models for the aluminum casing. I had a casing made and I machined the casing. There are other parts to attach it to the engine. The engine is an LS1 Chevrolet engine of 350 cubic inches or 5.7 liters. Most auto engines could be used
      p
        div.about This view is of the gear system inside the transmission. The lower shaft is the input shaft. With its bearings, gear and a one way clutch. This clutch is commonly referred to as a sprague clutch but has roller bearings to engage the outer drum instead of spragues. When the shaft is turned by the engine, the rollers move up an inclined plane and press the outer drum. This action will then drive the gear shown on the left.
      p
        div.about The gear on the left of the input shaft is always engaged to the gear above it as are all other gear sets, consequently, it will drive that gear and the counter shaft it is permanently attached to. The middle shaft is a counter rotating shaft and has a reduction ratio. That set will rotate the counter shaft and will transmit the power to the gear of choice on the output shaft. That is selected by the fork and is moved by the cylinder it is attached to. In this picture it is laying down but in the casing it is above the output shaft. These gears are synchromesh helical gears. Each gear set consumes 1.5 to 2% of the power. This more than spur gears but they are quiet.
      p
        div.about There was a big political fight between the City of Glendale and the owner of the hanger I was renting. Consequently I had to move my plane to my garage and several other places. It suffered a lot of hanger rash. There were parts damaged and lost since the transfer was abrupt. This picture shows completion of fabric on the fuselage the boot cowl and the windscreen installation. The at this point the plane is partly complete.
</template>

<script>
export default {
  data: () => ({
    term: "",
    pics: [
      {
        img: "Airplane.png"
      },
      {
        img: "EdwPlane.png"
      },
      {
        img: "plane-side.jpg"
      },
      {
        img: "plane-rear.jpg"
      },
      {
        img: "plane-inside.jpg"
      }
    ],
    lastUpdated: {
      sort: { last_update: "desc" },
      size: 10
    }
  })
};
</script>
<style lang="stylus">
  .about
    text-indent: 50px;
    font-family: 'Roboto Mono', monospace
  .heading
    text-align: center;
    font-family: 'Roboto Mono', monospace;
    font-weight: bold;
</style>