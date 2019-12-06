<script runat=server>
    Platform.Load("core", "1");
    var response = HTTP.Get('https://api.luxgroup.com/api/public-offers?limit=200');
    Write(response.Status + '<br />');
    Write(response.Content);
    var region = "AU"
    var frontPageDE = DataExtension.Init("E8C0D2E0-F86F-4E87-8AC4-DB8E6AF39A5D")
    var data = Platform.Function.ParseJSON(response.Content)
    var results = data.result
    var schedules = []
    for (var i = 0, len = result.length; i < len; i++) {
      var result = results[i]
      schedules.push(result.list_visibility_schedules)
    }
    for (var i = 0, len = schedules.length; i < len; i++) {
      var schedule = schedules[i]
      var localSchedule = schedule[region]
      frontPageDE.Rows.Update(
      {
          id: localSchedule.id,
          region: localSchedule.region,
          start: localSchedule.start,
          end: localSchedule.end,
          type: localSchedule.type,
          offer_id_salesforce_external: localSchedule.offer_id_salesforce_external,
          brand: localSchedule.brand
      },
      ["id"],
      [localSchedule.id]
      );
    }
    )})
</script>

