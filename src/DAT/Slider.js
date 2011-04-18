DAT.GUI.Slider = function(numberController, min, max, step, initValue) {

  var clicked = false;
  var _this = this;

  var x, px;

  this.domElement = document.createElement('div');
  this.domElement.setAttribute('class', 'guidat-slider-bg');

  this.fg = document.createElement('div');
  this.fg.setAttribute('class', 'guidat-slider-fg');

  this.domElement.appendChild(this.fg);

  var onDrag = function(e) {
    if (!clicked) return;
    var pos = findPos(_this.domElement);
    var val = DAT.GUI.map(e.pageX, pos[0], pos[0] + _this.domElement
        .offsetWidth, min, max);
    val = Math.round(val / step) * step;
    numberController.setValue(val);
  };

  this.domElement.addEventListener('mousedown', function(e) {
    clicked = true;
    x = px = e.pageX;
    DAT.GUI.addClass(numberController.domElement, 'active');
    onDrag(e);
    document.addEventListener('mouseup', mouseup, false);
  }, false);

  var mouseup = function(e) {
    DAT.GUI.removeClass(numberController.domElement, 'active');
    clicked = false;
    if (numberController.finishChangeFunction != null) {
      numberController.finishChangeFunction.call(this, numberController.getValue());
    }
    document.removeEventListener('mouseup', mouseup, false);
  };

  var findPos = function(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return [curleft,curtop];
    }
  };

  this.__defineSetter__('value', function(e) {
    var pct = DAT.GUI.map(e, min, max, 0, 100);
    this.fg.style.width = pct + "%";
  });

  document.addEventListener('mousemove', onDrag, false);

  this.value = initValue;

};