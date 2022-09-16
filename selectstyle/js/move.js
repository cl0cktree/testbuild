$(function(){
  // var secHeight = screenY;
  // document.ready(function(){
  //   $('.section').css('height':secHeight)
  // });
  $('body').on('click','.button',function(){
    $('.section').removeClass('section1');
    $('.section').removeClass('section2');
    $('.section').removeClass('section3');
    $('.section').removeClass('section4');
    if($(this).is('.button1')){
        //$('.section').removeclass('section2,section3,section4');
        $('.section').addClass('section1');
      }else if($(this).is('.button2')){
        //$('.section').removeclass('section1,section3,section4');
        $('.section').addClass('section2');
      }else if($(this).is('.button3')){
        //$('.section').removeclass('section1,section2,section4');
        $('.section').addClass('section3');
      }else if($(this).is('.button4')){
        //$('.section').removeclass('section2,section3,section1');
        $('.section').addClass('section4');
      }
  });
});
