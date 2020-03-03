<?php
    //var_dump($_COOKIE);
    if ( !isset($_COOKIE['email']) OR trim($_COOKIE['email']) ==''){
        header("Location: index.html");
        exit; 
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<link rel="shortcut icon" href="favicon.png" type="image/png">
	<!--Import Google Icon Font-->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<!--Import materialize.css-->
	<link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
	<link type="text/css" rel="stylesheet" href="css/style.css">
	<!--Let browser know website is optimized for mobile-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title>User cabinet</title>
</head>

<body>
    <div class="container">
		<div class="row">
			<div class="col s12 center-align">
				<h1 class="user-cabinet-center"> User cabinet</h1>
			</div>
			<div class="col s12 center-align">
				<button class="waves-effect waves-light btn" id="logout"><i class="material-icons right">person_outline</i>Log Out</button>
			</div>
		</div>
    	<div class="row">
			<div class="col s3"></div>
			<div class="col s6 center-align">
				<div class="row">
				<form>
					<div class="input-field col s6">
						<input id="signup-name" type="text" class="validate">
						<label class="active" for="signup-name">Name</label>
					</div>
					<div class="input-field col s6">
						<input id="signup-pass" type="text" class="validate">
						<label class="active" for="signup-pass">Password:</label>
					</div>
					<div class="input-field col s12">
						<input id="signup-birthday" type="text" class="datepicker">
						<label class="active" for="signup-birthday">Birthday:</label>
					</div>
					<div class="col s12 left-align">
					<form action="#" >
						<p>
							<label>
								<input name="sex" value="male" type="radio" class="sex with-gap" checked />
								<span>Male</span>
							</label>
						</p>
						<p>
							<label>
								<input name="sex" value="female" type="radio" class="sex with-gap"/>
								<span>Female</span>
							</label>
						</p>
						<p>
							<label>
								<input name="sex" value="other" type="radio" class="sex with-gap"/>
								<span>Other</span>
							</label>
						</p>
					</form>	
					</div>				
					<div class="col s12 align-right">
						<button id="signup-submit" class="waves-effect waves-light btn"/>Update</button>
					</div>				
				</form>					
				</div>
			</div>
      	</div>
    </div>  

    <script src="scripts/materialize.min.js"></script>
    <script src="js/ajax.js"></script>
    <script src="js/get_user_data.js"></script>
    <script src="js/logout.js"></script>
  </body>
</html>
