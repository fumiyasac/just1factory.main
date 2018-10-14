<template>
  <div>
    <b-carousel id="carousel" class="carousel slide carousel-fade" data-ride="carousel" img-width="1024" img-height="480">
      <b-carousel-slide caption="2018年10月"
                        text="技術書典5にて著書を頒布しました。現在Boothにて電子版を販売中です(改訂版も準備しています）。"
                        img-src="/slides/top_image1.jpg" />
      <b-carousel-slide caption="2018年09月"
                        text="iOSDC Reject Conferenceにてデザイナーとのコラボレーションをしたアプリ開発に関する登壇をしました。"
                        img-src="/slides/top_image2.jpg" />
      <b-carousel-slide caption="2018年08月"
                        text="iOSDC 2018に参加してきました。4日間の中で多くの知識を得られたと共にイベントを通じての交流もできました。"
                        img-src="/slides/top_image3.jpg" />
      <b-carousel-slide caption="夏休みの1ページ"
                        text="iOS関連の各種勉強会やイベントは進んで参加しています。現在もコニュニティの方々には本当にお世話になっております。"
                        img-src="/slides/top_image4.jpg" />
      <b-carousel-slide caption="2018年6月"
                        text="ReactNative meetup #8にてReactNativeとNativeBase関連のトピックに関する登壇をしました。"
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
