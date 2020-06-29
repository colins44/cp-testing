<script runat=server>
  // page can be found at https://cloud.em.luxuryescapes.com/cp_test
  Platform.Load("Core", "1");

  var deAuthentication    = "System - Authentication"

  function getApiData(url) {
        var access_token    = Platform.Function.Lookup(deAuthentication, 'value', 'key', 'api_access_token');
        var headerNames     = ["Cookie"];
        var headerValues    = [access_token];
        var response        = HTTP.Get(url, headerNames, headerValues)

        if (response.Status != 0 ) {
            //logError('Not OK status for getApiData url: ' + url)
        } else {
          return response
        }

    }

  var offerId         = "0062y000002GRtDAAW"
  var packageId       = "a0s2y0000012civAAA"

  var url             = 'https://api.luxgroup.com/api/public-offer-feed/offer/' + offerId;

  var response = getApiData(url)

  var status                   = response.Status
  var body               = Platform.Function.ParseJSON(response.Content);
  var inclusionHighlights;

  // set inclusionHighlightsHtml to start with a html unordered list
  var inclusionHighlightsHtml = "<ul><li>this is a test element</li>"

    for (i = 0; i < body.packages.length; i++){
      if (body.packages[i]['unique_key'] == packageId) {
        inclusionHighlights = body.packages[i]['inclusion_highlights_html']
      }
    }

    // add each inclusion hightlight html list element to it
    //for (i = 0: i < inclusionHighlights.length; i++) {
    //  inclusionHighlightsHtml += inclusionHighlights[i]
    //}

  // ensure that you close off the unorder list
  inclusionHighlightsHtml += "</ul>"


  Variable.SetValue("@status", status)
  Variable.SetValue("@inclusionHighlightsHtml", inclusionHighlightsHtml)
  Variable.SetValue("@inclusionHighlights", inclusionHighlights)

</script>
%%=v(@inclusionHighlightsHtml)=%%
