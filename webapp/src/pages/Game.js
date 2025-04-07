import NavBar from '../components/NavBar'; 

//import logo from '../assets/logo.png' 

import { Unity, useUnityContext } from "react-unity-webgl";

export default function Game() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "UnityBuild/build.loader.js",
        dataUrl: "UnityBuild/build.data",
        frameworkUrl: "UnityBuild/build.framework.js",
        codeUrl: "UnityBuild/build.wasm",
      });
      /*<Unity unityProvider={unityProvider} style={{ width: 960, height: 600 }}/>*/

    return (
        <>
            <NavBar />
            <div className="LoginMain">
                <h1>Game Guide</h1>
                <h3>How to Install</h3>
                <h3>How to Login</h3>
                <h3>Customer Interactions</h3>
            </div>
        </>
    )
}