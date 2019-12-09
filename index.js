<script runat=server>
    Platform.Load("core", "1");

    var upsertRow = function(api, localSchedule) {
      var updateObject = {
          CustomerKey: 'DE_Example',
          Properties: [
              {
                  Name: 'id',
                  Value: localSchedule.id
              },
              {
                  Name: 'region',
                  Value: localSchedule.region
              },
              {
                  Name: 'ModifiedDate',
                  Value: Platform.Function.Now()
              },
              {
                  Name: 'brand',
                  Value: localSchedule.brand
              },
              {
                  Name: 'start',
                  Value: localSchedule.start
              },
              {
                  Name: 'end',
                  Value: localSchedule.end
              },
              {
                  Name: 'type',
                  Value: localSchedule.type
              },
              {
                  Name: 'offer_id_salesforce_external',
                  Value: localSchedule.offer_id_salesforce_external
              }
          ]
      };
      Write('<br />');
      Write(Stringify(updateObject))
      var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};
      try {
        var res = api.updateItem('DataExtensionObject', updateObject, options);
        Write(Stringify(res))
      } catch (err) {
        Write("something went wron")
        Write(Stringify(err.message))
      }
    }

    var response = HTTP.Get('https://api.luxgroup.com/api/public-offers?limit=200');
    Write(response.Status + '<br />');
    var region = "AU"
    var frontPageDE = DataExtension.Init("E8C0D2E0-F86F-4E87-8AC4-DB8E6AF39A5D")
    var data = Platform.Function.ParseJSON(response.Content)
    var results = data.result
    var schedules = []
    for (var i = 0, len = results.length; i < len; i++) {
      var result = results[i]
      schedules.push(result.list_visibility_schedules)
    }
    Write('<br />');
    //var api = new Script.Util.WSProxy();
    for (var i = 0, len = schedules.length; i < len; i++) {
      var schedule = schedules[i]
      var localSchedule = schedule[region]
      Write(Stringify(localSchedule))
      Write('<br />');

     upsertRow(api, localSchedule)
    }
</script>
