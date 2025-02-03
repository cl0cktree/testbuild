$(function(){
	var mswidth;
	var msheight;
	var wrapwidth;
	if($('body').find('.slide-wrap'))
		{
		$('.slide-wrap').append('<div id="slide-container" class="slide-container"></div><ul id="indicator" class="indicator"></ul><div id="prev-btn" class="con-btn"></div><div id="next-btn" class="con-btn"></div>');
		var slideNum=0;
		var jsonLocation = './data/data.json';
		$.getJSON(jsonLocation, function(data){
			$.each(data, function(I, item){
				slideNum++;
				$('.slide-container').append('<div class="slide" id="slide'+slideNum+'"><img src='+item.img_url+' alt=""></div>');
				$('.indicator').append('<li id="bulet'+slideNum+'" class="bulet">●</li>');
				mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
				for (var i=0;i<mswidth;i++)/*.slide의 배열이 늘어나면 알아서 아이디와 레프트값 연산 및 .indicator의 btn도 배열 갯수만큼 append*/
				{
					var t=i+1;
					i=i*100;
					$('#slide'+t).css({'left':i+'%'})
					i=i/100;
				};
			});

			mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
			s_width = $('.slide').width();
			var move=0;
			var bi=0;

			$(window).resize(function(){
				var msheight = $('.slide img').height();
				var mswidth = $('.slide').each(Array).length;/*-슬라이드 전체 배열의 갯수만큼의 숫자를 추출-*/
				wrapwidth = mswidth*100;
				s_width = $('.slide').width();

				$('.slide-wrap').css({'height':msheight});
			});

			$('#prev-btn').on('mouseover mouseout click',function(){
				if (event.type=='mouseover')
				{
					stop_s();
					stop_bar();
				}else if (event.type=='mouseout')
				{
					start_s();
					startbar();
				}
				else if (event.type='click')
				{
					move=move+100;
					bi=1+move/100*-1;

					if (move<100)
					{
						$('.slide-container').stop().animate({'left':move+'%'},100)
						$('#next-btn').css({'z-index':'2'})
						$('.bulet').css({'color':'#ccc'})
						$('#bulet'+bi).css({'color':'#999'})
						if (move==0)
						{
							$(this).css({'z-index':'-1'})
						}
					}else{
						move=0;
						$('.slide-container').stop().animate({'left':move+'%'},100)
						$('#next-btn').css({'z-index':'2'})
						if (move==0)
						{
							$(this).css({'z-index':'-1'})
						}
					}
				}
			});

			$('#next-btn').on('mouseover mouseout click',function(){
				if (event.type=='mouseover')
				{
					stop_s();
					stop_bar();
				}else if (event.type=='mouseout')
				{
					start_s();
					startbar();
				}

				else if (event.type='click')
				{
					move=move-100;
					bi=1+move/100*-1;

					if (move>-mswidth*100)/*슬라이드 갯수 최대치 자동 연산*/
					{
						$('.slide-container').stop().animate({'left':move+'%'},100)
						$('#prev-btn').css({'z-index':'2'})
						$('.bulet').css({'color':'#ccc'})
						$('#bulet'+bi).css({'color':'#999'})
						if (move-100==-mswidth*100)
						{
							$(this).css({'z-index':'-1'})
						}
					}else{
						move=-mswidth*100+100;
					}
				}

			});

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
					stop_bar();
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
					startbar();
				}

				else if (event.type=='touchcancle')
				{
					event.preventDefault();
					event.stopPropagation();
					// tend=event.originalEvent.touches[0].pageX;

					stop_s();
					stop_bar();
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
					startbar();
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
					}else if($(this).is('#slide7')==true){
						$('body').css({'background':'gray'})
					}else if($(this).is('#slide8')==true){
						$('body').css({'background':'black'})
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
					stop_bar();
				}
				else if (event.type=='mouseleave')
				{
					start_s();
					startbar();
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
									$('.slide-container').stop().animate({'left':-cbm+100+'%'},100)

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
									$('.slide-container').stop().animate({'left':0+'%'},100)
								}else if (move-cbm==-100)
								{

									$('.slide-container').stop().animate({'left':-cbm+100+'%'},100)

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
					stop_bar();
				}else if (event.type=='mouseleave')
				{
					start_s();
					startbar();
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

			function lazy_0(){
				if($('.slide-wrap').height()==0){
					$(document).ready(function(){
							msheight = $('.slide').children('img').height();
							$('.slide-wrap').css({'height':msheight});
							// console.log(msheight+' --')
						}
					);
				};
			}
			var autospeed=2000;
			function startbar(){
				setTimeout(lazy_0,0);
				$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
				$('.timebar').stop().animate({'width':'100%'},autospeed-200);
				bar = setInterval(function(){
						$('.timebar').remove();
						$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
						$('.timebar').stop().animate({'width':'100%'},autospeed-200);
				},autospeed);
			};
			function start_s(){
				setTimeout(lazy_0,0);
				interval = setInterval(function(){
					if($('.slide-wrap').height()==0){
						$(document).ready(function(){
							msheight = $('.slide img').height();
							$('.slide-wrap').css({'height':msheight});
							// console.log(msheight);
						});
					}
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
						$('.slide-container').stop().animate({'left':move+'%'},100)
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
			startbar();
			function stop_s(){
				clearInterval(interval);
			}
			function stop_bar(){
				$('.timebar').remove();
				clearInterval(bar);
			}
		});
	};
	//--이미지 로드와의 시간차로 height가 느리게 잡히는 것을 강제로 끌어내어 처음부터 height값 강제 적용.
	function lazy_0(){
		if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
			$(document).ready(function(){
					msheight = $('.slide').children('img').height();
					$('.slide-wrap').css({'height':msheight});
					//console.log(msheight+' --');
				}
			);
			//console.log('++');
		};
	}
	if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
		setInterval(lazy_0,-100);
		//console.log('==');
	};
	//-----
	return false;
});
