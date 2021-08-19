const screamStyles = {
  gradient: {
    width: "100%",
    height: "100px",
    position: "absolute",
    bottom: 0,

    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
  },

  gradient2: {
    width: "80%",
    height: "50px",
    position: "absolute",
    bottom: "50px",

    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
  },
  yellow: {
    color: "rgb(100, 100, 100, 0.5)",
  },

  line: {
    position: "absolute",
    left: "85%",
    top: "0%",
    width: "1px",
    backgroundColor: "#d5dadd",
    height: "100%",
  },

  likeButton: {
    zIndex: 10,
    position: "relative",
    left: "0%",
    // width: "15vw",
    // height: "15vw",
    top: "10%",
  },
  likeButtonWrapper: {
    zIndex: 10,
    position: "absolute",
    left: "85%",
    // width: "15vw",
    top: "10%",
    textAlign: "center",
  },
  commentButtonWrapper: {
    top: "55%",
    position: "absolute",
    left: "85%",
    zIndex: 0,
  },

  commentButtonWrapperNotAuthenticated: {
    top: "55%",
    position: "absolute",
    left: "85%",
    zIndex: 10,
  },
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "12em",
    maxWidth: "95%",
    borderRadius: 20,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    maxHeight: "14.5em",
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 15,
    color: "rgb(87, 87, 87)",
    width: "95%",

    objectFit: "cover",
  },

  bodytext: {
    position: "relative",
    width: "85%",
    fontSize: "14pt",
    overflow: "hidden",
    maxHeight: "3.6em",
    textOverflow: "-o-ellipsis-lastline",
  },

  engagement: {
    paddingRight: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "black",
  },

  locationOuter: {
    float: "left",
    marginLeft: "10px",
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
  },
  locationIcon: {
    marginTop: "-2px",
    float: "left",
    color: "rgb(255, 205, 6)",
  },
}

export default screamStyles