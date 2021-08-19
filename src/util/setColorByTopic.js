const setColorByTopic = (Thema) => {
  let color
  switch (Thema) {
    case "Rad":
      color = "#929df6";
      break;
    case "Verkehr":
      color = "#91dff4";
      break;
    case "Umwelt und Grün":
      color = "#8dd9b8";
      break;
    case "Sport / Freizeit":
      color = "#f6c095";
      break;
    case "Inklusion / Soziales":
      color = "#e8907e";
      break;
    case "Versorgung":
      color = "#bd98f6";
      break;
    default:
      color = "#f9db95";
  }
  return color
}

export default setColorByTopic