$(function(){

	var slide = document.querySelectorAll('.slide');
	var indicator = document.querySelector('.indicator');
	var slide_img = document.querySelector('.slide img');
	var slide_wrap = document.querySelector('.slide-wrap');
	var slide_container = document.querySelector('.slide-container');
	var prev_btn = document.getElementById('prev-btn');
	var next_btn = document.getElementById('next-btn');
	var bulet;
	var bulet_num;
	var slide_animation = null;
	var msheight = slide_img.clientHeight;
	var mswidth = slide.length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
	var s_width = slide.clientWidth;
	var wrapwidth = mswidth*100;
	var move=0;
	var bi=0;
	var resize_timer;
	var resize_time = 200;

	slide_wrap.style.height=msheight+'px';

	// $(window).resize(function(){
	// 	var msheight = $('.slide img').height();
	// 	var mswidth = $('.slide').each(Array).length;/*-슬라이드 전체 배열의 갯수만큼의 숫자를 추출-*/
	// 	var wrapwidth = mswidth*100;
	// 	s_width = $('.slide').width();

	// 	$('.slide-wrap').css({'height':msheight});
	// });

	function resize_function(){
		var msheight = slide_img.clientHeight;
		var mswidth = slide.length;
		var wrapwidth = mswidth*100;
		var s_width = slide.clientWidth;

		slide_wrap.style.height=msheight+'px';
	};

	window.addEventListener('resize', function(){ // 화면 넓이 변경 시 거기에 맞추어 초기값 다시 세팅 실행.
        clearTimeout(resize_timer);
        resize_timer = setTimeout(function(){
            resize_function(); // 기존 값을 유지하는 동작을 원할시 주석 제거 후 default_data() 주석 처리.
        }, resize_time);
        return false;
    });

	for (var i=0;i<mswidth;i++)/*.slide의 배열이 늘어나면 알아서 아이디와 레프트값 연산 및 .indicator의 btn도 배열 갯수만큼 append*/
	{
		var t=i+1;
		i=i*100;
		document.querySelector('#slide'+t).style.left=i+'%';
		indicator.innerHTML+='<span id="bulet'+t+'" class="bulet">●</span>';
		i=i/100;
	};

	function slide_movement(){
		// console.log('move =='+move);
		if(slide_animation){
			slide_animation.cancel();
		};
		slide_animation = slide_container.animate(
			[{left:+move+'%'}],
			{
				duration:100,
				easing:'ease-in-out',
				fill: 'forwards'
			}
		)
		slide_animation.onfinish = function(){
			slide_animation = null;
		};				
	};

	function bullet_movement(){
		if(slide_animation){
			slide_animation.cancel();
		};
		slide_animation = slide_container.animate(
			[{'left':-cbm+100+'%'}],
			{
				duration:100,
				easing:'ease-in-out',
				fill: 'forwards'
			}
		)
		slide_animation.onfinish = function(){
			slide_animation = null;
		};
	};

	function prev_mouseClick(){
		move=move+100;
		bi=1+move/100*-1;
		bulet = document.querySelectorAll('.bulet');
		bulet_num = document.querySelector('#bulet'+bi);
		if (move<100)
		{			
			slide_movement();
			next_btn.style.zIndex='2';
			$('.bulet').css({'color':'#ccc'})
			for( var i = 0; i < bulet.length; i++ ){
				var b_item = bulet.item(i)
				b_item.style.color='#ccc';
			}
			bulet_num.style.color='#999';
			if (move==0)
			{
				this.style.zIndex='-1';
			}
		}else{
			move=0;
			slide_movement();
			next_btn.style.zIndex='2';
			if (move==0)
			{
				this.style.zIndex='-1';
			}
		}
	};

	function next_mouseClick(){
		move=move-100;
		bi=1+move/100*-1;
		bulet = document.querySelectorAll('.bulet');
		bulet_num = document.querySelector('#bulet'+bi);
		if (move>-mswidth*100)/*슬라이드 갯수 최대치 자동 연산*/
		{
			slide_movement();
			prev_btn.style.zIndex='2';
			for( var i = 0; i < bulet.length; i++ ){
				var b_item = bulet.item(i)
				b_item.style.color='#ccc';
			}
			bulet_num.style.color='#999';
			if (move-100==-mswidth*100)
			{
				this.style.zIndex='-1';
			}
		}else{
			move=-mswidth*100+100;
		}
	};

	prev_btn.addEventListener('mouseover',stop_s,false);
	prev_btn.addEventListener('mouseout',start_s,false);
	prev_btn.addEventListener('click',prev_mouseClick,false);
	next_btn.addEventListener('mouseover',stop_s,false);
	next_btn.addEventListener('mouseout',start_s,false);
	next_btn.addEventListener('click',next_mouseClick,false);

	$('.slide').on('touchstart touchend touchcancle click mouseover mouseleave',function(event){
		/*
		//-현재의 변화되는 x와 ywhkvy 값-
		var px=event.changeedTouches[0].pageX;
		var py=event.changeedTouches[0].pageY;

		//-좌표변화 이벤트가 일어나는지 체크-
		ptouch=getMoveType(px,py);

		//-스크롤과의 충돌방지 부분(스크롤 이벤트를 무시)-
		if (ptouch===1)
		{
			event.preventDefault();
		}
		*/
		// var tstart;
		// var tmove;
		// var tend;
		// var tcancel;

		var cal_width = s_width*0.2;
		var cal_height = msheight*0.2;

		/*swipe 이벤트 시작*/
		if (event.type=='touchstart')
		{
			event.preventDefault();
			event.stopPropagation();
			tstart=event.originalEvent.touches[0].pageX;
			ystart=event.originalEvent.touches[0].pageY;
			//stop_s();
		}

		// else if (event.type=='touchmove')
		// {
		// 	event.preventDefault();
		// 	event.stopPropagation();
		// 	tmove=event.originalEvent.changedTouches[0].pageX;
		// }

		else if (event.type=='touchend')
		{
			event.preventDefault();
			event.stopPropagation();
			// tend=event.originalEvent.touches[0].pageX;
			tmove=event.originalEvent.changedTouches[0].pageX;
			ymove=event.originalEvent.changedTouches[0].pageY;

			stop_s();
			var tvalue = tstart-tmove;
			var yvalue = ystart-ymove;

			if (tvalue>cal_width)
			{
				var tvalue = cal_width;

				$('#next-btn').stop().click();
				//alert('1-1 = '+tvalue+'/ 1-2 = '+cal_width);

				//move=move-100;

			}else if (tvalue<-cal_width)
			{
				//move=move+100;
				var tvalue = cal_width;

				$('#prev-btn').stop().click();
				//alert('2-1 = '+tvalue+'/ 2-2 = '+cal_width);


			}else if (tstart-tmove<cal_width){

				if(yvalue==0){
					if($(this).is('#slide1')==true){
						$('body').css({'background':'red'})
					}else if($(this).is('#slide2')==true){
						$('body').css({'background':'orange'})
					}else if($(this).is('#slide3')==true){
						$('body').css({'background':'yellow'})
					}else if($(this).is('#slide4')==true){
						$('body').css({'background':'green'})
					}else if($(this).is('#slide5')==true){
						$('body').css({'background':'blue'})
					}else if($(this).is('#slide6')==true){
						$('body').css({'background':'purple'})
					}
				}else{
					if(yvalue>cal_height){
						$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
					}else if(yvalue<cal_height){
						if((yvalue*-1)>cal_height){
							$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
						}
					}
				}

			}
			start_s();
		}

		else if (event.type=='touchcancle')
		{
			event.preventDefault();
			event.stopPropagation();
			// tend=event.originalEvent.touches[0].pageX;

			stop_s();
			var tvalue = tstart-tmove;
			var yvalue = ystart-ymove;

			if (tvalue>cal_width)
			{
				var tvalue = cal_width;

				$('#next-btn').stop().click();
				//alert('1-1 = '+tvalue+'/ 1-2 = '+cal_width);

				//move=move-100;

			}else if (tvalue<-cal_width)
			{
				//move=move+100;
				var tvalue = cal_width;

				$('#prev-btn').stop().click();
				//alert('2-1 = '+tvalue+'/ 2-2 = '+cal_width);


			}else if (tstart-tmove<cal_width){

				if(yvalue==0){
					if($(this).is('#slide1')==true){
						$('body').css({'background':'red'})
					}else if($(this).is('#slide2')==true){
						$('body').css({'background':'orange'})
					}else if($(this).is('#slide3')==true){
						$('body').css({'background':'yellow'})
					}else if($(this).is('#slide4')==true){
						$('body').css({'background':'green'})
					}else if($(this).is('#slide5')==true){
						$('body').css({'background':'blue'})
					}else if($(this).is('#slide6')==true){
						$('body').css({'background':'purple'})
					}
				}else{
					if(yvalue>cal_height){
						$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
					}else if(yvalue<cal_height){
						if((yvalue*-1)>cal_height){
							$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
						}
					}
				}
			}
			start_s();
		}
		else if (event.type=='click')
		{
			if($(this).is('#slide1')==true){
				$('body').css({'background':'red'})
			}else if($(this).is('#slide2')==true){
				$('body').css({'background':'orange'})
			}else if($(this).is('#slide3')==true){
				$('body').css({'background':'yellow'})
			}else if($(this).is('#slide4')==true){
				$('body').css({'background':'green'})
			}else if($(this).is('#slide5')==true){
				$('body').css({'background':'blue'})
			}else if($(this).is('#slide6')==true){
				$('body').css({'background':'purple'})
			}
			// if (bi==0)
			// {
			// 	bi++;
			// 	alert('click'+bi)
			// }else{
			// 	alert('click'+bi)
			// }
		}
		else if (event.type=='mouseover')
		{
			stop_s();
		}
		else if (event.type=='mouseleave')
		{
			start_s();
		}
		return false;
	});

	var cb;
	var cbm;
	$('.bulet').on('click mouseover mouseleave',function(){
		if (event.type=='click')
		{
			for (cb = $('.bulet').each(Array).length;cb>=1;cb-- )
			{
				if ($(this).attr('id')=='bulet'+cb)
				{
					$('.bulet').css({'color':'#ccc'})
					$(this).css({'color':'#999'})
					cbm = cb*100;

					if (move-cbm<0)
					{
						if (move-cbm<-100)
						{
							// slide_container.stop().animate({'left':-cbm+100+'%'},100)
							bullet_movement();

							if (cb==1)
							{
								$('#prev-btn').css({'z-index':'-1'})
								$('#next-btn').css({'z-index':'2'})

							}else if ((cb!==1)&&(cb!==mswidth))
							{
								$('#prev-btn').css({'z-index':'2'})
								$('#next-btn').css({'z-index':'2'})
							}else if (cb==mswidth)
							{
								$('#prev-btn').css({'z-index':'2'})
								$('#next-btn').css({'z-index':'-1'})
							}

						}else if (move-cbm>-100){
							slide_container.stop().animate({'left':0+'%'},100)
						}else if (move-cbm==-100)
						{

							// slide_container.stop().animate({'left':-cbm+100+'%'},100)
							bullet_movement();

							if (cb==1)
							{
								$('#prev-btn').css({'z-index':'-1'})
								$('#next-btn').css({'z-index':'2'})

							}else if ((cb!==1)&&(cb!==mswidth))
							{
								$('#prev-btn').css({'z-index':'2'})
								$('#next-btn').css({'z-index':'2'})
							}else if (cb==mswidth)
							{
								$('#prev-btn').css({'z-index':'2'})
								$('#next-btn').css({'z-index':'-1'})
							}
						}
					}
				}
			}
			move=-cbm+100;
		}
		if (event.type=='mouseover')
		{
			stop_s();
		}else if (event.type=='mouseleave')
		{
			start_s();
		}
	});

	if ((move==0)||(cb==1))
	{
		$('#prev-btn').css({'z-index':'-1'})
		$('#next-btn').css({'z-index':'2'})
		$('.bulet').css({'color':'#ccc'})
		$('#bulet1').css({'color':'#999'})
	}else if ((cb!==1)&&(cb!==mswidth))
	{
		$('#prev-btn').css({'z-index':'2'})
		$('#next-btn').css({'z-index':'2'})
	}else if (cb==mswidth)
	{
		$('#prev-btn').css({'z-index':'2'})
		$('#next-btn').css({'z-index':'-1'})
	};

	var autospeed=2000;
	function start_s(){
		interval = setInterval(function(){
			msswipe = mswidth*100;
			msminus = mswidth*-100+100;
			var m;

			if (move==msminus)
			{
				move=0;
				m=move*-1;
				bi=1+move/100;

			}else{
				move=move-100;
				m=move*-1;
				bi=1+m/100;
			}
			if (move<msswipe)
			{
				$('#prev-btn').css({'z-index':'2'})
				$('#next-btn').css({'z-index':'2'})
				$('.bulet').css({'color':'#ccc'})
				$('#bulet'+bi).css({'color':'#999'})
				// slide_container.stop().animate({'left':move+'%'},100)
				slide_movement();
				if (move==0)
				{
					$('#prev-btn').css({'z-index':'-1'})
					$('#next-btn').css({'z-index':'2'})
				}
				if (move-msminus==0)
				{
					$('#prev-btn').css({'z-index':'2'})
					$('#next-btn').css({'z-index':'-1'})
				}

			}else if (move>msminus){
				$('#prev-btn').css({'z-index':'2'})
				$('#next-btn').css({'z-index':'-1'})
			}

		},autospeed)
	}
	start_s();
	function stop_s(){
		clearInterval(interval);
	}
	return false;
});
