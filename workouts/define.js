$(function(){
	$.extend(WorkoutLog, {
		definition: {
			userDefinitions: [],

			create: function(){
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				};
				var postData = {definition: def};
				var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				define.done(function(data){
					WorkoutLog.definition.userDefinitions.push(data.definition);
					$("#def-description").val("");
					WorkoutLog.definition.fetchAll()
					$('a[href="#log"]').tab("show");
				});
			},

			fetchAll: function(){
				var fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "definition",
					headers: {
						"authorization":window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data){
					WorkoutLog.definition.userDefinitions = data;
				})
				.fail(function(err){
					console.log(err);
				});
			}

		}
	});

	// bindings
	$("#def-save").on("click", WorkoutLog.definition.create);		// This is where we create a workout definition or category

// fetch definitions if we are already authenticated and refreshed
	if (window.localStorage.getItem("sessionToken")){				// When there is a sessionToken, grab all the workout categories (definition types)
		WorkoutLog.definition.fetchAll();
	}
});