$(function(){

var WorkoutLog = (function($, undefined) {               // THIS IS THE ENTIRE APP. WorkoutLog = a giant IFFE. A self-calling function. "extend" allows this object to extend across files. Methods and other objects can then be added elsewhere.
      var API_BASE = "https://workout-buddy-api.herokuapp.com/api/";
      // var API_BASE = "http://localhost:3000/api/"
      var userDefinitions = [];

      var setAuthHeader = function(sessionToken) {
         window.localStorage.setItem("sessionToken", sessionToken);
         // Set the authorization header
         // This can be done on individual calls
         // here we showcase ajaxSetup as a global tool
         $.ajaxSetup({
            "headers": {
               "Authorization": sessionToken
            }
         });
      };

      // public
      return {
         API_BASE: API_BASE,
         setAuthHeader: setAuthHeader
      };
   })(jQuery);

   // Ensure .disabled aren't clickable
   $(".nav-tabs a[data-toggle=tab]").on("click", function(e) {
      var token = window.localStorage.getItem("sessionToken");
      if ($(this).hasClass("disabled") && !token) {
         e.preventDefault();
         return false;
      }
   });

   // Show Other input and hide it on save
    $("#def-description").hide();

    $("#other").click(function(){
      $("#def-description").show();
      $("#other").hide();
    });

    $("#def-save").click(function(){
      $("#def-description").hide();
      $("#other").show();
    })

   // Focus cursor on modal when opened
   $("#login-modal").on('shown.bs.modal', function () {
    $('#li_username').focus();
   })

   // Focus cursor on modal when opened
   $("#signup-modal").on('shown.bs.modal', function () {
    $('#su_name').focus();
   })

   // bind tab change events
   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href"); // activated tab
      if (target === "#log") {
        WorkoutLog.log.setDefinitions();
      }

      if (target === "#update-log") {
      	WorkoutLog.log.setDefinitions();
      }

      if (target === "#history") {
        WorkoutLog.log.setHistory();
      }
   });

   // When clicked, allow profile edit
   $("#promptBtn").click(function(event){
    event.preventDefault();
    $('.inputDisabled').removeAttr("disabled")
    $('.toggleImage').removeClass("halfOpacity")
   });

   // Disabling after save
   $("#def-save").click(function(event){
    event.preventDefault();
    $('.inputDisabled').attr('disabled','disabled')
    $('.toggleImage').addClass("halfOpacity")
   });

   // bind enter key
   $(document).on("keypress", function(e) {
      if (e.which === 13) { // enter key
         if ($("#signup-modal").is(":visible")) {
            $("#signup").trigger("click");
         }
         if ($("#login-modal").is(":visible")) {
            $("#login").trigger("click");
         }
      }
   });
   // setHeader if we
   var token = window.localStorage.getItem("sessionToken");
   if (token) {
      WorkoutLog.setAuthHeader(token); 
   }

   // expose this to the other workoutlog modules
   window.WorkoutLog = WorkoutLog;


});