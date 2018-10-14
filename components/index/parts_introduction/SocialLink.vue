<template>
  <div class="container">
    <div class="text-center social_block">
      <ul class="list-unstyled list-inline">
        <li class="list-inline-item">
          <a href="https://twitter.com/fumiyasac" target="_blank" class="btn-floating btn-lg">
            <i class="fa fa-twitter twitter_color" />
          </a>
        </li>
        <li class="list-inline-item">
          <a href="https://www.facebook.com/fumiya.sakai.37" target="_blank" class="btn-floating btn-lg">
            <i class="fa fa-facebook facebook_color" />
          </a>
        </li>
        <li class="list-inline-item">
          <a href="https://github.com/fumiyasac" target="_blank" class="btn-floating btn-lg">
            <i class="fa fa-github github_color" />
          </a>
        </li>
        <li class="list-inline-item">
          <a href="https://www.slideshare.net/fumiyasakai37" target="_blank" class="btn-floating btn-lg">
            <i class="fa fa-slideshare slideshare_color" />
          </a>
        </li>
        <li class="list-inline-item">
          <a href="https://qiita.com/fumiyasac@github" target="_blank" class="btn-floating btn-lg">
            <i class="fa fa-folder-open qiita_color" />
          </a>
        </li>
        <li class="list-inline-item">
          <a href="https://note.mu/fumiyasac" target="_blank" class="btn-floating btn-lg">
            <i class="fa fa-book note_color" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialLink'
}
</script>

<style>
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
.note_color {
	color: #249f80;
}
</style>
