require('should');

describe('myfn', function(done){
  it('should be true', function(){
    //yield ...
    true.should.be.true;
  });
});

describe('myfn generator', function(done){
  it('should be true', function*(){
    //yield ...
    true.should.be.true;
  });
});
