import {LogService} from './lib';

describe('logService', function() {

  var service: LogService;

  beforeEach(function() {

        spyOn(window.console, 'log').and.callThrough();
        service = new LogService(window.console);

  });


  it('Check log service -> ERROR ', function() {

        var expected = '[ERROR] An error occured';
        service.log('ERROR', 'An error occured');

        expect(console.log).toHaveBeenCalledWith(expected);
  });

});



