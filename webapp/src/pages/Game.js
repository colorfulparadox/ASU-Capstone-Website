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

    return (
        <>
            <NavBar />
            <div className="LoginMain">
                <Unity unityProvider={unityProvider} style={{ width: 960, height: 600 }}/>
            </div>
        </>
    )
}