"use strict";
window.onload = function(){
    fin_eu_startup();
}
function fin_eu_startup(){

    init();
    updateLoop();
    
    function init(){
	var dates = allDates();
	initStaticDates();
	initMerciHollande();
	initLarmesRepublicaines();
    }
    function updateLoop(){
	countdownPass();
	progressPass();
	setTimeout(function(){ updateLoop() }, 100);	
    }
    // all needed dates infos
    function allDates(){
	var dates = {
	    start : new Date("2015-11-14T02:00:00.000Z"),
	    now : new Date(),
	    // end : new Date("2016-02-26T02:00:00.000Z"),
	    end : new Date("2017-02-01T02:00:00.000Z"),
	}
	dates.isOver = dates.now >= dates.end;
	if (dates.isOver){ dates.now = dates.end; }
	return dates;
    }   
    // update progression ratio
    function progressPass() {
	var dates = allDates();
	var ratio = (dates.now-dates.start)/(dates.end-dates.start);
	var precis = 1000;
	var power = 5;
	// progress text    
	elementContentById('progress_text',parseInt(ratio*100*precis)/precis);
	// progress div width
	applyById('progress',function(el){
	    el.style.width = [(100*ratio),'%'].join('');
	});
	// marianne rotation
	applyById('marianne',function(el){
	    el.style.transform= ['rotate','(',
				 (180-180*Math.pow(ratio,power)),
				 'deg',')'].join('');
	});
    }
    // update d/h/m/s countdown and title
    function countdownPass() {
	var dates = allDates();
	var m_ms = 60;
	var m_hm = 60;
	var m_dh = 24;
	var m_hs = m_hm*m_ms;
	var m_dm = m_dh*m_hm;
	var m_ds = m_dh*m_hm*m_ms;
	var remain = parseInt((dates.end - dates.now)/1000,10);
	var days = parseInt(remain/m_ds,10);
	var hours = parseInt(remain/m_hs,10) - days*m_dh ;
	var minutes = parseInt(remain/m_ms,10) - hours*m_hm - days*m_dm;
	var seconds = remain - minutes*m_ms - hours*m_hs - days*m_ds;	
	// countdown spans
	elementContentById('d',days);
	elementContentById('h',hours);
	elementContentById('m',minutes);
	elementContentById('s',seconds);	
	// document title
	document.title = [days,'j',hours,'h',minutes,'m',
			  "avant la fin de l'état d'urgence"].join(' ');
    }
    // static dates
    function initStaticDates(){
	var dates = allDates();
	elementContentById('start',dates.start.toLocaleDateString('fr-FR'));
	elementContentById('end',dates.end.toLocaleDateString('fr-FR'));
    }
    // thank you !   
    function initMerciHollande(){
	applyById('mercifrancoishollande',function(el){
	    el.onclick = function(ev){
		merciHollande(ev.target)
	    };
	});
    }
    function merciHollande(button){
	var dates = allDates();
	var href = button.getAttribute("href");
	var text = button.textContent;
	var dates = allDates();
	if (!dates.isOver){
	    applyById('notnow',function(tmpl){
		if (tmpl.className != "warning show"){
		console.log(tmpl.className);
		    tmpl.className = "warning show";
		    setTimeout(function(){
			tmpl.className = "warning";
		    },8000);
		}
	    });

	}else {
	    window.location = href;
	}
    }
    // larmes républicaines
    function initLarmesRepublicaines(){
	applyById('marianne',function(el){
	    el.onmousemove = function(ev){
		if (Math.random()>0.90){
		    var larme = document.createElement('p');
		    document.body.appendChild(larme);
		    larme.textContent = '♥';
		    larme.style.position = 'absolute';
		    larme.style.left = [parseInt(ev.clientX),'px'].join('');
		    larme.style.top =  [parseInt(ev.clientY),'px'].join('');
		    larme.style.color = ['blue','white','red'][parseInt(Math.random()*3)];
		    updateLarmeRepublicaine(larme,1,ev.clientY +100);
		}
	    };
	});
    }    
    function updateLarmeRepublicaine(larme,dy,maxY){
	larme.style.top = [parseInt(larme.style.top) + dy,'px'].join('');
	if (parseInt(larme.style.top) > maxY){
	    larme.parentNode.removeChild(larme);
	} else {
	    setTimeout(function(){ updateLarmeRepublicaine(larme,dy+1,maxY) }, 1000*(1/24));	
	}
    }
    // utils
    function applyById(id,fun){
	var el = document.getElementById(id);
	if (el && fun){
	    fun(el);
	}
    }
    function elementContentById(id,text) {
	applyById(id,function(el){el.textContent = text});
    }
}
