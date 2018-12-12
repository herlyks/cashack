$('.app-icon').click(function() {
  var container  = $('#main');
  var data       = $(this).data();
  var app_window = $('<div class="app-window"><div class="app-title-bar"></div><div class="app-body"></div></div>');
  var selector   = '.app-window.' + data.appName;

  if ($(selector).length > 0) {
    $(selector).appendTo(container);
  } else {
    app_window.addClass(data.appName);

    app_window.find('.app-title-bar').append('<div class="pull-right"><minimize>_</minimize><maximize>[]</maximize><close>x</close></div>');

    app_window.on('mouseup', 'close', function(e) {
      $(this).closest('.app-window').remove();
    });

    app_window.on('mousedown', dragWindow);
    app_window.on('mousedown', function() {
      $(this).appendTo(container);
    });

    container.append(app_window);
  }
});

function dragWindow(e) {
  var initialX, initialY, newX, newY;
  var el = $(this);

  initialX = e.clientX;
  initialY = e.clientY;

  $(document).on('mouseup', cancelDrag);
  $(document).on('mousemove', drag);

  function drag(ee) {
    var position = el.position();
    newX         = initialX - ee.clientX;
    newY         = initialY - ee.clientY;
    initialX     = ee.clientX;
    initialY     = ee.clientY;
    el.css({
      top: (position.top - newY) + 'px',
      left: (position.left - newX) + 'px'
    });
  }

  function cancelDrag() {
    $(document).unbind('mouseup', cancelDrag);
    $(document).unbind('mousemove', drag);
  }
}
