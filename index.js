<script runat=server>
  // page can be found at https://cloud.em.luxuryescapes.com/cp_test
  Platform.Load("Core", "1.1.5");
  Platform.Function.ContentBlockByKey('ssjs-lib');

  var debugMode = ['console'];
  debug('we are testing here');
  console_log('is the console.log working')
  cloudpage('login')


  Write(" <button type="button" onclick="logout()">Click Me!</button> ")
</script>

