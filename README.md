Facebook Integration with Ionic
===============================

1: Create a Facebook application
--------------------------------

 1. Login to Facebook
 2. Access https://developers.facebook.com/apps, and click **Add New App**
 3. Select **www** as the platform
 4. Type a unique name for your app and click **Create New Facebook App ID**
 5. Specify a **Category**, and click **Create App ID**
 6. Click **My Apps** in the menu and select the app you just created
 7. Click **Settings** in the left navigation
 8. Click the Advanced Tab
 9. In the **OAuth Settings** section, add the following URLs in the Valid OAuth redirect URIs field:
	 - http://localhost:8100/oauthcallback.html (for access using ionic serve)
 10. Click **Save Changes**

2: Initialize OpenFB
--------------------

 1. Add the OpenFB files to your application
 2. Copy **openfb.js** and **ngopenfb.js** from this sample-project **/www/js** to **your-project/www/js** directory.
	- Copy **oauthcallback.html** and **logoutcallback.html** from this **sample-project/www** to **your-project/www** directory.
	- In **your-project/www/index.html**, add script tags to include openfb.js and ngopenfb.js (before app.js):
 <pre><code>&lt;script src="js/openfb.js"&gt;&lt;/script&gt;
&lt;script src="js/ngopenfb.js"&gt;&lt;/script&gt;</pre></code>

 3. Open **your-project/www/js/app.js**, and add **ngOpenFB** as a dependency to the **starter** module:
      <pre><code>angular.module('starter' ['ionic','starter.controllers', 'ngOpenFB'])</pre></code>

 4. Inject **ngFB** in the run() function declaration:
  <pre><code>.run(function ($ionicPlatform, ngFB) {</pre></code>

 5. Initialize OpenFB on the first line of the run() function. Replace **YOUR_FB_APP_ID** with the App ID of your Facebook application.
  <pre><code>ngFB.init({appId: 'YOUR_FB_APP_ID'});</pre></code>

3: Add Facebook login
--------------------------------

 1. Create a **template** for the user login view. In the **your-project/www/templates** directory, create a new file named **login.html** and Add a **Login with Facebook** button right after the existing Log In button implement it as follows.
  <pre><code>&lt;label class="item"&gt;
  	  &lt;button class="button button-block button-positive" ng-click="fbLogin()"&gt;
   	    Login with Facebook
   	  &lt;/button&gt;
	&lt;/label&gt;</pre></code>

 2. Open your-project/www/js/controllers.js, and add **ngOpenFB** as a dependency to the **starter.controllers** module:
 <pre><code>angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])</pre></code>
 3. Inject **ngFB** and add the fbLogin function in the **AppCtrl** controller:
 <pre><code>.controller('AppCtrl', function ($scope, $ionicModal, $timeout, ngFB, $state) {
  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          $state.go('app.home');
        } else {
          alert('Facebook login failed');
        }
      }
    );
  };
})</code></pre>

4: Display the User Profile & Publish to your feed
--------------------

 1. Create a **template** for the user home view. In the **your-project/www/templates** directory, create a new file named **home.html** and implement it as follows:
<code><pre>&lt;ion-view view-title="Profile"&gt;
	    &lt;ion-content class="has-header"&gt;
	        &lt;div class="list card"&gt;
	            &lt;div class="item"&gt;
	                &lt;h2&gt;{{user.name}}&lt;/h2&gt;
	                &lt;p&gt;{{user.city}}&lt;/p&gt;
	                &lt;a class="tab-item" ng-click="share()"&gt;
	                    &lt;i class="icon ion-share"&gt;&lt;/i&gt;
	                    &lt;p&gt;Share&lt;/p&gt;
	                &lt;/a&gt;
	            &lt;/div&gt;
	            &lt;div class="item item-body"&gt;
	                &lt;img src="http://graph.facebook.com/{{user.id}}/picture?width=270&height=270"/&gt;
	            &lt;/div&gt;
	        &lt;/div&gt;
	    &lt;/ion-content&gt;
	&lt;/ion-view&gt;</code></pre>

 2. Create a **controller** for the user profile view. Open **controllers.js**, and add the following controller:
<code><pre>.controller('HomeCtrl', function ($scope, ngFB) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        }
      );
      $scope.share = function (event) {
        ngFB.api({
          method: 'POST',
          path: '/me/feed',
          params: {
              message: "I'll be attending: Seminar by Shukarullah Shah on Ionic Facebook Integration "
          }
      }).then(
          function () {
              alert('The session was shared on Facebook');
          },
          function () {
              alert('An error occurred while sharing this session on Facebook');
          });
      };
});</code></pre>

 3. Create a **route** for the user profile view. Open **app.js**, and add the following route:
 <code><pre>.state('app.login', {
		url: '/login',
		views: {
			'menuContent': {
				templateUrl: 'templates/login.html'
			}
		}
	});</code></pre>
