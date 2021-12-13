import publicIp from "public-ip";
import ipLocation from "iplocation";
import Cookies from "universal-cookie";
import i18n from "i18next";
//import { useSelector, useDispatch } from "react-redux";
//import { setLanguage } from "../redux/actions/cookiesActions";

//If a new user starts using the site the language is determined using his IP address,
//which is then used to find out if he is inside or outside germany and the language is set accordingly
const getClientIP = async () =>
  await publicIp.v4({ fallbackUrls: ["https://ifconfig.co/ip"] });
const cookies = new Cookies();

const detectLocation = async () => {
  // const dispatch = useDispatch();
  await getClientIP().then((ip) => {
    ipLocation(ip).then((loc) => {
      console.log(loc.country.name + "is the location");
      if (!cookies.get("language")) {
        //console.log("no preference");
        if (loc.country.name === "Germany") {
          //console.log('finally DEU');
          cookies.set("language", "de", {
            maxAge: 60 * 60 * 24 * 90,
          });
          i18n.changeLanguage("de");
          //dispatch(setLanguage("de"));
        } else {
          cookies.set("language", "en", {
            maxAge: 60 * 60 * 24 * 90,
          });
          i18n.changeLanguage("en");
          //console.log("cookie set ENG");
          //(setLanguage("en"));
        }
      } else {
        const preference = cookies.get("language");
        //console.log("preference " + preference);
        i18n.changeLanguage(preference);
        //dispatch(setLanguage(preference));
      }
    });
  });
};
export default detectLocation;
