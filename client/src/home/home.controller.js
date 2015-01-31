App.controller('home', function (page) {
  console.log('home controller loaded');
  $(page)
    .find('.app-button')
    .on('click', function () {

      console.log('Test button clicked');
    });
});
