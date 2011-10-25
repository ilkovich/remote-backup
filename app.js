var zombie = require('zombie')
	, assert = require('assert')
	, fs = require('fs')
;

function doAfterSubmit(err, browser, status) {
	console.log('doAfterSubmit - Enter');
	if(err) {
		console.log(JSON.stringify(err,undefined ,"   "));
	}
}

function doAfterExport(err, browser, status) {
	console.log('doAfterExport - Enter');
	if(err) {
		console.log(JSON.stringify(err,undefined ,"   "));
		return;
	}

	var els = browser.css('#table_select option');
	var url = [] ;
	els.forEach(function(i) {
			url.push('table_select%5B%5D='+i.innerHTML);
		});
	console.log(url.join('&'));
	/**
	  * Cannot save within zombie

	  browser.choose('#radio_custom_export')
		.select('compression', 'gzip')
		.pressButton('#buttonGo', doAfterSubmit);
	 */
}

function doAfterGo(err, browser, status) {
	console.log('doAfterGo - Enter');
	if(err) {
		console.log(JSON.stringify(err,undefined ,"   "));
		return;
	}
	browser.visit('http://myadmin.phpfogapp.com/db_export.php?db=lostgirlsworld-phpfogapp-com&server=1&' + browser.location.search, doAfterExport);
}
function doAfterVisit(err, browser, status) {
	console.log('doAfterVisit - Enter');
	if(err) {
		console.log(JSON.stringify(err,undefined ,"   "));
		return;
	}
	browser.fill('pma_username', 'Custom App-15246');
	browser.fill('pma_password', '1WZnNSrIOxAbj4CD');
	browser.pressButton('#input_go', doAfterGo);
}

zombie.visit('http://myadmin.phpfogapp.com/index.php',  doAfterVisit);
	

