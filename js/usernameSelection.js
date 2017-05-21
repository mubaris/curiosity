const allUsername = "All";

function showMoreOrLessUserName() {
	// body...
}

function generateUsernameSelector() {
	var usernameSelector = "";
}

function selectUsername(username) {
	swal({
		title: "Remove username",
		html: "Are you sure want to remove " + username + "?",
		showCancelButton: true,
		confirmButtonText: "Remove",
		showLoaderOnConfirm: false
	}).then(function(username)) {
		removeUsernameFromList(username);
		swal({
			type: "success",
			title: "Username " + username + " removed!"
		})
	}
}

function askForUsername() {
	swal({
            title: "Submit Github Username",
            html: "Who do you want to add?",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: false,
            /*preConfirm: function(token) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        if (username == '') {
                            reject("Username invalid");
                        } else {
                        	// need to check valid username
                            addUsernameToList(username)
                            resolve();
                        }
                    }, 1000);
                });
            }, */
            allowOutsideClick: false
        }).then(function(token) {
            accessToken = token;
            getData();
            getLanguagesToShow();
            swal({
                type: "success",
                title: "Username added!"
            })
        })
    }
}
function addUsernameToList(username) {
	usernames.push(username);
}

function removeUsernameFromList(username) {
	var index = usernames.indexOf(username);
	if (index > -1) {
		usernames.splice(index, 1);	
	}
}