module.exports = {
  name: 'ngx-toolbox-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngx-toolbox-utils',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
