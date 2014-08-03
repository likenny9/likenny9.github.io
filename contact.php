<!DOCTYPE html>
<html>
<head>
  <title>Contact Kenny</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="./css/main.css"> 

  <?php    

    $nameErr = $emailErr = $subjectErr = $messageErr = "";
    $name = $email = $subject = $message = "";
    $submitNameOK = $submitEmailOK = $submitSubjectOK = $submitMessageOK = false;
    //function checkErrConditions() {  

      if($_SERVER["REQUEST_METHOD"] == "POST") {
        if(empty($_POST["name"])) {
          $nameErr = " - Name is required!";
          $submitNameOK = false;
        }
        else {
          $name = securityTest($_POST["name"]);
          if(!preg_match("/^[a-zA-Z ]*$/",$name)) {
            $nameErr = " - Only letters and white space allowed!";
            $submitNameOK = false;
          }
          else {
            $submitNameOK = true;
          }
        }
        if(empty($_POST["email"])) {
          $emailErr = " - Email is required!";
          $submitEmailOK = false;
        }
        else {
          $email = securityTest($_POST["email"]);
          if(!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) {
            $emailErr = " - Invalid email!";
            $submitEmailOK = false;
          }     
          else {
            $submitEmailOK = true;
          }
        }
        if(empty($_POST["subject"])) {
          $subjectErr = " - Subject is required!";
          $submitSubjectOK = false;
        }
        else {
          $subject = securityTest($_POST["subject"]);
          $submitSubjectOK = true;
        }      
        if(empty($_POST["message"])) {
          $messageErr = " - Message is required!";
          $submitMessageOK = false;
        }
        else {
          $message = securityTest($_POST["message"]);
          $submitMessageOK = true;
        } 
      }

      function securityTest($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }

      /**function spamFilter($data) {
        $data = filter_var($data, FILTER_SANITIZE_EMAIL);
        if(filter_var($data, FILTER_VALIDATE_EMAIL)) {
          return true;
        }
        else {
          return false;
        }
      }*/
    //}
  ?>
</head>
<body>
  <div id="nav">
    <nav>
    <ul>
      <li><a href="./education.html">Education</a>

        <ul>
          <li><a href="./education.html#ucsd">UC&nbspSan&nbspDiego</a></li>
          <li><a href="./education.html#lowell">Lowell&nbspHigh</a></li>
        </ul>
      </li>
        
      <li><a href="./leadership.html">Experience</a>
        <ul>
          <li><a id="explinks" href="./leadership.html#preussit">Preuss&nbspIT</a></li>
          <li><a id="explinks" href="./leadership.html#csetutor">CSE&nbspTutor</a></li>
          <li><a id="explinks" href="./leadership.html#preussadmit">Preuss&nbspAdmissions</a></li>
        </ul>
      </li>

      <li><a href="./cse.html">Coding</a>
        <ul>
          <li><a id="cselinks" href="./cse.html#skills">Tech.&nbspSkills</a></li>
          <li><a id="cselinks" href="./cse.html#projects">Projects</a></li>
          <li><a id="cselinks" href="./cse.html#competitions">Competitions</a></li>
        </ul>
      </li>
      <li><a class="mainpic" href="./index.html">
            <img id="namelogo" src="namelogo.png" alt="KennyLi" title="Homepage"
                                  width=180px height=35px>
          </a></li>                            
      <li><a href="./orgs.html">Sports/Orgs</a></li>
      <li><a href="./about.html">About</a></li>
      <li><a href="./contact.php">Contact</a></li>
      
    </ul>
    </nav>
  </div>


    <div class="contactinfo">
    <div class="contacttitle">GET IN TOUCH</div>
    <div class="contactsubheading">
      <h3>Any Comments, Suggestions, Questions.</h3><br/>
      <?php
      if(!isset($_POST["submit"]) || (!$submitNameOK || !$submitEmailOK || !$submitSubjectOK || !$submitMessageOK)) {
      ?>
       <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
         <p> Hi Kenny, </p><br/>
         My name is<span class="error"> <?php echo $nameErr; ?></span><br/>
                   <input type="text" name="name" value="<?php echo $name; ?>"><br/>
         You can email me at<span class="error">* <?php echo $emailErr; ?></span><br/> 
                            <input type="text" name="email" value="<?php echo $email; ?>"><br/>
         The subject of my message is<span class="error"> <?php echo $subjectErr; ?></span><br/>
                                     <input type="text" name="subject" value="<?php echo $subject; ?>"><br/>
         I want to say<span class="error"> <?php echo $messageErr; ?></span><br/> 
                      <textarea name="message" rows="10" cols="45"><?php echo $message; ?></textarea><br/>
         <input type="submit" name="submit" value="Send to Kenny"> &nbsp &nbsp &nbsp &nbsp Max 450 characters.
       </form>
       <br/><span class="error">*Yahoo emails will not work.</span>
       <?php
      }
      else {
        $email = securityTest($_POST["email"]);
        $name = securityTest($_POST["name"]);
        $subject = securityTest($_POST["subject"]);
        $message = securityTest($_POST["message"]);
        $message = wordwrap($message, 45);
        $webMessage = "Website Message from " . $name . ": " . $subject;
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: " . $email . "\r\n";
        mail("zap261@sbcglobal.net",$webMessage,$message,$headers);
        echo "Thanks for the message!";?><br/><?php
        echo "If you wanted an answer, I'll get back to you within 24 hours!"; 
      }
      ?>
    </div>

    <div class="socialmedialinks">
      <table width=100% ><tr><td>
       <p>Feel free to contact me on any of these platforms.</p>
       <a class="ucsdmail" href="mailto:k3li@ucsd.edu"><img src="emailicon.png" alt="k3li@ucsd.edu"
                                     width=50px height=50px></img></a>
       <a href="mailto:likenny9@gmail.com"><img src="gmailicon.png" alt="likenny9@gmail.com"
                                     width=50px height=50px></img></a>
       <a href="http://www.facebook.com/KennyLixD" target="_blank"><img src="facebookicon.png" alt="Facebook"
                                     width=50px height=50px></img></a>           
       <a href="http://www.linkedin.com/in/likenny/" target="_blank"><img src="linkedinicon.png" alt="LinkedIn"
                                     width=50px height=50px></img></a>
       <p id="emailtextform">k3li@ucsd.edu<br/> likenny9@gmail.com</p>
      </td></tr></table>
                                     
    </div>
      
  </div>
  <footer id="contactfooter">Copyright &copy; 2014 Kenny Li</footer>

</body>
</html>

