import Jasmine from 'jasmine'

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;


var jasmine = new Jasmine()
jasmine.loadConfigFile('jasmine/jasmine.json')

jasmine.env.clearReporters();               // remove default reporter logs
jasmine.env.addReporter(new SpecReporter({  // add jasmine-spec-reporter
  spec: {
    displayPending: true,
    displayStacktrace: true
  }
}));

jasmine.execute()
