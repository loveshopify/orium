import $ from 'jquery';
const selectors = {
  feed: $('[data-instagram-feed]')
}



let items = [];

const render = items => {
  selectors.feed.html('');
  items.forEach((edge, index) => {
    if (index >= selectors.feed.data('max-slides')) return false;
    const el = `<a 
      href="${edge.href}" 
      target="_blank" 
      class="instagram-feed__post no-hover-link">
        <img src="${edge.image}">
        <span>
          <b><i class="icon-heart"></i>${edge.likes}</b>
          <b><i class="icon-bubble"></i>${edge.comments}</b>
        </span>
      </a>`;
    selectors.feed.append(el);
  });
  let i = selectors.feed.find("img").length;
  let j = 0;
  selectors.feed.find("img").one("load", function() {
    j++;
    if (j == i) {
      selectors.feed.removeClass('is-hidden');
    }
  }).each(function() {
    if (this.complete) {
      $(this).trigger('load'); // For jQuery >= 3.0 
    }
  });
}


const init = () => {
  if (window.instagramUrl) {
    if (items.length == 0) {
      $.get(window.instagramUrl+'?__a=1', data => {
        const edges = data.graphql.user.edge_owner_to_timeline_media.edges;
        edges.forEach(edge => {
          items.push({ 
            image: edge.node.thumbnail_src,
            href: `https://www.instagram.com/p/${edge.node.shortcode}`,
            comments: edge.node.edge_media_to_comment.count,
            likes: edge.node.edge_liked_by.count
          });
        });
        render(items);
      }).fail(() => {
        console.error("Instagram didn't get data");
      });
    } else {
      render(items);
    }
  } else {
    console.error("Instagram url not found");
  }

}

const instagramFeed = () => {
  if (selectors.feed.length) {
    init();
    $(window).resize(init);
  }
}


export default instagramFeed;