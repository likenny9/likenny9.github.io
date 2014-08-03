<html>
<head>
  <title>Contact Kenny</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="./css/main.css"> 

  <?php
    
    $nameErr = $emailErr = $messageErr = "";
    $name = $email = $message = "";
    

    if($_SERVER["REQUEST_METHOD"] == "POST") {
      if(empty($_POST["name"])) {
        $nameErr = " - Name is required!";
      }
      else {
        $name = securityTest($_POST["name"]);
        if(!preg_match("/^[a-zA-Z ]*$/",$name)) {
          $nameErr = " - Only letters and white space allowed";
        }
      }
      if(empty($_POST["email"])) {
        $emailErr = " - Email is required!";
      }
      else {
        $email = securityTest($_POST["email"]);
        if(!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) {
          $emailErr = " - Invalid email";
        }        
      }
      if(empty($_POST["message"])) {
        $messageErr = " - Message is required!";
      }
      else {
        $message = securityTest($_POST["message"]);
      } 
    }

    function securityTest($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
    }

    function spamFilter($data) {
      $data = filter_var($data, FILTER_SANITIZE_EMAIL);
      if(filter_var($data, FILTER_VALIDATE_EMAIL)) {
        return true;
      }
      else {
        return false;
      }
    }
  ?>
</head>
<body>
  <div id="nav">
    <nav>
    <ul>
      <li><a href="./education.html">Education</a></li>
      <li><a href="./work.html">Leadership</a></li>
      <li><a href="./index.html"><img id="namelogo" src="namelogo.png" alt="KennyLi"
                                  width=180px height=40px></img></a></li>
      <li><a href="./extra.html">Extracurriculars</a></li>
      <li><a href="./contact.php">Contact</a></li>
      
    </ul>
    </nav>
  </div>

    <div class="contactinfo">
    <div class="contacttitle">GET IN TOUCH</div>
    <div class="contactsubheading">
      <h3>Any Comments, Suggestions, Questions.</h3><br/>
      <?php
      if(!isset($_POST["submit"])) {
      ?>
       <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
         <p> Hi Kenny, </p><br/>
         My name is<span class="error"> <?php echo $nameErr; ?></span><br/><input type="text" name="name"><br/>
         You can email me at<span class="error"> <?php echo $emailErr; ?></span><br/> <input type="text" name="email"><br/>
         I want to say<span class="error"> <?php echo $messageErr; ?></span><br/> 
                                            <textarea name="message" rows="6"
                                            cols="45"></textarea><br/>
         <input type="submit" name="submit" value="Send to Kenny"> &nbsp &nbsp &nbsp &nbsp Max 270 characters.
       </form>
       <?php
      }
      else {
        $email = $_POST["email"];
        $name = $_POST["name"];
        $message = $_POST["message"];
        $message = wordwrap($message, 45);
        $webMessage = "Website Message from " . $name;
        mail("zap261@sbcglobal.net",$webMessage,$message,"From: $email\n");
        echo "Your message has been submitted"; 
      }
      ?>
    </div>

    <div class="socialmedialinks">
      <table><tr><td>
       <p>Professional inquiries only please!</p>
       <a class="ucsdmail" href="mailto:k3li@ucsd.edu"><img src="emailicon.png" alt="k3li@ucsd.edu"
                                     width=50px height=50px></img></a>
       <a href="mailto:likenny9@gmail.com"><img src="gmailicon.png" alt="likenny9@gmail.com"
                                     width=50px height=50px></img></a>
       <a href="http://www.facebook.com/KennyLixD"><img src="facebookicon.png" alt="Facebook"
                                     width=50px height=50px></img></a>           
       <a href="http://www.linkedin.com/in/likenny/"><img src="linkedinicon.png" alt="LinkedIn"
                                     width=50px height=50px></img></a>
       <p id="emailtextform">k3li@ucsd.edu<br/> likenny9@gmail.com</p>
      </td></tr></table>
                                     
    </div>
      
  </div>
  <footer>Copyright &copy; 2014 Kenny Li</footer>

</body>
</html>

