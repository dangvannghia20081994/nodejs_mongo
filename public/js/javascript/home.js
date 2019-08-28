function load_list_keyword(id){
	$("#card_"+id+" .card-content .row").html("");
	$.ajax({
		url: domain+"Home",
		type:"POST",
		data:{
			op:"load_list_keyword",
			_token:_token,
			id:id,
		}
	}).done(function(data){
		$("#card_"+id+" .card-content .row").append(data);
	});
}
$(document).ready(function(){
	var dataset = {};
	
	function get_data(){
		dataset ={};
		$.ajax({
			url: domain+"Home",
			type:"POST",
			async:false,
			dataType:"json",
			data:{
				op:"line",
				_token:_token,
			}
		}).done(function(data){
			dataset = data;
			close_loadding();
		});
	}
	get_data();
	var chart = c3.generate({
		bindto: '#chart',
		x: 'x',
		padding: {
			top: 0,
			right: 50,
			bottom: 40,
			left: 50,
		},
		empty: {
			label: {
				text: "Chưa có bài viết nào"
			}
		},
		data: {
			onclick: function (d, element,aaaa) {
				data = dataset[d.index].date_search;
				window.open(domain+"view_post/"+data);
			},
			// url: domain+"Report",
			// mimeType: 'json',
			json:dataset,
			keys: {
				x: 'name',
				value: ['Post'],
			},
			type: 'spline',//type:'bar',// type: 'spline'
			labels: true,
		},
		zoom: {
			enabled: true
		},
		legend: {
			show: false
		},
		tooltip: {
			grouped: false,
			show: true
		},
		grid: {
			x: {
				show: false
			},
			y: {
				show: true
			}
		},
		axis: {
			x: {
				type: 'category'
			}
		}
	});
	$("body").on("click",".name_keyword",function(){
		var id =$(this).attr("attributes");
		window.open(domain+"view_keyword/"+id);
	});
	$("body").on("click",".ft-minus",function(){
		var attribute = $(this).attr("attribute");
		attribute =parseInt(attribute);
		if(attribute > 0){
			load_list_keyword(attribute);
		}
	})
});