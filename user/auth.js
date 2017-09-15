$(function(){
	$.extend(WorkoutLog, {
		// signup method
		signup: function(){
			// username & password variables
			var name = $("#su_name").val();
			var username = $("#su_username").val();
			var password = $("#su_password").val();
			// user object
			var user = {
				user: {
					username: username,
					password: password,
					name: name
				}
			};
			// signup post
			var signup = $.ajax({
				type:"POST",
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			});

			// signup done/fail
			signup.done(function(data){
				if (data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();	
				}

				$("#signup-modal").modal("hide");
				$(".invisible").removeClass("invisible");
				$("#loginout").text("Log Out");
				$("#su_username").val("");
				$("#su_password").val("");
				$("#su_name").val("");
				$('a[href="#profile"]').tab("show");
				$("#helloName").replaceWith('<span id="helloName">Nice to meet you, ' + data.user.name + '!</span>');
				$("#prompt").replaceWith('<span id="promt">Tell us about your workout</span>');
				
			}).fail(function(){
				$("#su_error").text("Hmm... Something happened with your sign up.").show();
			});
		},

		// login

		login: function() {
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = {user: {username: username, password: password }}
			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify(user),
				contentType: "application/json"
			});

			login
			.done(function(data) {
				if (data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.log.fetchAll();
				}

				$("#login-modal").modal("hide");
				$(".invisible").removeClass("invisible");
				$("#loginout").text("Log Out");

				$("#li_username").val("");
				$("#li_password").val("");
				$('a[href="#log"]').tab("show");

				$("#helloName").replaceWith('<span id="helloName">Welcome back, ' + data.user.name + '!</span>');
				$("#prompt").replaceWith('<span id="promt">Edit your workout</span>');
				// Get first name with data.user

			})

			.fail(function(){
				$("#li_error").text("Huh... Something happened during log in. ").show();
			});
		},

		loginout:function(){
			if (window.localStorage.getItem("sessionToken")){
				window.localStorage.removeItem("sessionToken");
				location.reload();
			}
		}
	});

	// bind events
	$("#login").on("click", WorkoutLog.login);
	$("#signup").on("click", WorkoutLog.signup);
	$("#logoutTab").on("click", WorkoutLog.loginout);

});