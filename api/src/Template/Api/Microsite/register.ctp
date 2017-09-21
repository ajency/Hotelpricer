 
<div class="products form large-9 medium-8 columns content">
    <form name="register_user" id="register_user" method="post" data-parsley-validate>
    <fieldset>
        <legend><?= __('Register') ?></legend>
         <label for="name">Full Name * :</label> : <input type="text" name="name" class="form-control" required><br><br>
         <label for="email">Email * :</label> : <input type="email" name="email" class="form-control" data-parsley-trigger="change" required=""><br><br>
         <label for="phone">Phone * :</label> : <input type="text" name="phone" class="form-control" required data-parsley-type="number" data-parsley-error-message="Please enter 10 digit phone number" data-parsley-length="[10, 10]"><br><br>
         <label for="password">Password * :</label> : <input type="password" name="password" id="password" class="form-control" required data-parsley-length="[6, 15]"><br><br>
         <label for="password">Confirm Password * :</label> : <input type="password" name="confirm_password" id="confirm_password" class="form-control" data-parsley-equalto="#password" required data-parsley-length="[6, 15]"><br><br>
    </fieldset>
    <button type="submit"  class="form-control">Submit</button>
    </form>
</div>

<script src="http://parsleyjs.org/bower_components/jquery/dist/jquery.min.js"></script>
 

    <script src="http://parsleyjs.org/dist/parsley.js"></script>
    <script  >
$(function () {
  $('#register_user').parsley().on('field:validated', function() {
    var ok = $('.parsley-error').length === 0;
    $('.bs-callout-info').toggleClass('hidden', !ok);
    $('.bs-callout-warning').toggleClass('hidden', ok);
  })
  .on('form:submit', function() {
    var register_api_url = "<?php echo $this->Url->build(['controller' => 'Users', 'action' => 'registerUser']); ?>";
    var data = {'name':$('input[name="name"]').val(),
                'email':$('input[name="email"]').val(),
                'phone':$('input[name="phone"]').val(),
                'password':$('input[name="password"]').val()};
    $.ajax({
        url: register_api_url,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
        beforeSend: function () {
            $("button").addClass('disabled').text('Submiting...');
        },
        success: function (data) {
            
            console.log(data);
            if (data.status) {
                //alert(data.message);
                window.location = data.redirect_url;
            }
            else {
                alert(data.message);
                $("button").removeClass('disabled').text('Submit');
            }
        },
        error: function (jXHR, textStatus, errorThrown) {
            alert('Registration failed...');
            $("button").removeClass('disabled').text('Submit');
        }
    });
    return false; // Don't submit form for this demo
  });
});
    </script>