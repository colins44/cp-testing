<script runat=server>
  // page can be found at https://cloud.em.luxuryescapes.com/cp_test
  Platform.Load("Core", "1");
  Platform.Function.ContentBlockByKey('ssjs-lib');

  function SHA256(string,encoding) {
    var varName = '@amp__SHA256';
  
    // AMP decleration
    var amp = "\%\%[ ";
    // function open
    amp += "set "+varName+" = SHA256(";
    // parameters
    amp += "'" + string + "'";
    if(encoding) {
        amp += "'" + encoding + "'";
    }
    // function close
    amp += ") ";
    // output
    amp += "output(concat("+varName+")) ";
    // end of AMP
    amp += "]\%\%";
  
    return Platform.Function.TreatAsContent(amp);
  }

  var debugMode = ['console'];
  debug('we are testing here');
  console_log('is the console.log working')
  console_log(SHA256('wcmzCeXAALRTAdjgerfgyhhnbDDF'))

</script>

