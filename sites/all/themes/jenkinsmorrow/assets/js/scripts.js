(function ($) {
  $(document).ready(function() {
    
  $('.js nav').prepend('<button class="menu-btn">Menu</button>');
  $('.js nav ul').addClass('hide');
  $(".menu-btn").click(function(){
        $(".js nav ul").toggleClass('hide');
        $(".menu-btn").toggleClass('close');
    });
  
  if(Modernizr.mq('only all')) {
    $('html').addClass('mq');
  } else {
    $('html').addClass('no-mq');
  };
  
  
  
  });
})(jQuery);