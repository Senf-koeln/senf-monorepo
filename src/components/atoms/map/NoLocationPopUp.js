/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setResetMapBounds } from "../../../redux/actions/mapActions";

import CloseIcon from "../../../images/icons/close.png";
//Map Stuff
import { Marker } from "@urbica/react-map-gl";
import { Trans, useTranslation } from "react-i18next";
import { CustomButton } from "../CustomButtons/CustomButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const NoLocationPopUp = ({ dataNoLocation, setSwipePositionUp }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openNoLocation, setOpenNoLocation] = useState(false);

  const noLocationNumber = dataNoLocation.length;

  const handleNoLocation = () => {
    const bounds = {
      latitude1: 50.93892,
      latitude2: 50.93864,
      longitude2: 6.9586,
      longitude3: 6.9588,
    };

    dispatch(setResetMapBounds(bounds));
    setOpenNoLocation(false);
    if (isMobileCustom) {
      setSwipePositionUp();
    }
  };

  return (
    <React.Fragment>
      {dataNoLocation.length > 1 && (
        <Marker
          key={"123456"}
          longitude={6.958725744885521}
          latitude={50.93864020643174}
        >
          <div
            style={{
              zIndex: 999,
              position: "absolute",
              width: "20px",
              marginLeft: "-10px",
              height: "20px",
              marginTop: "-10px",
              borderRadius: "100%",
              border: "1px white solid",
              backgroundColor: "#414345",
              opacity: "1",
            }}
            onClick={() => setOpenNoLocation(true)}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
                color: "white",
                marginTop: "0px",
              }}
            >
              {dataNoLocation.length}
            </div>
          </div>
        </Marker>
      )}

      {openNoLocation && (
        <Marker
          key={"1"}
          longitude={6.958725744885521}
          latitude={50.93864020643174}
        >
          <div
            style={{
              position: "absolute",
              marginLeft: "-10px",
              marginTop: "10px",
            }}
          >
            <div className="noLocationPopUp">
              <img
                src={CloseIcon}
                width="20px"
                style={{ position: "absolute", top: "10px", left: "10px" }}
                onClick={() => setOpenNoLocation(false)}
              />
              <p
                style={{
                  fontFamily: "Futura PT W01-Bold",
                  fontSize: "12pt",
                  paddingRight: "2px",
                  paddingLeft: "2px",
                }}
              >
                {t("withoutLocation")}
              </p>
              <CustomButton
                text={
                  <Trans
                    i18nKey="show_noLocationNumber_ideas"
                    noLocationNumber={noLocationNumber}
                  >
                    Show {{ noLocationNumber }} ideas
                  </Trans>
                }
                backgroundColor="#353535"
                textColor="white"
                position="relative"
                bottom="10px"
                handleButtonClick={() => handleNoLocation()}
              />
            </div>
          </div>
        </Marker>
      )}
    </React.Fragment>
  );
};
export default NoLocationPopUp;
