(function fn($) {
  /**
   * Super Mario Coin
   */
  $.fn.coin = function coin(coinClass, content, trail) {
    coinClass = coinClass || 'coin';
    content = content || '&#10004;';
    trail = trail || '75px';
    var offset = this.offset();
    var $coin = $('<div>', { class: coinClass })
      .css({ position: 'absolute', top: offset.top, left: offset.left })
      .html(content);
    $('body').append($coin);
    $coin.animate({ top: '-=' + trail, opacity: ['0', 'linear'] }, 1500, 'swing', function fn() {
      this.remove();
    });
  };

  /**
   * Sort divs
   */
  $.fn.sortDivs = function sortDivs() {
    function decSort(a, b) {
      var aa = $(a).attr('data-sort');
      var bb = $(b).attr('data-sort');
      if (!aa || !bb) return false;
      return aa.toLowerCase() < bb.toLowerCase() ? -1 : 1;
    }
    $('> div', this[0]).sort(decSort).appendTo(this[0]);
  };

  /**
   * setCookie
   */
  if (!$.setCookie) {
    $.extend({
      setCookie: function setCookie(name, value, days) {
        var daysNum = days || 365;
        var date = new Date();
        date.setTime(date.getTime() + (daysNum * 24 * 60 * 60 * 1000));
        var expires = '; expires=' + date.toUTCString();
        window.document.cookie = name + '=' + (value || '') + expires + '; path=/';
        return value;
      },
    });
  }

  /**
   * getCookie
   */
  if (!$.getCookie) {
    $.extend({
      getCookie: function getCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      },
    });
  }

  /**
   * eraseCookie
   */
  if (!$.eraseCookie) {
    $.extend({
      eraseCookie: function eraseCookie(name) {
        $.setCookie(name, '', -1);
      },
    });
  }

  /**
   * copyToClip
   */
  $.fn.copyToClip = function copyToClip() {
    var txt = this.val();
    this.val(txt).select();
    document.execCommand('copy');
    return false;
  };
}(jQuery));
