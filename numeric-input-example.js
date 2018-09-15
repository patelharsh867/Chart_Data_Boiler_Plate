/* global $ */
/* this is an example for validation and change events */
	var result = [];
	var cellData1 = [];
	var cellData2 = [];
	var cellData3 = [];

$.fn.numericInputExample = function () {
	'use strict';
	var element = $(this),
		footer = element.find('tfoot tr'),
		dataRows = element.find('tbody tr'),
		
		initialTotal = function () {
			var column, total;
			for (column = 1; column < footer.children().size(); column++) {
				// introduced 555
				total = 0;
				dataRows.each(function () {
					var row = $(this);

					console.log(row.index());
					switch(column){
						case 1:
							cellData1[row.index()] = row.children().eq(column).text();
							break;
						case 2:
							cellData2[row.index()] = row.children().eq(column).text();
							break;
						case 3:
							cellData3[row.index()] = row.children().eq(column).text();
							break;
						default:
							break;
					}

					//cellData[column][row.index()] = row.children().eq(column).text();

					total += parseFloat(row.children().eq(column).text()) * parseFloat(row.children().eq(4).text());
				});
				result[column-1] = total ; 
				footer.children().eq(column).text(total);
			};
		};

	element.find('td').on('change', function (evt) {
		console.log(window.myHorizontalBar);

		var cell = $(this),
			column = cell.index(),
			row = cell.parent(),
			// introduced 555
			total = 0;

		//console.log("konsa row "+cell.parent().index());

		if (column === 0) {
			return;
		}

		//xxx
		if(column == 4){
			initialTotal();
		}

		switch(column){
			case 1:
				cellData1[row.index()] = row.children().eq(column).text();

				break;
			case 2:
				cellData2[row.index()] = row.children().eq(column).text();
				break;
			case 3:
				cellData3[row.index()] = row.children().eq(column).text();
				break;
			default:
				break;
		}
					

		element.find('tbody tr').each(function () {
			var row = $(this);

			total += parseFloat(row.children().eq(column).text()) * parseFloat(row.children().eq(4).text());
			
			result[column-1] = total; 

			console.log(result[column-1]);
		});
		/*
		if (column === 1 && total > 5000) {
			$('.alert').show();
			return false; // changes can be rejected
		} else*/ {
			$('.alert').hide();
			footer.children().eq(column).text(total);
		}
     //loadBar();
     //loadHorizontalBar();
     window.myHorizontalBar.update();
	 window.myBar.update();
	}).on('validate', function (evt, value) {
		var cell = $(this),
			column = cell.index();
		if (column === 0) {
			return !!value && value.trim().length > 0;
		} else {
			return !isNaN(parseFloat(value)) && isFinite(value);
		}
	});

	initialTotal();
	return this;
};
