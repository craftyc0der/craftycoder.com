+++
fragment = "config"

[[config]]
  type = "css" # Acceptable values are icon, meta, link, css, js. Default is empty. Would not add anything on empty.
  # block = true # If set to true, would inject the code to the <head> tag. Default is false
  html = '<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text&family=Open+Sans+Condensed:wght@300&family=Playfair+Display&display=swap" rel="stylesheet">' # HTML code injected directly to the page. Default is empty.
  # file = "" # Path to file, can be on page or in static/ directory. Default is empty.

[[config]]
  type = "css"
  block = true
  html = """
  <style>
    html {
        scroll-behavior: smooth;
    }
    h1, h2, .h1, .h2 {
        font-family: 'DM Serif Text';
    }    
    h3, h4, h5, h6, .h3, .h4, .h5, .h6 {
        font-family: 'Playfair Display';
    }
    .title {
        padding-bottom: 1.25rem;
    }
    .content-body p, .card-body .text-body, .card-body .text-body p {
        font-family: 'Playfair Display';
    }
    .blockquote p {
        margin-left: 2rem;
        font-family: 'Open Sans Condensed';
    }
    #footer li {
        font-family: 'Open Sans Condensed';
        list-style: none;
    }
    #footer ul {
        padding-inline-start: 0rem;
    }
    .nav-item {
        font-family: 'Open Sans Condensed';
        font-size: 1.25rem;
    }
    .badge {
        font-family: 'Open Sans Condensed';
    }
    .gist .markdown-body code, section .bg-light pre {
      color: #373737;
    }
    .content-body ol, .content-body ul {
        font-family: 'Open Sans Condensed';
        font-size: 1.25rem;
    }
    .content-body table {
        border-style: ridge;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .content-body details {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
  </style>
  """

[[config]]
  type = "js"
  block = true # Default is false
  html = """
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js"></script>
  """

[[config]]
  type = "js"
  block = true # Default is false
  html = """
    <script>
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyDM0TICdsfwD0Mj3j__oULR5EQg__hFTl0",
            authDomain: "craftycoder-e95a2.firebaseapp.com",
            databaseURL: "https://craftycoder-e95a2.firebaseio.com",
            projectId: "craftycoder-e95a2",
            storageBucket: "craftycoder-e95a2.appspot.com",
            messagingSenderId: "605879826235",
            appId: "1:605879826235:web:59773e7c77b01c6b6b691e",
            measurementId: "G-JS38X3LLBK"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    </script>
  """

[[config]]
  type = "js"
  block = true # Default is false
  html = """
      <script>
        const addCard = (cardHolder, content) => {
            var div1 = document.createElement('div');
            div1.classList = "col-lg-6 col-12 mb-2 d-flex";
            var div2 = document.createElement('article');
            div2.classList = "card w-100";
            var div3 = document.createElement('div');
            div3.classList = "card-body";
            var div4 = document.createElement('div');
            div4.classList = "col-12 pl-0 mt-2 text-body";
            div1.appendChild(div2);
            div2.appendChild(div3);
            div3.appendChild(div4);
            div4.innerHTML = content;
            cardHolder.appendChild(div1);
        }
        var getJSON = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
            };
            xhr.send();
        };
    </script>
  """ 
+++