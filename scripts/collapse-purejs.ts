/**
 * CLASS COLLAPSE
 * Su dung de khoi tao
 */
class Collapse {
  constructor(selector) {
    let $toggle = document.querySelectorAll(selector);
    for( let i = 0, len = $toggle.length; i < len; i++ ) {
      new CollapseOne($toggle[i]);
    }
  }
}


/**
 * CLASS COLLAPSE ONE
 * Class su li chinh
 */
class CollapseOne {
  $toggle: any;
  $target: any;
  actived: string;
  ready: string;
  duration: number;
  isActived: boolean;

  constructor($toggle) {
    let dataTarget = $toggle.getAttribute('data-target') || '',
        $targets = document.querySelectorAll(dataTarget);

    // Dieu kien tiep tuc thuc hien
    if( !$targets.length ) return;

    // Luu tru bien
    this.$toggle = $toggle;
    this.$target = $targets[0];
    this.actived = 'collapse-actived';
    this.ready = 'collapse-ready';
    this.duration = parseFloat($toggle.getAttribute('data-duration'), 10) || 400 ;

    // Chen class 'dropdown-target' vao $target
    this.addClass(this.$target, 'collapse-target');

    // Kiem tra actived luc ban bau
    this.ActivedAtBegin();

    // Event Tap
    this.EventTap();
  }

  private hasClass($node, strClass) {
    let classOnNode = $node.getAttribute('class') || '';
    return (classOnNode.indexOf(strClass) !== -1) ? true : false;
  }
  private removeWS(str) {
    return str.replace(/(^\s+)|(\s+$)/g, '').replace(/(\s\s+)/g, ' ');
  }
  private addClass($nodes, strClass) {
    let arrClass = strClass.split(' ');

    // Convert one node to array
    if( !!$nodes.nodeType ) $nodes = [$nodes];

    // Loop to get all node in array
    for( let i = 0, len = $nodes.length; i < len; i++ ) {
      let $nodeCur = $nodes[i];
      let classOnNode = $nodeCur.getAttribute('class') || '';

      for( let key in arrClass ) {
        if( classOnNode.indexOf(arrClass[key]) === -1 ) {
          $nodeCur.setAttribute('class', this.removeWS(classOnNode +' '+ arrClass[key]) );
        }
      }
    }
  }
  private removeClass($nodes, strClass) {
    let arrClass = strClass.split(' ');

    // Convert one node to array
    if( !!$nodes.nodeType ) $nodes = [$nodes];

    // Loop to get all node in array
    for( let i = 0, len = $nodes.length; i < len; i++ ) {
      let $nodeCur = $nodes[i];
      let classOnNode = $nodeCur.getAttribute('class') || '';

      // Support remove multi class
      for( let key in arrClass ) {
        if( classOnNode.indexOf(arrClass[key]) !== -1 ) {
          classOnNode = this.removeWS(classOnNode.replace(arrClass[key], ''));
          classOnNode === '' ? $nodeCur.removeAttribute('class')
                             : $nodeCur.setAttribute('class', classOnNode);
        }
      }
    }
  }
  private css($nodes, styles) {
    // Convert to Array
    if( !!$nodes.nodeType ) $nodes = [$nodes];

    // Loop to get all Element in Array
    for( let i = 0, len = $nodes.length; i < len; i++ ) {
      let $nodeCur = $nodes[i];
      for( let key in styles ) {
        $nodeCur.style[key] = styles[key];
      }
    }
  }

  // Event Tap tren Button-Toggle
  EventTap() {
    let that = this;

    that.$toggle.addEventListener('click', function(e) {
      if( that.hasClass(that.$toggle, that.actived) ) {
        that.Deactived();
      }
      else {
        that.Actived(true);
      }

      // Don't scrolltop with href="#"
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    });
  }

  private Actived(isAnimation) {
    let actived = this.actived;
    this.isActived = true;
    this.addClass(this.$toggle, actived);
    this.addClass(this.$target, actived);

    if( isAnimation ) {
      // Animation Height cho $target
      this.AnimateHeight(0);
    }
    else {
      this.css(this.$target, { height: 0 });
    }
  }
  private Deactived() {
    let actived = this.actived;
    this.isActived = false;
    this.removeClass(this.$toggle, actived);

    // Doi tuong $target
    this.addClass(this.$target, this.ready);
    this.css(this.$target, { height: '' });

    var hEnd = this.$target.offsetHeight;
    this.css(this.$target, { height: 0 });
    this.removeClass(this.$target, this.ready);

    // Animation Height cho $target
    this.AnimateHeight(hEnd);
  }
  private ActivedAtBegin() {
    let dataActived = this.$toggle.getAttribute('data-actived') || false;
    if( dataActived === 'true' || dataActived === true ) {
      this.Actived(false);
    }
  }

  private AnimateHeight(hEnd) {
    // Request Animation Frame
    let requestAnimationFrame = window.requestAnimationFrame
                              || function(callback) { return window.setTimeout(callback, 1000/60) },
        cancelAnimationFrame = window.cancelAnimationFrame
                              || clearTimeout;
    // Variable at begin
    let that = this,
        duration = that.duration,
        hBegin = that.$target.offsetHeight,
        hChange = hEnd - hBegin,
        tBegin = +new Date(),
        tEnd = tBegin + duration;

    // Loop Step function
    cancelAnimationFrame(that.request);
    let Step = function() {
      
      // Lay thoi gian hien tai dang Animation
      let tCur = +new Date() - tBegin;
      if( tCur > duration ) tCur = duration;

      // Thiet lap chieu cao theo thoi gian
      let hCur = hBegin + (hChange * that.Easing['easeOutQuad'](null, tCur, 0, 1, duration));
      that.css(that.$target, { height: hCur + 'px' });

      // Loop action  
      that.request = requestAnimationFrame(Step);

      // End Loop
      if( tCur >= that.duration ) {
        cancelAnimationFrame(that.request);
        
        if( !that.isActived ) {
          // Remove class actived
          that.removeClass(that.$target, that.actived);
          // Remove attribute Height
          that.css(that.$target, { height: '' });
        }
      }
    };
    Step();
  }

  /**
   * Easing for Animation
   * Copyright : Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
   */
  private Easing = {
    // Variable
    // x: percent
    // t: current time (ms)
    // b: beginning value (gia tri 0)
    // c: change in value (gia tri 1)
    // d: duration (ms)
    easeOutQuad: function (x, t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
    }
  }
}


// Toggle-Dropdown Initial
document.addEventListener('DOMContentLoaded', function() {
  new Collapse('.collapse-toggle');
});