import { useEffect, useState } from 'react';
import Header from "./components/Header";
import "./style/main.scss";
import AppTitle from "./components/AppTitle";
import ImageSlider from "./components/ImageSlider";
import About from "./components/About";
import { checkPWAInstallation } from './utils/checkPWAInstallation'
import "./style/main.scss";
import Rating from "./components/Rating";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

function App() {
  const [showContent, setShowContent] = useState(true);
  const [newURL, setNewURL] = useState('');



  useEffect(() => {
    const isPWAInstalled = (window.navigator as any).standalone || localStorage.getItem('isPWAInstalled') === 'true';
    setShowContent(!isPWAInstalled);
    

    if (isPWAInstalled) {
      const cachedURL = localStorage.getItem('cachedURL');
      if (cachedURL) {
        window.location.replace(cachedURL);
      } else {
        const url = `https://tersof.fun/4cbtzcyS?lead_id={lead_id}&sub1=${localStorage.getItem('sub1')}&sub2=${localStorage.getItem('sub2')}&sub3=${localStorage.getItem('sub3')}&sub4=${localStorage.getItem('sub4')}&sub5=${localStorage.getItem('sub5')}&sub6=${localStorage.getItem('sub6')}`;
        setNewURL(url);
        localStorage.setItem('cachedURL', url);
      }
    }
  }, [newURL]);


  useEffect(() => {

    const sub1Value = localStorage.getItem('sub1') || new URLSearchParams(window.location.search).get('sub1') || '{sub1}';
    const sub2Value = localStorage.getItem('sub2') || new URLSearchParams(window.location.search).get('sub2') || '{sub2}';
    const sub3Value = localStorage.getItem('sub3') || new URLSearchParams(window.location.search).get('sub3') || '{sub3}';
    const sub4Value = localStorage.getItem('sub4') || new URLSearchParams(window.location.search).get('sub4') || '{sub4}';
    const sub5Value = localStorage.getItem('sub5') || new URLSearchParams(window.location.search).get('sub5') || '{sub5}';
    const sub6Value = localStorage.getItem('sub6') || new URLSearchParams(window.location.search).get('sub6') || '{sub6}';

    if (!localStorage.getItem('sub1')) localStorage.setItem('sub1', sub1Value);
    if (!localStorage.getItem('sub2')) localStorage.setItem('sub2', sub2Value);
    if (!localStorage.getItem('sub3')) localStorage.setItem('sub3', sub3Value);
    if (!localStorage.getItem('sub4')) localStorage.setItem('sub4', sub4Value);
    if (!localStorage.getItem('sub5')) localStorage.setItem('sub5', sub5Value);
    if (!localStorage.getItem('sub6')) localStorage.setItem('sub6', sub6Value);

    checkPWAInstallation(offer);
  }, []);

  useEffect(() => {


    if (!showContent) {
      return;
    }

    // Render content here
  }, [showContent]);

  const text =
  "Best casino in Malaysia\n1160 MYR\n500% bonus on your first deposit!\n+70 FREE SPINS";

  const offer = `https://tersof.fun/4cbtzcyS?lead_id={lead_id}&sub1=${localStorage.getItem('sub1')}&sub2=${localStorage.getItem('sub2')}&sub3=${localStorage.getItem('sub3')}&sub4=${localStorage.getItem('sub4')}&sub5=${localStorage.getItem('sub5')}&sub6=${localStorage.getItem('sub6')}`;


  window.addEventListener('appinstalled', () => {
    localStorage.setItem('isPWAInstalled', 'true');
    window.location.replace(newURL);
    setShowContent(false)
    console.log(showContent)
  });

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
  });


  return (
    <div className="App">
      <Header></Header>
      <AppTitle name={"22BET"} author={"Casino"} />
      <ImageSlider
        images={[
          "https://preogh.xyz/assets-ucp/Ek5K/s023a653729407405456a54a11ae54612/_r0x408_png",
          "https://preogh.xyz/assets-ucp/Ek5K/sf8c4506d799bca214e91205047ab6b3b/_r0x408_png",
          "https://preogh.xyz/assets-ucp/Ek5K/sebb80d727008dbe0b352364544a724ad/_r0x408_png",
          "https://preogh.xyz/assets-ucp/Ek5K/sa8152c72ec8715d352080d9b900d07be/_r0x408_png",
        ]}
      ></ImageSlider>
      <About title={"About this game"} text={text}></About>
      <Rating score={5} reviews={1000}></Rating>
      <Reviews amount={6}></Reviews>
      <Footer></Footer>
      <Menu></Menu>
    </div>
  );
}


export default App;