import React from 'react';
import Helmet from 'react-helmet';
import Background from "./components/Background/background";
import Content from "./components/Content/content";
const App = () => {
    return (
        <div>
            <Helmet>
                <title>Ora</title>
            </Helmet>
            <Background />
            <Content/>
        </div>
  );
};

export default App;
