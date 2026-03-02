jQuery(document).ready(function($) {
	
	var hideAnsweredQuestion = true;
	
	console.log("Script loaded");

	jQuery(".rg").click(function() {
		var closest = jQuery(this).closest(".oneQuestion");
		closest.next().show();
		if(hideAnsweredQuestion){
			closest.hide();
		}
	
		
		
	});

	jQuery(".btnQuestionaireDone").click(function() {
		console.log("The BUTTON was clicked.");

		var answers = jQuery(".oneAnswer input[type=radio]:checked");


		var cleanAnswers = [];
		var url = redirrectUrl+"?";
		for (var i = 0; i < answers.length; i++) {
			url += jQuery(answers[i]).attr("name") + "=" + jQuery(answers[i]).val() + "&";

			cleanAnswers.push(jQuery(answers[i]).val());
		}

		url = encodeURI(url);
		console.log(url);

		$.post(pluginDir + "saveResults.php", {
				answers: JSON.stringify(cleanAnswers),
				id: quest_id
			},
			function(data, status) {
				window.location = url;

			});
	});

});
