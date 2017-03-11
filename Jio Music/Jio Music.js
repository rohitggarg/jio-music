HOME_URL="http://jiofi.local.html/msd.html";
CRED_NAME  = "credentials";
TOKEN = '';
redirect_check = true;
PLAYER_HTML="Html/player.html";
//Called when application is started.
function OnStart()
{
  lay = app.CreateLayout( "Linear", "FillXY" );
    credentials = {};
    title = app.CreateText("Jio Music App", 1, 0.1);
    title.SetTextSize(30);
    lay.AddChild(title);
    
    web = app.CreateWebView(1,0);
    web.SetOnProgress( web_onProgress );
  
    if(!app.LoadText( CRED_NAME, null )) {
        subTitle = app.CreateText("The credentials that you add here will be saved locally and used further to login", 0.8, 0.1, "Multiline");
        createLoginScreen();
    } else {
        proceedLogin();
    }    
  app.AddLayout( lay );
}

function checkPlayerLoaded() {
    if(web.GetUrl().indexOf(PLAYER_HTML) < 0) {
        subTitle = app.CreateText("There seems to be a problem loading the page, you can try to relogin here", 0.8, 0.1, "Multiline");
        createLoginScreen();
        app.HideProgress();
    }
}

function createLoginScreen() {
    username = app.CreateTextEdit('',0.8);
    username.SetHint('Username');
    password = app.CreateTextEdit('',0.8);
    password.SetHint('Password');
    login = app.CreateButton('Login', 0.4, 0.1);
    login.SetOnTouch(btn_loginTouch);
    lay.AddChild(subTitle);
    lay.AddChild(username);
    lay.AddChild(password);
    lay.AddChild(login);
}

function btn_loginTouch() {
    if(username.GetText().trim() == '' || password.GetText().trim() == '') {
        subTitle.SetText('Credentials are empty');
        return;
    }
    app.SaveText( CRED_NAME, '{"user": "'+username.GetText()+'", "pass": "'+password.GetText()+'"}' );
    lay.RemoveChild(subTitle);
    lay.RemoveChild(username);
    lay.RemoveChild(password);
    lay.RemoveChild(login);
    proceedLogin();
}

function proceedLogin() {
    app.ShowProgress( "Loading..." );
    setTimeout(checkPlayerLoaded, 5000);
    credentials = JSON.parse(app.LoadText(CRED_NAME));
    lay.AddChild( web );
    web.LoadUrl( HOME_URL );
}

function web_onProgress(progress)
{
  if(progress != 10 && progress != 100) {
    redirect_check = false;
  }
  if(progress == 100 && redirect_check == false) {
    redirect_check = true;
    if( web.GetUrl() == "http://jiofi.local.html/sd_login.html" ) {
      web.Execute( 'if (typeof $ != "undefined") {'+
          '$("document").ready(function() {'+
            '$("#LOGIN_USER").val("'+credentials.user+'");'+
            '$("#LOGIN_PWD").val("'+credentials.pass+'");'+
            '$("#BTN_Login").click();'+
          '})'+
        '}');
    }
    else if ( web.GetUrl() == HOME_URL) {
      var script = 'document.getElementById("csrf_token").value';
      web.Execute(script, function(csrf_token) {
         TOKEN = csrf_token;
         web.LoadUrl( PLAYER_HTML );
      });
    }
    else if ( web.GetUrl().indexOf(PLAYER_HTML) > 0 ) {
      var script = 'if(typeof $ != "undefined") { $("#csrf_token").val("' + TOKEN + '");changePage(0, keepSession); }';
      web.Execute(script, function(result) {
         web.SetSize( 1, 0.9 );
         app.HideProgress();
      });
    }
  }
}