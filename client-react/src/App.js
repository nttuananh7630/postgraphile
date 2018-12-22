import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import HomeRoute from "./routes/HomeRoute";
import NotFoundRoute from "./routes/NotFoundRoute";
import LoginRoute from "./routes/LoginRoute";
import ForumRoute from "./routes/ForumRoute";
import TopicRoute from "./routes/TopicRoute";

class App extends Component {
  render() {
    if (typeof window !== "undefined" && window.location.port === "8350") {
      return (
        <div>
          <h1>
            Greetings and saluations!{" "}
            <span role="img" aria-label="A smiley face shown wearing a monocle">
              🧐
            </span>
          </h1>
          <p>
            Terribly sorry about this old bean, but you appear to have visited
            the create-react-app app directly.
          </p>
          <p>
            Instead, you should visit the server app, which proxies through to
            create-react-app but adds all the GraphQL and OAuth goodness.
          </p>
          <p>
            <a href="http://localhost:8349/">Click here</a> to visit the server,
            assuming you stuck with the default <code>PORT=8349</code>
          </p>
        </div>
      );
    }
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomeRoute} />
          <Route path="/login" exact component={LoginRoute} />
          <Route path="/forums/:slug" exact component={ForumRoute} />
          <Route path="/forums/:slug/:topic" exact component={TopicRoute} />
          <Route component={NotFoundRoute} />
        </Switch>
      </div>
    );
  }
}

export default App;
