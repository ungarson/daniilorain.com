<script setup>
/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */

import {watch} from "vue";
import {useRoute} from "vue-router";

(function() { // DON'T EDIT BELOW THIS LINE
  var d = document, s = d.createElement('script');
  s.src = 'https://daniilorain.disqus.com/embed.js';
  s.setAttribute('onload', () => console.log('loaded'));
  (d.head || d.body).appendChild(s);
})();

const update = () => {
  if (typeof DISQUS !== 'undefined') {
    DISQUS.reset({
      reload: true,
    });
  }
}

const route = useRoute();

watch(
  () => route.params.dynamicSegment,
  (newPath) => {
    update(newPath);
  }
)
</script>

<template>
  <div id="disqus_thread"></div>
  <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</template>