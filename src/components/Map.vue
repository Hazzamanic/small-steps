
<template>
  <div>      
    <div style="height:calc(100vh - 56px); width:100vw">
      <div id="map"></div>
    </div>
  </div>
</template>
    <script>


export default {
  name: "Map",
  mounted() {
    

var my_awesome_script = document.createElement('script');

my_awesome_script.setAttribute('src','https://maps.googleapis.com/maps/api/js?key=AIzaSyB7wrdomBIDJli_fY4e7RTWx0_peV9QTsk&callback=initMap');

document.head.appendChild(my_awesome_script);



    
  }
};
</script>

<style>
#map {
    height: 100%;
}
</style>