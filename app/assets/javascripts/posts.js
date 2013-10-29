$(document).ready(function(){

  // Masonry Layout
  var $container = $('.masonry');
  $container.imagesLoaded( function() {
    $container.masonry({
      itemSelector        : '.post-box',
      columnWidth         : '.post-box',
      transitionDuration  : 0
    });
  });

  // Endless Scroll
  var currentPage = 1, currentXHR;
  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 500) {
      if (currentXHR) { return; }
      currentPage++;
      currentXHR = $.ajax({
        type: 'GET',
          url: 'posts/page/' + currentPage,
          data: '',
          success: function(results) {
            var $results = jQuery(results).filter('div');
            $container.append($results)
            $container.imagesLoaded( function() {
              $container.masonry('appended', $results, 'layout');
            });
          },
          complete: function() {
            currentXHR = null;
          }
      });
    }
  });

  // Auto select for editing Post
  $('.dropdown-menu li a').click(function(){
    var selectedText = $(this).text();
    $(this).parents('.input-group-btn').find('.dropdown-toggle').html(selectedText+' <span class="caret"></span>');
    $('[data-toggle="dropdown"]').parent().removeClass('open');
    $('#post_format').val(selectedText.toLowerCase());
    return false;
  });
});