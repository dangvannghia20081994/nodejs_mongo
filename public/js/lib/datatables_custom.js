$.fn.DataTable.ext.pager.full_numbers_no_ellipses = function(page, pages){
  var numbers = [];
  var buttons = $.fn.DataTable.ext.pager.numbers_length;
  var half = Math.floor( buttons / 2 );

  var _range = function ( len, start ){
    var end;

    if ( typeof start === "undefined" ){ 
      start = 0;
      end = len;

    } else {
      end = start;
      start = len;
    }

    var out = []; 
    for ( var i = start ; i < end; i++ ){ out.push(i); }
    return out;
  };


  if ( pages <= buttons ) {
    numbers = _range( 0, pages );

  } else if ( page <= half ) {
    numbers = _range( 0, buttons);

  } else if ( page >= pages - 1 - half ) {
    numbers = _range( pages - buttons, pages );

  } else {
    numbers = _range( page - half, page + half + 1);
  }
  numbers.DT_el = 'span';
  return [ 'first', 'previous', numbers, 'next', 'last' ];
};
$.fn.DataTable.ext.pager.simple_numbers_no_ellipses = function(page, pages){
  var numbers = [];
  var buttons = $.fn.DataTable.ext.pager.numbers_length;
  var half = Math.floor( buttons / 2 );
  var _range = function ( len, start ){
    var end;

    if ( typeof start === "undefined" ){ 
      start = 0;
      end = len;

    } else {
      end = start;
      start = len;
    }
    var out = []; 
    for ( var i = start ; i < end; i++ ){ out.push(i); }
      return out;
  };
  if ( pages <= buttons ) {
    numbers = _range( 0, pages );
  } else if ( page <= half ) {
    numbers = _range( 0, buttons);

  } else if ( page >= pages - 1 - half ) {
    numbers = _range( pages - buttons, pages );
  } else {
    numbers = _range( page - half, page + half + 1);
  }
  numbers.DT_el = 'span';
  return [ 'previous', numbers, 'next' ];
};
$.fn.DataTable.ext.pager.numbers_length = 5;
$.extend( true, $.fn.dataTable.defaults, {
  select:false,
  select: {
    style: 'single',
    info: false
  },
  info:true,
  autoWidth: false,
  responsive: false,
  searching: true,
  ordering: false,
  processing: false,
  serverSide: false,
  lengthChange: true,
  lengthMenu: [1,5,10, 25, 50, 100,200,300,500],
  pageLength: 5,
  paging: true,
  pagingType: "simple_numbers_no_ellipses",
  language: {
    emptyTable :"Không có dữ liệu hiển thị",
    lengthMenu: "Hiển thị _MENU_",
    zeroRecords: "Không có dữ liệu cần hiển thị",
    info: "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ bản ghi",
    infoEmpty: "Đang xem 0 đến 0 trong tổng số 0 bản ghi",
    infoFiltered: "<br>(Được lọc từ _MAX_ bản ghi)",
    processing:   "Đang tải dữ liệu ...",
    search:       "Tìm kiếm:",
    paginate: {
      first:    "Đầu",
      previous: "Trước",
      next:     "Tiếp",
      last:     "Cuối"
    },
    searchPlaceholder: "Nhập nội dung tìm kiếm"
  }
});