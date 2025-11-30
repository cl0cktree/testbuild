$(function(){
	var slide_all;
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
	var tstart=null;
	var tmove=null;
	var cal_width;
	var cal_height;

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
		s_width = slide.clientWidth;

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

	// #next-btn 과 #prev-btn 의 노출 여부를 위한 z-index 설정 함수들.
	function next_btn_off(){
		prev_btn.style.zIndex='2';
		next_btn.style.zIndex='-1';

	};
	function prev_btn_off(){
		prev_btn.style.zIndex='-1';
		next_btn.style.zIndex='2';
	};
	function all_btn_on(){
		prev_btn.style.zIndex='2';
		next_btn.style.zIndex='2';
	};
	//-----------------------------------------------------------
	function slide_movement(){
		// console.log('move =='+move);
		if(slide_animation){
			slide_animation.cancel();
		};
		// 1. 슬라이드 자동 실행 시 최종 위치에서 초기화로 당겨지는 움직임을 기존 속도와 동일하게 유지 하므로, 반대로 급격한 초기화 움직임을 주고 싶으면 아래 부분(2번)과 주석을 반대로 적용할 것.
		slide_animation = slide_container.animate(
			[{left:move+'%'}],
			{
				duration:100,
				easing:'ease-in-out',
				iterations: 1,
				fill: 'both'
			}
		);
		//------------------------------------------------------------------------------
		// 2. 슬라이드 자동 실행 시 최종 위치에서 초기화로 당겨지는 움직임을 급격하게 주고 싶으면, 해당 부분과 바로 위의 같은 변수(1번)의 주석을 서로 반대로 적용할 것.
		// slide_animation = slide_container.animate(
			// [{left:0+'%'},{left:move+'%'}],
			// {
				// duration:100,
				// easing:'ease-in-out',
				// iterations: 1,
				// fill: 'both'
			// }
		// );
		//------------------------------------------------------------------------------
		slide_animation.onfinish = function(){
			slide_animation = null;
		};
		// console.log('move = '+move);
	};
	slide_movement();

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

	function slide_count(event){
		cal_width = s_width*0.2;
		cal_height = msheight*0.2;
		s_width = slide.clientWidth;

		for( var i = 0; i < slide.length; i++ ){
			var s_item = slide.item(i)
			slide_all = s_item;
			slide_all.addEventListener('click',slide_click,false);
			slide_all.addEventListener('mouseover',stop_s,false);
			slide_all.addEventListener('mouseout',start_s,false);
			slide_all.addEventListener('touchstart',slide_t_start,false);
			slide_all.addEventListener('touchend',slide_t_end,false);
			slide_all.addEventListener('touchcancle',slide_t_cancle,false);
		}

		function slide_click(event){
			if(this==document.getElementById('slide1')){
				document.body.style.backgroundColor='red';
			}else if(this==document.getElementById('slide2')){
				document.body.style.backgroundColor='orange'
			}else if(this==document.getElementById('slide3')){
				document.body.style.backgroundColor='yellow'
			}else if(this==document.getElementById('slide4')){
				document.body.style.backgroundColor='green'
			}else if(this==document.getElementById('slide5')){
				document.body.style.backgroundColor='blue'
			}else if(this==document.getElementById('slide6')){
				document.body.style.backgroundColor='purple'
			}
		};

		function slide_mouseover(){

		};

		function slide_mouseleave(){

		};

		function slide_t_start(event){
			event.preventDefault();
			event.stopPropagation();
			tstart=event.touches[0].pageX;
			ystart=event.touches[0].pageY;
		};

		function slide_t_end(event){
			event.preventDefault();
			event.stopPropagation();
			s_width = slide_wrap.clientWidth;
			cal_width = s_width*0.2;
			cal_height = msheight*0.2;
			// tend=event.originalEvent.touches[0].pageX;
			tmove=event.changedTouches[0].pageX;
			ymove=event.changedTouches[0].pageY;

			stop_s();
			var tvalue = tstart-tmove;
			var yvalue = ystart-ymove;

			console.log('tstart-tmove = '+cal_width);

			if (tvalue>cal_width)			{
				var tvalue = cal_width;
				// $('#next-btn').stop().click();
				next_btn.click();
				//alert('1-1 = '+tvalue+'/ 1-2 = '+cal_width);
				//move=move-100;
			}else if (tvalue<-cal_width)
			{
				//move=move+100;
				var tvalue = cal_width;
				// $('#prev-btn').stop().click();
				prev_btn.click();
				//alert('2-1 = '+tvalue+'/ 2-2 = '+cal_width);
			}else if ((tstart-tmove)<cal_width){
				if(yvalue==0){
					if(this==document.getElementById('slide1')){
						document.body.style.backgroundColor='red';
					}else if(this==document.getElementById('slide2')){
						document.body.style.backgroundColor='orange'
					}else if(this==document.getElementById('slide3')){
						document.body.style.backgroundColor='yellow'
					}else if(this==document.getElementById('slide4')){
						document.body.style.backgroundColor='green'
					}else if(this==document.getElementById('slide5')){
						document.body.style.backgroundColor='blue'
					}else if(this==document.getElementById('slide6')){
						document.body.style.backgroundColor='purple'
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
		};

		function slide_t_cancle(event){
			event.preventDefault();
			event.stopPropagation();
			// tend=event.originalEvent.touches[0].pageX;
			s_width = slide_wrap.clientWidth;
			cal_width = s_width*0.2;
			cal_height = msheight*0.2;
			// tend=event.originalEvent.touches[0].pageX;			
			tmove=event.changedTouches[0].pageX;
			ymove=event.changedTouches[0].pageY;

			stop_s();
			var tvalue = tstart-tmove;
			var yvalue = ystart-ymove;
			
			if (tvalue>cal_width)
			{
				var tvalue = cal_width;
				// $('#next-btn').stop().click();
				next_btn.click();
				//alert('1-1 = '+tvalue+'/ 1-2 = '+cal_width);
				//move=move-100;
			}else if (tvalue<-cal_width){
				//move=move+100;
				var tvalue = cal_width;
				// $('#prev-btn').stop().click();
				prev_btn.click();
				//alert('2-1 = '+tvalue+'/ 2-2 = '+cal_width);

			}else if (tstart-tmove<cal_width){
				if(yvalue==0){
					if(this==document.getElementById('slide1')){
						document.body.style.backgroundColor='red';
					}else if(this==document.getElementById('slide2')){
						document.body.style.backgroundColor='orange'
					}else if(this==document.getElementById('slide3')){
						document.body.style.backgroundColor='yellow'
					}else if(this==document.getElementById('slide4')){
						document.body.style.backgroundColor='green'
					}else if(this==document.getElementById('slide5')){
						document.body.style.backgroundColor='blue'
					}else if(this==document.getElementById('slide6')){
						document.body.style.backgroundColor='purple'
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
		};
		console.log('slide_all = '+slide_all.className);
		return false;
	};

	slide_count(event);

	prev_btn.addEventListener('mouseover',stop_s,false);
	prev_btn.addEventListener('mouseout',start_s,false);
	prev_btn.addEventListener('click',prev_mouseClick,false);
	next_btn.addEventListener('mouseover',stop_s,false);
	next_btn.addEventListener('mouseout',start_s,false);
	next_btn.addEventListener('click',next_mouseClick,false);

	console.log(slide.length);

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
								prev_btn_off();

							}else if ((cb!==1)&&(cb!==mswidth))
							{
								all_btn_on();
							}else if (cb==mswidth)
							{
								next_btn_off();
							}

						}else if (move-cbm>-100){
							slide_container.stop().animate({'left':0+'%'},100)
						}else if (move-cbm==-100)
						{

							// slide_container.stop().animate({'left':-cbm+100+'%'},100)
							bullet_movement();

							if (cb==1)
							{
								prev_btn_off();

							}else if ((cb!==1)&&(cb!==mswidth))
							{
								all_btn_on();
							}else if (cb==mswidth)
							{
								next_btn_off();
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
		prev_btn_off();
		$('.bulet').css({'color':'#ccc'})
		$('#bulet1').css({'color':'#999'})
	}else if ((cb!==1)&&(cb!==mswidth))
	{
		all_btn_on();
	}else if (cb==mswidth)
	{
		next_btn_off();
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
				all_btn_on();
				$('.bulet').css({'color':'#ccc'})
				$('#bulet'+bi).css({'color':'#999'})
				// slide_container.stop().animate({'left':move+'%'},100)
				slide_movement();
				if (move==0)
				{
					prev_btn_off();
				}
				if (move-msminus==0)
				{
					next_btn_off();
				}

			}else if (move>msminus){
				next_btn_off();
			}

		},autospeed)
	}
	start_s();
	function stop_s(){
		clearInterval(interval);
	}
	return false;
});
