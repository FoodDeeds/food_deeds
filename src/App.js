import React from "react";
import Routes from "./Routes";

const App = () => {
    if(!window.Promise) {
        window.Promise = Promise;
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('../../sw.js')
            .then(function() {
                console.log('Service worker registered!')
            })
            .catch(function(err){
                console.log('[Error] ', err)
            });
    }

    window.addEventListener('beforeinstallprompt', function(evt) {
        evt.preventDefault();
        // let deferredPrompt = evt;
        return false;
    });

    return (
        <div>
            <Routes />
        </div>
    );
};


export default App;
