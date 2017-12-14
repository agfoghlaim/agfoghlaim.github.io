  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjrinmvvu1HZ3bn140W1ZRDL4HZwpxL50",
    authDomain: "agfoghlaim-86aa5.firebaseapp.com",
    databaseURL: "https://agfoghlaim-86aa5.firebaseio.com",
    projectId: "agfoghlaim-86aa5",
    storageBucket: "agfoghlaim-86aa5.appspot.com",
    messagingSenderId: "886048617658"
  };
  firebase.initializeApp(config);

  var messagesRef = firebase.database().ref('messages');

  function saveToFb(theData){
    console.log("hi marie ", theData)
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      theData:theData
    }).then(
        function(){
            fbSuccess();
    }).catch(
        function(error) {
            fbFail(error);
    });
  }


                function fbSuccess() {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent, thank you. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                }
                function fbFail(error){
                    console.log("fail ", error);
                    
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry something went wrong. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");

                }

$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var theData = {name:name, email:email, phone:phone, message:message};
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
           
           saveToFb(theData);
         

        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
