requirejs.config({
  shim: {
    'socket.io': {
      exports: 'io'
    }
  },
  paths: {
    'jquery': 'components/jquery/jquery',
    'socket.io': 'components/socket.io-client/dist/socket.io',
    'decaying-accumulator': 'components/decaying-accumulator/DecayingAccumulator'
  }
});

require(['jquery', 'socket.io', 'decaying-accumulator'], function ($, io, DecayingAccumulator) {
  $(function () {
    var dac;
    $.getJSON('/status.json', function (data) {
      dac = new DecayingAccumulator(data);
      window.setInterval(
        function () {
          $('meter').val(dac.currentValue());
        },
        50
      );
    });

    var socket = io.connect('http://' + window.location.hostname);
    socket.on('vote', function (data) {
      dac.nudge(data);
    });

    $('button').click(function () {
      var vote = $(this).data('vote');
      socket.emit('vote', vote);
      dac.nudge(vote);
    });
  });
});
