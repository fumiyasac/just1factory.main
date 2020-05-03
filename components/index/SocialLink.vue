<template>
  <b-container>
    <div class="message_block">
      <h2 class="message_text">
        Developer's Social Links
      </h2>
      <div>
        <div class="container">
          <div class="text-center social_block">
            <ul class="list-unstyled list-inline">
              <li class="clickable-space list-inline-item">
                <a href="https://github.com/fumiyasac" target="_blank" class="btn-floating btn-lg">
                  <i class="fa fa-github github_color" />Github
                </a>
              </li>
              <li class="clickable-space list-inline-item">
                <a href="https://www.slideshare.net/fumiyasakai37" target="_blank" class="btn-floating btn-lg">
                  <i class="fa fa-slideshare slideshare_color" />SlideShare
                </a>
              </li>
              <li class="clickable-space list-inline-item">
                <a href="https://qiita.com/fumiyasac@github" target="_blank" class="btn-floating btn-lg">
                  <i class="fa fa-folder-open qiita_color" />Qiita
                </a>
              </li>
              <li class="clickable-space list-inline-item">
                <a href="https://medium.com/@fumiyasakai/" target="_blank" class="btn-floating btn-lg">
                  <i class="fa fa-medium medium_color" />Medium
                </a>
              </li>
              <li class="clickable-space list-inline-item">
                <a href="https://twitter.com/fumiyasac" target="_blank" class="btn-floating btn-lg">
                  <i class="fa fa-twitter twitter_color" />Twitter
                </a>
              </li>
              <li class="clickable-space list-inline-item">
                <a href="https://www.facebook.com/fumiya.sakai.37" target="_blank" class="btn-floating btn-lg">
                  <i class="fa fa-facebook facebook_color" />Facebook
                </a>
              </li>
              <li class="clickable-space list-inline-item">
                <a href="https://www.linkedin.com/in/%E6%96%87%E4%B9%9F-%E9%85%92%E4%BA%95-77363a48/" target="_blank" class="btn-floating btn-lg">
                  <i class="fa fa-linkedin linkedin_color" />LinkedIn
                </a>
              </li>
              <li class="clickable-space list-inline-item">
                <a href="https://note.mu/fumiyasac" target="_blank" class="btn-floating btn-lg">
                  <i class="fa fa-book note_color" />note
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'SocialLink'
}
</script>

<style>
.message_block {
  padding-top: 80px;
}
.message_block h2 {
  padding: 0 0 20px 0;
  color: #444444;
  font-size: 26px;
  font-family: 'Palatino', "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.clickable-space {
  margin: 16px 0;
}
.fa {
	margin-right: 6px;
}
.facebook_color {
	color: #3b5998;
}
.github_color {
	color: #333333;
}
.twitter_color {
	color: #00aced;
}
.slideshare_color {
	color: #0077b5;
}
.qiita_color {
	color: #55c500;
}
.medium_color {
	color: #00ab6c;
}
.linkedin_color {
	color: #2867B2;  
}
.note_color {
	color: #249f80;
}
</style>
