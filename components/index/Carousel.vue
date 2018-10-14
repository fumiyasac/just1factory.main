<template>
  <div>
    <b-carousel id="carousel" class="carousel slide carousel-fade" data-ride="carousel" img-width="1024" img-height="480">
      <b-carousel-slide caption="2018年10月"
                        text="技術書典5での販売ブース"
                        img-src="/slides/top_image1.jpg" />
      <b-carousel-slide caption="2018年09月"
                        text="iOSDC Reject Conferenceでの登壇"
                        img-src="/slides/top_image2.jpg" />
      <b-carousel-slide caption="2018年08月"
                        text="iOSDC Japan 2018 会場風景"
                        img-src="/slides/top_image3.jpg" />
      <b-carousel-slide caption="夏休みの1ページ"
                        text="Swift/Kotlin愛好会 in サザンビーチ"
                        img-src="/slides/top_image4.jpg" />
      <b-carousel-slide caption="2018年6月"
                        text="ReactNative meetup #8での登壇"
                        img-src="/slides/top_image5.jpg" />
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel'
}
</script>

<style>
#carousel {
  text-shadow: 1px 1px 2px #333;
  background-color: #cccccc;
}
</style>
