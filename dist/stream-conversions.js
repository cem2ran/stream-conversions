(function (exports,rx,most) {
  'use strict';

  function isMost(stream) {
    if (typeof stream.observe !== 'function') {
      throw new Error('Stream provided is not a most.js stream');
    }
  }

  function isRx(stream) {
    if (typeof stream.subscribe !== 'function') {
      throw new Error('Stream provided is not a rx stream');
    }
  }

  function rxToMost(stream) {
    isRx(stream);
    return most.create(function (add, end, error) {
      stream.subscribe(add, error, end);
    });
  }

  function rxToRx(stream) {
    isRx(stream);
    return stream;
  }



  var rx$1 = Object.freeze({
  	toRx: rxToRx,
  	toMost: rxToMost
  });

  function mostToMost(stream) {
    isMost(stream);
    return stream;
  }

  function mostToRx(stream) {
    isMost(stream);
    return rx.Observable.create(function (observer) {
      stream.observe(function (x) {
        return observer.onNext(x);
      }).then(function (x) {
        return observer.onCompleted(x);
      }).catch(function (x) {
        return observer.onError(x);
      });
    });
  }



  var most$1 = Object.freeze({
  	toRx: mostToRx,
  	toMost: mostToMost
  });

  exports.most = most$1;
  exports.rx = rx$1;

}((this.streamConversions = {}),Rx,most));
//# sourceMappingURL=stream-conversions.js.map