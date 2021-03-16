/*! CSS Browser Selector - http://rafael.adm.br/css_browser_selector */
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);

navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();



$(document).ready(function() {

  var browser = navigator.sayswho;

  if (browser.indexOf('IE') >= 0){
    $('body').addClass('ie')
  }

  $.extend($.lazyLoadXT, {
    edgeY: 1500
  });

  $(window).lazyLoadXT();


  $('.project').on('mouseenter', function() {
    var classes = $(this).attr('class');
    var pureclasses = classes.substring(8);
    var res = pureclasses.split(" ");
    $('.filter button').removeClass('active');
    $.each(res, function(index, value) {
      var id = '#' + value;
      $(id).addClass('active');

    })
  })

  $('.project').on('mouseleave', function() {
    $('.filter button').removeClass('active');
  })

  if(!$('body').hasClass('ie')){

    if ($(window).width() >= 700) {
      $('#info.active').on('click', function() {
        vw = $(window).width() / 100;
        if (!$(this).hasClass('topscroller') && !$(this).hasClass('topscroller2')) {
          $(this).toggleClass('active');
          $('.about').not('.ab2').toggleClass('closed');
        }
        if ($(this).hasClass('topscroller2')) {
          $('main').scrollTo('.intro', 500);
          setTimeout(function() {
            $('.about').not('.ab2').removeClass('closed');
            $('#info').addClass('acitve');
            $('#info').css('marginBottom', vw * 2);
          }, 750);
          return false;
        }
        if ($(this).hasClass('topscroller')) {
          $('main').scrollTo('.intro', 500);
          return false;
        }
      });
    } else {
      $('#info').removeClass('active');
      $('.about').not('.ab2').addClass('closed');
      $('#info').on('click', function() {
        $('#info').css('marginBottom', 0);
        $(this).toggleClass('active');
        $('.about').not('.ab2').toggleClass('closed');
      });
    }
  }

  $('*').not('.zoomTarget > img, .zoomTarget').on('click', function(){
    $('.images').removeClass('zoomin');

  })

  $('.zoomTarget').not('body').on('click', function() {
    if($('main').hasClass('noScroll')){
      $('.filter, #info').css({'opacity':'0', 'pointer-events':'none'});
    } else {
      $('.filter, #info').css({'opacity':'1', 'pointer-events':'auto'});
    }
    setTimeout(function(){
    if($('main').hasClass('noScroll')){
      $('.zoomButton').show();
      $('.filter, #info').css({'opacity':'0'});
    } else {
      $('.zoomButton').hide();
      $('.filter, #info').css({'opacity':'1'});
    }
    }, 500);
    setTimeout(function(){
    if($('.selectedZoomTarget').hasClass('first')){
      $('.prev').hide();
    }
    if($('.selectedZoomTarget').hasClass('last')){
      $('.next').hide();
    }
    }, 500);
  });

  $(".prev, .next").on("click", function() {
    console.log('in pn');
    setTimeout(function(){
    if($('.selectedZoomTarget').hasClass('first')){
      $('.prev').hide();
    }
    if($('.selectedZoomTarget').hasClass('last')){
      $('.next').hide();
    }
  }, 500);
  });

  $('.zoomTarget').not('main').not('main').not('.zoomContainer').on('click', function() {

    var datamata = $(this).children('img').attr('datamata-src');
    $('.images').addClass('zoomin');
    $(this).children('img').attr("src", datamata);
    if ($(window).width() <= 700) {
      if(!$(this).hasClass('selectedZoomTarget')){
          $('.zoomTarget, .project h1, .project div:not(.images), .intro, #info').not($(this)).not('.zoomContainer, .zoomViewport').addClass('hiddden');
          console.log('add1')
        

        var that = $(this);
        if($('html').hasClass('mobile')){
          $('main, .images').css({'pointer-events':'none'})
          $('.images > .zoomTarget').css({'pointer-events':'auto'})
        }
        setTimeout(function(){

          // that.children('img').clone().prependTo('.clonediv').addClass('deleteclone');
          // that.children('img').css({'opacity':'0'});
        }, 500)
        // setTimeout(function () {
        //   $('main').css('z-index','1')
        //   $('main').css('z-index','0')
        // }, 1000);
        // $('.zoomTarget').css({'pointer-events':'none'});
      } else {
        $('.selectedZoomTarget img').css({'opacity':'1'})
        setTimeout(function(){
          $('.images, .projects, .zoomContainer, main, .filter, #info').css({'pointer-events':'auto'})        }, 10)
        
        $('*').removeClass('hiddden');
        console.log('remove1')
        // $('.zoomTarget').not($(this)).not('body').css({'pointer-events':'auto'});
      }
    } else {
      if(!$(this).hasClass('selectedZoomTarget')){
        $('.filter, #info').addClass('hiddden');
        // $('.zoomTarget').css({'pointer-events':'none'});
      } else {
        $('*').removeClass('hiddden');
        console.log('remove2')
        setTimeout(function(){
          $('main').css({'pointer-events':'auto'})
        }, 200)
        // $('.zoomTarget').not($(this)).not('body').css({'pointer-events':'auto'});
      }
    }
  })

  $('*').not('.selectedZoomTarget').on('click', function(){
    if (($(window).width() >= 700) && (!$('body').hasClass('selectedZoomTarget'))){
      $('.filter, #info').removeClass('hiddden');
        setTimeout(function(){
          $('.images, .projects, .zoomContainer, main, .filter, #info').css({'pointer-events':'auto'})
        }, 10)
    }
  })

  // $('*').on('click', function(){
  //   if($('.zoomTarget').hasClass('clicked')){
  //     $('.zoomTarget').removeClass('clicked');
  //     $('*').removeClass('hiddden')
  //   }
  // });

  $(document).on('click','.images.zoomin, .images *', function(){
    $('.zoomin').removeClass('zoomin');
  })



  $('.aboutcontent div button').on('click', function() {
    $(this).toggleClass('active');
    $(this).parent('div').toggleClass('pclosed');
  });



  var stickytop = $('#info').position().top;

  $('main').on('scroll', function() {

    if ($('#info').hasClass('active')) {

      var infotop = $('#info').position().top;
      var scrolled = $(this).scrollTop();

      if (stickytop != infotop) {
        $('#info').addClass('topscroller');
      } else if (scrolled <= stickytop) {
        $('#info').removeClass('topscroller');
      }
    } else {

      var infotop = $('#info').position().top;
      var scrolled = $(this).scrollTop();

      if (stickytop != infotop) {
        $('#info').addClass('topscroller2');
      } else if (scrolled <= stickytop) {
        $('#info').removeClass('topscroller2');
      }
    }
  })


  // FILTER

  $('.filter > button').on('click', function() {
    klass = '.' + $(this).attr('id');
    vw = $(window).width() / 100;
    projectstop = $('.projects').offset().top;
    $(window).lazyLoadXT();

    if (!$(this).hasClass('selected')) {
      $('.filter > button').removeClass('selected');
      $(this).addClass('selected');
      $('.project').hide();
      $(klass).show();
      vw = $(window).width() / 100;
      fh = $('.filter').height();
      $('main').scrollTo('.projects', 500, {offset:  -(fh+vw*3)});
      return false;
    } else {
      $(this).removeClass('selected');
      $('.project').show();
    }
  })

  // IMPRINT

  $('.ab2').on('click', function() {
    var vw = $(window).width() / 100;
    $('main').scrollTo($(this), 500, {offset:  -vw*1});
    return false;
  })


  // Close ZoomSlideshow on swipe

  var timer = 0;
  $('*').on('touchstart click', function(){
    if ($('html').hasClass('mobile') && (timer == 0)) {
        timer = 1;

        if(!$('main').hasClass('selectedZoomTarget')){ // wenn ZoomSlideshow geöffnet

          $('main').click();
          $('*').removeClass('hiddden');
          console.log('remove1')
          
          $('main').css({'pointer-events':'auto'})
          // $('.zoomTarget').not($(this)).not('body').css({'pointer-events':'none'});
        }

        setTimeout(function(){
          timer = 0;
        }, 100)
        // else {  // show
        //   $('*').removeClass('hiddden');
        //   // $('.zoomTarget').not($(this)).not('body').css({'pointer-events':'auto'});
        //   console.log('5')
        // }
      }
  })

  var timer = 0;
  $('.zoomTarget > img').not('main').on('click touchstart', function() {
    var that = $(this);
    if ($('html').hasClass('mobile') && (timer == 0)) {
      timer = 1;
      var datamata = that.attr('datamata-src');
      that.attr("src", datamata);
    }

    setTimeout(function(){
      timer = 0;
    }, 100)
  })

  // BODY ZOOM

  // $(".zoomi").click(function(evt) {
  //
  //   if ($('body').hasClass('bla')) {
  //
  //     $('body').css({
  //       'height': '100vh',
  //       'transform-origin': 'center',
  //       'transform': 'translate(0, 0) rotate(0rad) skewX(0rad) scale(1, 1)',
  //       'transition-duration': '1s;',
  //       'transition-timing-function': 'linear'
  //     })
  //     setTimeout(function() {
  //       $('body').removeAttr("style")
  //       $('html').removeClass("noScroll")
  //       console.log('hil');
  //       $('body').removeClass('bla')
  //       $('body').css('transition', ' ')
  //
  //     }, 1000);
  //
  //   } else {
  //     $(this).zoomTo({
  //       closeclick: true,
  //       scalemode: "both",
  //       targetsize: 0.9
  //     });
  //     evt.stopPropagation();
  //     setTimeout(function() {
  //       $('body').addClass('bla')
  //       $('body').css('transition', 'all 1s linear')
  //     }, 1000);
  //   }
  // });

});
