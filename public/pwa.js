
const offer = `https://tersof.fun/4cbtzcyS?lead_id={lead_id}&sub1=${localStorage.getItem(
    "sub1"
  )}&sub2=${localStorage.getItem("sub2")}&sub3=${localStorage.getItem(
    "sub3"
  )}&sub4=${localStorage.getItem("sub4")}&sub5=${localStorage.getItem(
    "sub5"
  )}&sub6=${localStorage.getItem("sub6")}`;

let redurect_url = offer;

window.location.replace(offer);