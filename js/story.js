//--init the plugin fadeIn effect 
	new WOW().init();

//-----------initialise javascript features-----------------------
	$("#welcome p").css('display', 'block');
	$("#quiz").css('display', 'block');
	$("#ending").css('display', 'none');
	$("#text-size").css('display', 'block');
	var stringOne = $("#welcome p:nth-child(3)").html();
	$("#welcome p:nth-child(3)").html("1. " + stringOne);
	var stringTwo = $("#welcome p:nth-child(4)").html();
	$("#welcome p:nth-child(4)").html("2. " + stringTwo);
	var stringThree = $("#welcome p:nth-child(5)").html();
	$("#welcome p:nth-child(5)").html("3. " + stringThree);
//----------------------------------------------------------------

	//highlight/de-hightlight a paragrah when the user click on it
	$("#story p a").click(function(event) {
		$(this).toggleClass("highlight");
		
	});

	//Set the smooth scrolling effect for the go up button
	$("#up").parent().smoothScroll(1000);
	
//--Ask the user to answer 3 questions before reading the ending----------
	var questionNo = 0;
	var opinion = "";

	$("#quiz input").keydown(function(event) {
		$(this).removeClass('error');
		//invalidate the user clicking enter to submit the form
		if (event.keyCode === 13) {
			event.preventDefault();
		}
	});



	//handle the event of the user clicking the "submit" button
	$("#quiz form").submit(runQuiz);

	//handle the event of the user clicking the "next" button
	$("#quiz button:last-child").click(function(event) {
		
		event.preventDefault();
		switch(questionNo) {
			case 1:
				printQuestion2();
				break;
			case 2:
				printQuestion3();
				break;
		}
	});

	/* helper function to handle the event of the user clicking the 
	"submit" button*/
	function runQuiz(event) {
		questionNo++;
		switch(questionNo) {
			case 1:
				var userAns = parseInt($(this).find("input").val());
				question1(event, userAns);
				break;
			case 2:
				question2(event);
				break;
			case 3:
				question3(event);
				break;
		}
	}
	
	//process the user's answer to question 1
	function question1(event, userAns) {
		event.preventDefault();
		if (isNaN(userAns)) {
			questionNo = 0;
			$("#quiz input").addClass('error');
			return;
		}
		if (userAns == 6) {
			message = "Nice work!"
			messageColour = "green";
		} else if(userAns == 5 || userAns == 7) {
			message = "Nope. Close! The answer is 6";
			messageColour = "orange";
		} else if(userAns != 6) {
			message = "Nope. Nowhere near it! The answer is 6";
			messageColour = "red";
		}
		$("#quiz .answer").html(message).css("color", messageColour);
		$("#quiz button:first-child").css('display', 'none');
		$("#quiz button:last-child").css('display', 'block');
	}
	
	//wipe out the first question and print out the second question to the user
	function printQuestion2() {
		$("#quiz button:first-child").css('display', 'block');
		$("#quiz button:last-child").css('display', 'none');
		$("#quiz legend").html("Question #2");
		$("#quiz .answer").html("");
		$("#quiz label").html("What do you think of the fisherman's wife");
		$("#quiz input").attr('type','text');
		$("#quiz input").val("");
		$("#quiz input").attr('placeholder','This is an open-ended question');
	}

	//process the user's answer to question 2
	function question2(event) {
		event.preventDefault();
		if ($("#quiz input").val() == "") {
			$("#quiz input").addClass('error');
			questionNo = 1;
			return;
		}
		$("#quiz .answer").html("Good job! One more question.")
				.css("color", 'green');	
		$("#quiz button:first-child").css('display', 'none');
		$("#quiz button:last-child").css('display', 'block');
		opinion += $("#quiz input").val();
	}
	
	//wipe out the second question and print out the third question to the user
	function printQuestion3() {
		$("#quiz button:first-child").css('display', 'block');
		$("#quiz button:last-child").css('display', 'none');
		$("#quiz .answer").html("");
		$("#quiz input").val("");
		$("#quiz legend").html("Question #3");
		$("#quiz label").html("How do you think the story will end");
		$("#quiz input").attr('placeholder','This is an open-ended question');
	}

	//process the user's answer to question 3
	function question3(event) {
		event.preventDefault();
		if ($("#quiz input").val() == "") {
			$("#quiz input").addClass('error');
			questionNo = 2;
			return;
		}
		showEnding();
	}

	//show the story ending and their guesses
	function showEnding() {
		$("#quiz fieldset:last-child").css('display', 'none');
		$("#quiz .answer").html("Cool! Now you can read the ending.")
				.css("color", 'green');	
		$("#ending").css('animation', '1s fade-in');
		$("#ending").css('display', 'block');
		$("#yourGuess").append($("#quiz input").val());
		$("#opinion").append(opinion);
		$("#guess").css('display', 'block');
	}
//---end of answering qeustions before reading the ending-----------------

//Users can click on A+ A- A to increase/decrease/back to original font size
	var fontSize = 16;
	//increase the font size
	$("#text-size span:first-child").click(function(event) {
		if (fontSize < 20) {
			fontSize++;
			$("#story p a").css('font-size', fontSize+"pt");	
		}
	});

	//decrease the font size
	$("#text-size span:last-child").click(function(event) {
		if (fontSize > 12) {
			fontSize--;
			$("#story p a").css('font-size', fontSize+"pt");
		} 
	});

	//back to original font size
	$("#text-size span:nth-child(2)").click(function(event) {
		fontSize = 16;
		$("#story p a").css('font-size', "16pt");
	});