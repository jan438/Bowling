'use strict';
var Bowling = {};
const pincards = 10;
const pilecards = 3;
var pinposition = new Array(pincards);
pinposition[0] = [-250, -250];
pinposition[1] = [-150, -250];
pinposition[2] = [-50, -250];
pinposition[3] = [50, -250];
pinposition[4] = [-200, -100];
pinposition[5] = [-100, -100];
pinposition[6] = [0, -100];
pinposition[7] = [-150, 50];
pinposition[8] = [-50, 50];
pinposition[9] = [-100, 200];
var pileposition = new Array(pilecards);
pileposition[0] = [150, -50];
pileposition[1] = [250, -50];
pileposition[2] = [350, -50];
var cardxpos;
var cardypos;
var delay;
var pileone;
var piletwo;
var pilethree;
const deltaxpos = 5;
const deltaypos = 15;
const minpileone = 145;
const maxpileone = 180;
const minpiletwo = 245;
const maxpiletwo = 280;
const minpilethree = 345;
const maxpilethree = 380;
var longpress = false;
var presstime = 1000;
var shortpress = false;
var startTime, endTime;
var countballselected;
var countpinselected;
var pinstocheck;
var balltocheck;
function cardtosymbols(card) {
	var symbols = "";
	var symbol1 = "";
	var symbol2 = "";
	switch (card.suit) {
		case 1: symbol1 = "♥";
			break;
		case 3: symbol1 = "♦";
			break;
	}
	switch (card.rank) {
		case 10:symbol2 = "0";
			break;
		case 9: symbol2 = "9";
			break;
		case 8: symbol2 = "8";
			break;
		case 7: symbol2 = "7";
			break;
		case 6: symbol2 = "6";
			break;
		case 5: symbol2 = "5";
			break;
		case 4: symbol2 = "4";
			break;
		case 3: symbol2 = "3";
			break;
		case 2: symbol2 = "2";
			break;
		case 1: symbol2 = "A";
			break;
	}
	symbols = symbol1 + symbol2;
	return symbols;
}
function validate(pincards, ballcard) {
	var sum = 0;
	var valid = false;
	for (var i = 0; i < pincards.length; i++) {
		console.log("Validate pins " + pincards[i].rank);
		if (pincards[i].rank !== 10) sum = sum + pincards[i].rank;
	}
	if (ballcard != null) {
		console.log("Validate ball " + ballcard.rank);
		if (sum > 9) sum = sum % 10;
		valid = (sum === (ballcard.rank % 10));
	}
	if (valid) {
		for (var i = 0; i < pincards.length; i++) {
			$("#" + pincards[i].$el.id).removeClass('pinselected');
			$("#" + pincards[i].$el.id).hide();
		}
		$("#" + ballcard.$el.id).removeClass('ballselected');
		$("#" + ballcard.$el.id).hide();
	}
	return valid;
}
var Deck = (function () {
  'use strict';
  var ticking;
  var animations = [];
  function animationFrames(delay, duration) {
    var now = Date.now();
    var start = now + delay;
    var end = start + duration;
    var animation = {
      start: start,
      end: end
    };
    animations.push(animation);
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
    var self = {
      start: function start(cb) {
        animation.startcb = cb;
        return self;
      },
      progress: function progress(cb) {
        animation.progresscb = cb;
        return self;
      },
      end: function end(cb) {
        animation.endcb = cb;
        return self;
      }
    };
    return self;
  }
  function tick() {
    var now = Date.now();
    if (!animations.length) {
      ticking = false;
      return;
    }
    for (var i = 0, animation; i < animations.length; i++) {
      animation = animations[i];
      if (now < animation.start) {
        continue;
      }
      if (!animation.started) {
        animation.started = true;
        animation.startcb && animation.startcb();
      }
      var t = (now - animation.start) / (animation.end - animation.start);
      animation.progresscb && animation.progresscb(t < 1 ? t : 1);
      if (now > animation.end) {
        animation.endcb && animation.endcb();
        animations.splice(i--, 1);
        continue;
      }
    }
    requestAnimationFrame(tick);
  }
  window.requestAnimationFrame || (window.requestAnimationFrame = function (cb) {
    setTimeout(cb, 0);
  });
  var style = document.createElement('p').style;
  var memoized = {};
  function prefix(param) {
    if (typeof memoized[param] !== 'undefined') {
      return memoized[param];
    }
    if (typeof style[param] !== 'undefined') {
      memoized[param] = param;
      return param;
    }
    var camelCase = param[0].toUpperCase() + param.slice(1);
    var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
    var test;
    for (var i = 0, len = prefixes.length; i < len; i++) {
      test = prefixes[i] + camelCase;
      if (typeof style[test] !== 'undefined') {
        memoized[param] = test;
        return test;
      }
    }
  }
  var has3d;
  function translate(a, b, c) {
    typeof has3d !== 'undefined' || (has3d = check3d());
    c = c || 0;
    if (has3d) {
      return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
    } else {
      return 'translate(' + a + ', ' + b + ')';
    }
  }
  function check3d() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
      return false;
    }
    var transform = prefix('transform');
    var $p = document.createElement('p');
    document.body.appendChild($p);
    $p.style[transform] = 'translate3d(1px,1px,1px)';
    has3d = $p.style[transform];
    has3d = has3d != null && has3d.length && has3d !== 'none';
    document.body.removeChild($p);
    return has3d;
  }
  function createElement(type) {
    return document.createElement(type);
  }
  var maxZ = 52;
  function _card(i) {
	var transform = prefix('transform');
	var tempvar;
	if ((i >= 0) && (i < 10)) {
		tempvar = i + 13;
	}
	if ((i >= 10) && (i < 20)) {
		tempvar = i + 29;
	}
	var rank = tempvar % 13 + 1;
	var suit = tempvar / 13 | 0;
	var z = (52 - tempvar) / 4;
	var $el = createElement('div');
	$el.id = 'card' + i;
	var $face = createElement('div');
	var $back = createElement('div');
	var isDraggable = false;
	var isFlippable = false;
	var self = { tempvar: tempvar, rank: rank, suit: suit, pos: tempvar, $el: $el, mount: mount, unmount: unmount, setSide: setSide };
	var modules = Deck.modules;
	var module;
	$face.classList.add('face');
	$back.classList.add('back');
	$el.style[transform] = translate(-z + 'px', -z + 'px');
	self.x = -z;
	self.y = -z;
	self.z = z;
	self.rot = 0;
	self.setSide('back');
	addListener($el, 'mousedown', onMousedown);
	addListener($el, 'touchstart', onMousedown);
	for (module in modules) {
		addModule(modules[module]);
	}
	self.animateTo = function (params) {
		var delay = params.delay;
		var duration = params.duration;
		var _params$x = params.x;
		var x = _params$x === undefined ? self.x : _params$x;
		var _params$y = params.y;
		var y = _params$y === undefined ? self.y : _params$y;
		var _params$rot = params.rot;
		var rot = _params$rot === undefined ? self.rot : _params$rot;
		var ease$$ = params.ease;
		var onStart = params.onStart;
		var onProgress = params.onProgress;
		var onComplete = params.onComplete;
		var startX, startY, startRot;
		var diffX, diffY, diffRot;
		animationFrames(delay, duration).start(function () {
			startX = self.x || 0;
			startY = self.y || 0;
			startRot = self.rot || 0;
			onStart && onStart();
		}).progress(function (t) {
			var et = ease[ease$$ || 'cubicInOut'](t);
			diffX = x - startX;
			diffY = y - startY;
			diffRot = rot - startRot;
			onProgress && onProgress(t, et);
			self.x = startX + diffX * et;
			self.y = startY + diffY * et;
			self.rot = startRot + diffRot * et;
			$el.style[transform] = translate(self.x + 'px', self.y + 'px') + (diffRot ? 'rotate(' + self.rot + 'deg)' : '');
		}).end(function () {
			onComplete && onComplete();
		});
	};
	self.setRankSuit = function (rank, suit) {
		var suitName = SuitName(suit);
		$el.setAttribute('class', 'card ' + suitName + ' rank' + rank);
	};
	self.setRankSuit(rank, suit);
	self.enableDragging = function () {
		if (isDraggable) {
			return;
		}
		isDraggable = true;
		$el.style.cursor = 'move';
	};
	self.enableFlipping = function () {
		if (isFlippable) {
			return;
		}
		isFlippable = true;
	};
	self.disableFlipping = function () {
		if (!isFlippable) {
			return;
		}
		isFlippable = false;
	};
	self.disableDragging = function () {
		if (!isDraggable) {
			return;
		}
		isDraggable = false;
		$el.style.cursor = '';
	};
	return self;
	function addModule(module) {
		module.card && module.card(self);
	}
	function onMousedown(e) {
		startTime = new Date().getTime();
		countpinselected = 0;
		countballselected = 0;
		for (var i = 0; i < 52; i++) {
			if ($("#card" + i).hasClass('pinselected')) countpinselected = countpinselected + 1;
			if ($("#card" + i).hasClass('ballselected')) countballselected = countballselected + 1;
		}
		if (self.x >= minpileone && self.x <= maxpileone) {
			console.log("1: " + cardtosymbols(self));
			if ($("#" + pileone[pileone.length - 1].$el.id).hasClass('ballselected')) $("#" + pileone[pileone.length - 1].$el.id).removeClass('ballselected');
			else if (countballselected === 0) {
				$("#" + pileone[pileone.length - 1].$el.id).addClass('ballselected');
				balltocheck = self;
			}
		}
		if (self.x >= minpiletwo && self.x <= maxpiletwo) {
			console.log("2: " + cardtosymbols(self));
			if ($("#" + piletwo[piletwo.length - 1].$el.id).hasClass('ballselected')) $("#" + piletwo[piletwo.length - 1].$el.id).removeClass('ballselected');
			else if (countballselected === 0) {
				$("#" + piletwo[piletwo.length - 1].$el.id).addClass('ballselected');
				balltocheck = self;
			}
		}
		if (self.x >= minpilethree && self.x <= maxpilethree) {
			console.log("3: " + cardtosymbols(self));
			if ($("#" + pilethree[pilethree.length - 1].$el.id).hasClass('ballselected')) $("#" + pilethree[pilethree.length - 1].$el.id).removeClass('ballselected');
			else if (countballselected === 0) {
				$("#" + pilethree[pilethree.length - 1].$el.id).addClass('ballselected');
				balltocheck = self;
			}
		}
		for (var i = 0; i < pincards; i++) {
			if (self.x === pinposition[i][0] && self.y === pinposition[i][1]) {
				console.log("Pin: " + i + " selected");
				if ($("#" + $el.id).hasClass('pinselected')) {
					$("#" + $el.id).removeClass('pinselected');
					var index = pinstocheck.indexOf(self);
					pinstocheck.splice(index, 1);
				}
				else if (countpinselected < 3) {
					$("#" + $el.id).addClass('pinselected');
					pinstocheck.push(self);
				}
			}
		}
		var startPos = {};
		var pos = {};
		e.preventDefault();
		if (e.type === 'mousedown') {
			startPos.x = pos.x = e.clientX;
			startPos.y = pos.y = e.clientY;
			addListener(window, 'mousemove', onMousemove);
			addListener(window, 'mouseup', onMouseup);
		} else {
			startPos.x = pos.x = e.touches[0].clientX;
			startPos.y = pos.y = e.touches[0].clientY;
			addListener(window, 'touchmove', onMousemove);
			addListener(window, 'touchend', onMouseup);
		}
		if (!isDraggable) {
			return;
		}
		$el.style[transform] = translate(self.x + 'px', self.y + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
		$el.style.zIndex = maxZ++;
		function onMousemove(e) {
			if (!isDraggable) {
				return;
			}
			if (e.type === 'mousemove') {
				pos.x = e.clientX;
				pos.y = e.clientY;
			} else {
				pos.x = e.touches[0].clientX;
				pos.y = e.touches[0].clientY;
			}
			$el.style[transform] = translate(Math.round(self.x + pos.x - startPos.x) + 'px', Math.round(self.y + pos.y - startPos.y) + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
		}
		function onMouseup(e) {
			endTime = new Date().getTime();
			if (endTime - startTime < presstime) {
				shortpress = true;
				longpress = false;
			}
			else
			if (endTime - startTime >= presstime) {
				longpress = true;
				shortpress = false;
			}
			if (longpress) {
				var valid = validate(pinstocheck, balltocheck);
				if (valid) {
					if (self.x >= minpileone && self.x <= maxpileone) {
						pileone.splice(-1,1);
						if (pileone.length > 0) pileone[pileone.length -1].setSide('front');
					}
					if (self.x >= minpiletwo && self.x <= maxpiletwo) {
						piletwo.splice(-1,1);
						if (piletwo.length > 0) piletwo[piletwo.length -1].setSide('front');
					}
					if (self.x >= minpilethree && self.x <= maxpilethree) {
						pilethree.splice(-1,1);
						if (pilethree.length > 0) pilethree[pilethree.length -1].setSide('front');
					}
					pinstocheck = [];
				}
			}
			if (e.type === 'mouseup') {
				removeListener(window, 'mousemove', onMousemove);
				removeListener(window, 'mouseup', onMouseup);
			} else {
				removeListener(window, 'touchmove', onMousemove);
				removeListener(window, 'touchend', onMouseup);
			}
			if (!isDraggable) {
				return;
			}
			self.x = self.x + pos.x - startPos.x;
			self.y = self.y + pos.y - startPos.y;
		}
	}
	function mount(target) {
		target.appendChild($el);
		self.$root = target;
	}
	function unmount() {
		self.$root && self.$root.removeChild($el);
		self.$root = null;
	}
	function setSide(newSide) {
		if (newSide === 'front') {
			if (self.side === 'back') {
				$el.removeChild($back);
			}
			self.side = 'front';
			$el.appendChild($face);
			self.setRankSuit(self.rank, self.suit);
		} else {
			if (self.side === 'front') {
				$el.removeChild($face);
			}
			self.side = 'back';
			$el.appendChild($back);
			$el.setAttribute('class', 'card');
		}
	}
  }
  function SuitName(suit) {
    return suit === 0 ? 'spades' : suit === 1 ? 'hearts' : suit === 2 ? 'clubs' : suit === 3 ? 'diamonds' : 'joker';
  }
  function addListener(target, name, listener) {
    target.addEventListener(name, listener);
  }
  function removeListener(target, name, listener) {
    target.removeEventListener(name, listener);
  }
  var ease = {
    linear: function linear(t) {
      return t;
    },
    quadIn: function quadIn(t) {
      return t * t;
    },
    quadOut: function quadOut(t) {
      return t * (2 - t);
    },
    quadInOut: function quadInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    cubicIn: function cubicIn(t) {
      return t * t * t;
    },
    cubicOut: function cubicOut(t) {
      return --t * t * t + 1;
    },
    cubicInOut: function cubicInOut(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    quartIn: function quartIn(t) {
      return t * t * t * t;
    },
    quartOut: function quartOut(t) {
      return 1 - --t * t * t * t;
    },
    quartInOut: function quartInOut(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    quintIn: function quintIn(t) {
      return t * t * t * t * t;
    },
    quintOut: function quintOut(t) {
      return 1 + --t * t * t * t * t;
    },
    quintInOut: function quintInOut(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };
  var sort = {
    deck: function deck(_deck2) {
      _deck2.sort = _deck2.queued(sort);
      function sort(next, reverse) {
        var cards = _deck2.cards;
        cards.sort(function (a, b) {
          if (reverse) {
            return a.i - b.i;
          } else {
            return b.i - a.i;
          }
        });
        cards.forEach(function (card, i) {
          card.sort(i, cards.length, function (i) {
            if (i === cards.length - 1) {
              next();
            }
          }, reverse);
        });
      }
    },
    card: function card(_card2) {
      var $el = _card2.$el;
      _card2.sort = function (i, len, cb, reverse) {
        var z = i / 4;
        var delay = i * 10;
        _card2.animateTo({
          delay: delay,
          duration: 400,
          x: -z,
          y: -150,
          rot: 0,
          onComplete: function onComplete() {
            $el.style.zIndex = i;
          }
        });
        _card2.animateTo({
          delay: delay + 500,
          duration: 400,
          x: -z,
          y: -z,
          rot: 0,
          onComplete: function onComplete() {
            cb(i);
          }
        });
      };
    }
  };
  function plusminus(value) {
    var plusminus = Math.round(Math.random()) ? -1 : 1;
    return plusminus * value;
  }
  function fisherYates(array) {
    var rnd, temp;
    for (var i = array.length - 1; i; i--) {
      rnd = Math.random() * i | 0;
      temp = array[i];
      array[i] = array[rnd];
      array[rnd] = temp;
    }
    return array;
  }
  function fontSize() {
    return window.getComputedStyle(document.body).getPropertyValue('font-size').slice(0, -2);
  }
  var ____fontSize;
  var shuffle = {
    deck: function deck(_deck3) {
      _deck3.shuffle = _deck3.queued(shuffle);
      function shuffle(next) {
        var cards = _deck3.cards;
        ____fontSize = fontSize();
        fisherYates(cards);
        cards.forEach(function (card, i) {
          card.pos = i;
          card.shuffle(function (i) {
            if (i === cards.length - 1) {
              next();
            }
          });
        });
        return;
      }
    },
    card: function card(_card3) {
      var $el = _card3.$el;
      _card3.shuffle = function (cb) {
        var i = _card3.pos;
        var z = i / 4;
        var delay = i * 2;
        _card3.animateTo({
          delay: delay,
          duration: 200,
          x: plusminus(Math.random() * 40 + 20) * ____fontSize / 16,
          y: -z,
          rot: 0
        });
        _card3.animateTo({
          delay: 200 + delay,
          duration: 200,
          x: -z,
          y: -z,
          rot: 0,
          onStart: function onStart() {
            $el.style.zIndex = i;
          },
          onComplete: function onComplete() {
            cb(i);
          }
        });
      };
    }
  };
  var __fontSize;
  var Bowling = {
    deck: function deck(_deck4) {
      _deck4.Bowling = _deck4.queued(Bowling);
      function Bowling(next) {
		pileone = [];
		piletwo = [];
		pilethree = [];
		pinstocheck = [];
		balltocheck = null;
		$("#td01").html(0);
		$("#td02").html(0);
		$("#td03").html(0);
		$("#td04").html(0);
		$("#td05").html(0);
		$("#td06").html(0);
		$("#td07").html(0);
		$("#td08").html(0);
		$("#td09").html(0);
		$("#td10").html(0);
		$("#td11").html(0);
		$("#td12").html(0);
		$("#td13").html(0);
		$("#td14").html(0);
		$("#td15").html(0);
		$("#td16").html(0);
		$("#td17").html(0);
		$("#td18").html(0);
		$("#td19").html(0);
		$("#td20").html(0);
		$("#td21").html(0);
		$("#to01").html(0);
		$("#to02").html(0);
		$("#to03").html(0);
		$("#to04").html(0);
		$("#to05").html(0);
		$("#to06").html(0);
		$("#to07").html(0);
		$("#to08").html(0);
		$("#to09").html(0);
		$("#to10").html(0);
		$("#to11").html(0);
		var cards = _deck4.cards;
		var len = cards.length;
		__fontSize = fontSize();
		cards.slice(-20).reverse().forEach(function (card, i) {
			card.Bowling(i, len, function (i) {
				if (i < pincards) {
					card.setSide('front');
				}
				else {
					if (i < 15) {
						card.setSide('back');
						pileone.push(card);
						if (i === 14) card.setSide('front');
					}
					else {
						if (i < 18) {
							card.setSide('back');
							piletwo.push(card);
							if (i === 17) card.setSide('front');
						}
						else {
							if (i < 20) {
								card.setSide('back');
								pilethree.push(card);
								if (i === 19) card.setSide('front');
							}
						}
					}
				}
				if (i === 19) {
					next();
				}
			});
		});
      }
    },
    card: function card(_card4) {
	var $el = _card4.$el;
	_card4.Bowling = function (i, len, cb) {
		$("#" + _card4.$el.id).show();
		if (i < pincards) {
			cardxpos = pinposition[i][0];
			cardypos = pinposition[i][1];
		}
		else {
			if (i < 15) {
				cardxpos = pileposition[0][0] + (i - 10) * deltaxpos;
				cardypos = pileposition[0][1] + (i - 10) * deltaypos;
			}
			else {
				if (i < 18) {
					cardxpos = pileposition[1][0] + (i - 15) * deltaxpos;
					cardypos = pileposition[1][1] + (i - 15) * deltaypos;
				}
				else {
					if (i < 20) {
						cardxpos = pileposition[2][0] + (i - 18) * deltaxpos;
						cardypos = pileposition[2][1] + (i - 18) * deltaypos;
					}
				}
			}
		}
		delay = i * 250;
		_card4.animateTo({
			delay: delay,
			duration: 250,
			x: cardxpos,
			y: cardypos,
			rot: 0,
			onStart: function onStart() {
				$el.style.zIndex = len - 1 + i;
			},
			onComplete: function onComplete() {
				cb(i);
			}
		});
	};
    }
  };
  var intro = {
    deck: function deck(_deck5) {
      _deck5.intro = _deck5.queued(intro);
      function intro(next) {
        var cards = _deck5.cards;
        cards.forEach(function (card, i) {
          card.setSide('front');
          card.intro(i, function (i) {
            animationFrames(250, 0).start(function () {
              card.setSide('back');
            });
            if (i === cards.length - 1) {
              next();
            }
          });
        });
      }
    },
    card: function card(_card5) {
      var transform = prefix('transform');
      var $el = _card5.$el;
      _card5.intro = function (i, cb) {
        var delay = 500 + i * 10;
        var z = i / 4;
        $el.style[transform] = translate(-z + 'px', '-250px');
        $el.style.opacity = 0;
        _card5.x = -z;
        _card5.y = -250 - z;
        _card5.rot = 0;
        _card5.animateTo({
          delay: delay,
          duration: 1000,
          x: -z,
          y: -z,
          onStart: function onStart() {
            $el.style.zIndex = i;
          },
          onProgress: function onProgress(t) {
            $el.style.opacity = t;
          },
          onComplete: function onComplete() {
            $el.style.opacity = '';
            cb && cb(i);
          }
        });
      };
    }
  };
  function deg2rad(degrees) {
    return degrees * Math.PI / 180;
  }
  function queue(target) {
    var array = Array.prototype;
    var queueing = [];
    target.queue = queue;
    target.queued = queued;
    return target;
    function queued(action) {
      return function () {
        var self = this;
        var args = arguments;
        queue(function (next) {
          action.apply(self, array.concat.apply(next, args));
        });
      };
    }
    function queue(action) {
      if (!action) {
        return;
      }
      queueing.push(action);
      if (queueing.length === 1) {
        next();
      }
    }
    function next() {
      queueing[0](function (err) {
        if (err) {
          throw err;
        }
        queueing = queueing.slice(1);
        if (queueing.length) {
          next();
        }
      });
    }
  }
  function observable(target) {
    target || (target = {});
    var listeners = {};
    target.on = on;
    target.one = one;
    target.off = off;
    target.trigger = trigger;
    return target;
    function on(name, cb, ctx) {
      listeners[name] || (listeners[name] = []);
      listeners[name].push({ cb: cb, ctx: ctx });
    }
    function one(name, cb, ctx) {
      listeners[name] || (listeners[name] = []);
      listeners[name].push({
        cb: cb, ctx: ctx, once: true
      });
    }
    function trigger(name) {
      var self = this;
      var args = Array.prototype.slice(arguments, 1);
      var currentListeners = listeners[name] || [];
      currentListeners.filter(function (listener) {
        listener.cb.apply(self, args);
        return !listener.once;
      });
    }
    function off(name, cb) {
      if (!name) {
        listeners = {};
        return;
      }
      if (!cb) {
        listeners[name] = [];
        return;
      }
      listeners[name] = listeners[name].filter(function (listener) {
        return listener.cb !== cb;
      });
    }
  }
  function Deck(jokers) {
    var cards = new Array(jokers ? 55 : 20);
    var $el = createElement('div');
    var self = observable({ mount: mount, unmount: unmount, cards: cards, $el: $el });
    var $root;
    var modules = Deck.modules;
    var module;
    queue(self);
    for (module in modules) {
      addModule(modules[module]);
    }
    $el.classList.add('deck');
    var card;
    var tempcard;
    for (var i = cards.length; i; i--) {
      tempcard = _card(i - 1);
      card = cards[i - 1] = tempcard;
      card.mount($el);
    }
    return self;
    function mount(root) {
      $root = root;
      $root.appendChild($el);
    }
    function unmount() {
      $root.removeChild($el);
    }
    function addModule(module) {
      module.deck && module.deck(self);
    }
  }
  Deck.animationFrames = animationFrames;
  Deck.ease = ease;
  Deck.modules = { intro: intro, Bowling: Bowling, shuffle: shuffle, sort: sort };
  Deck.Card = _card;
  Deck.prefix = prefix;
  Deck.translate = translate;
  return Deck;
})();
