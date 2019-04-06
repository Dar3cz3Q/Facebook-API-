// JavaScript Document
window.fbAsyncInit = function () {
    FB.init({
        appId: '//Your app ID',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        setElements(true);
        API();
        Loader();
        
    } else {
        setElements(false);
    }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function setElements(isLoggedIn) {
    if(isLoggedIn){
        document.getElementById("Profile").style.display = 'flex';
        document.getElementById("FacebookLoginButton").style.display = 'none';
        document.getElementById("FacebookLogoutButton").style.display = 'flex';
        document.getElementById("NotLoggedInformations").style.display = 'none';
    } else {
        document.getElementById("Profile").style.display = 'none';
        document.getElementById("FacebookLoginButton").style.display = 'flex';
        document.getElementById("FacebookLogoutButton").style.display = 'none';
        document.getElementById("NotLoggedInformations").style.display = 'flex';
    }
}

function logout() {
    FB.logout(function(response) {
        setElements(false);
    })
}

function API() {
    FB.api('/me?fields=name, email, birthday, location, hometown, friends, likes, posts, link, age_range, relationship_status', function(response){
        if(response && !response.error) {
            console.log(response);
            buildProfile(response);
        }
    })
} 

function Loader() {
    $("#Profile").html(`

        <div class="Loader Flex_Style Flex_Style--row">

            <div class="letter">L</div>

            <div class="letter">O</div>

            <div class="letter">A</div>

            <div class="letter">D</div>

            <div class="letter">I</div>

            <div class="letter">N</div>

            <div class="letter">G</div>

        </div>`);
    
}

function buildProfile(user) {
    
    let profile = `

        <div id="UserProfileInformations" class="UserProfile">
        
            <div class="BasicInformations Flex_Style Flex_Style--column">
        
                <div class="UserName Flex_Style"><a class="Link" href="${user.link}" target="_blank">${user.name}</a></div>

                <div class="UserId Flex_Style">ID:&nbsp;${user.id}</div>
            
            </div>

            <div class="Seperating_Line"></div>

            <div class="UserInformations Flex_Style Flex_Style--row">

                <div class="UserTechnical">

                    <div class="ProfileInformationsHeader">

                        <span>Profile&nbsp;Informations:</span>

                    </div>

                    <div class="PersonInformations Sorted_Items">

                        <div class="ProfileInformationsText">

                            <span><b>Age:</b>&nbsp;${user.age_range.max}</span>

                        </div>

                        <div class="ProfileInformationsText">

                            <span><b>E-Mail:</b>&nbsp;${user.email}</span>

                        </div>

                        <div class="ProfileInformationsText">

                            <span><b>Birthday:</b>&nbsp;${user.birthday}</span>

                        </div>

                        <div class="ProfileInformationsText">

                            <span><b>Location:</b>&nbsp;${user.location.name}</span>

                        </div>

                        <div class="ProfileInformationsText">

                            <span><b>From:</b>&nbsp;${user.hometown.name}</span>

                        </div>

                        <div class="ProfileInformationsText">

                            <span><b>Friends:</b>&nbsp;${user.friends.summary.total_count}</span>

                        </div>

                    </div>

                </div>

                <div class="UserTechnical">

                    <div class="ProfileInformationsHeader">

                        <span>Liked&nbsp;Pages:</span>

                    </div>

                    <div class="LikedPages Sorted_Items">

                    </div>

                </div>

            </div>

            <div class="Seperating_Line"></div>

            <div class="PostInformations Flex_Style Flex_Style--column">

                <div class="UserTechnical">

                    <div class="ProfileInformationsHeader">

                        <span>Latest&nbsp;Posts:</span>

                    </div>

                    <div class="LatestPosts Sorted_Items">

                    </div>

                </div>

            </div>

        </div>
    `;
    
    document.getElementById("Profile").innerHTML = profile;
    
    $.each(user.likes.data, function(i, item) {
        let like = item.name,
            like_id = item.id,
            like_time_before = item.created_time;
        
        if(like_time_before === undefined) {
            var like_time = `<span class="Private_Data">No data</span>`
        } else {
            var like_time = like_time_before;
        }
        
        $(".LikedPages").append(`
            <div class="ProfileInformationsText">
                                        
               <span class="LikedName">${like}</span><br>
               <span class="LikedTime">${like_time}</span>
                                        
            </div>
        `);
    });
    
    $.each(user.posts.data, function(i, item){
        let description = item.message,
            id = item.id,
            created_time = item.created_time;
        
        $(".LatestPosts").append(`
            <div class="ProfileInformationsText">
                                        
               <span class="PostDesc">${description}</span><br>
               <span class="PostTime">${created_time}</span>
                                        
            </div>
        `);
    })
    
}
