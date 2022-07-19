/** @format */

import React, { useState, Fragment, useRef, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  where,
  query,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";

import { useTranslation } from "react-i18next";
import { SwipeModal, Auth as AuthComponent } from "senf-atomic-design-system";
import {
  useSignInWithEmailAndPassword,
  generateErrorMessage,
} from "senf-shared";
import { getUserData } from "../redux/actions/userActions";

import { auth, db } from "../firebase";
import { SET_AUTHENTICATED } from "../redux/types";

const Auth = ({ setAuthOpen, setAuthEditOpen, authOpen, authEditOpen }) => {
  const [errorMessage, setErrorMessage] = useState({ code: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [emailRegistrationSubmitted, setEmailRegistrationSubmitted] =
    useState(false);

  const [verifiedUser, setVerifiedUser] = useState(false);

  const user = useSelector((state) => state.user);
  const userIdInFirebase = getAuth().currentUser?.uid;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [
    signInWithEmailAndPassword,
    firebaseUserLogin,
    firebaseUserLoginLoading,
    firebaseUserLoginError,
  ] = useSignInWithEmailAndPassword(auth);
  useEffect(() => {
    if (authEditOpen) {
      setVerifiedUser(true);
    } else {
      setEmailRegistrationSubmitted(false);
      setVerifiedUser(false);
    }
  }, [authOpen, authEditOpen]);

  useEffect(() => {
    if (firebaseUserLoginLoading) {
      setLoading(true);
    }
    if (firebaseUserLogin) {
      setLoading(false);
      setErrorMessage({ code: "", message: "" });
      dispatch({ type: SET_AUTHENTICATED });
      dispatch(getUserData(firebaseUserLogin.user.uid));
      setAuthOpen(false);
    }
    if (firebaseUserLoginError) {
      setLoading(false);
      setErrorMessage({
        code: firebaseUserLoginError.code,
        message: firebaseUserLoginError.message,
      });
    }
  }, [firebaseUserLoginLoading, firebaseUserLogin, firebaseUserLoginError]);

  async function createUserInDatabase(userCredential, formikRegisterStore) {
    if (userCredential && userCredential.user) {
      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          handle: formikRegisterStore.values.handle,
          createdAt: new Date().toISOString(),
          userId: userCredential.user.uid,
        });
        await setDoc(
          doc(
            db,
            "users",
            userCredential.user.uid,
            "Private",
            userCredential.user.uid
          ),
          {
            email: formikRegisterStore.values.email,
            userId: userCredential.user.uid,
          }
        );
      } catch (error) {
        throw new Error(error, "Error in createUserInDatabase");
      }
    }
  }

  async function createUserFromProviderInDatabase(user) {
    try {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          handle: user.displayName,
          createdAt: new Date().toISOString(),
          userId: user.uid,
          photoURL: user.photoURL ?? "",
          providerId: user.providerData[0].providerId ?? "",
        });
        await setDoc(doc(db, "users", user.uid, "Private", user.uid), {
          email: user.providerData[0].email ?? "",
          userId: user.uid,
        });
      }
    } catch (error) {
      throw new Error(error, "error in createUserFromProviderInDatabase");
    }
  }

  const handleSubmitRegister = async (formikRegisterStore) => {
    // event.preventDefault();

    try {
      setLoading(true);
      setErrorMessage({ code: "", message: "" });
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("handle", "==", formikRegisterStore.values.handle)
      );
      const usernameQuerySnapshot = await getDocs(q);

      if (!usernameQuerySnapshot.empty) {
        // username already exists

        setLoading(false);
        setErrorMessage({
          code: "username-already-exists",
          message: t("username_taken"),
        });
      } else {
        // username is available, try to create user and put info to database

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formikRegisterStore.values.email,
          formikRegisterStore.values.password
        );

        const actionCodeSettings = {
          // change to senf.koeln on production
          url: "https://senf.koeln/verify",
        };

        await sendEmailVerification(auth.currentUser, actionCodeSettings);
        await createUserInDatabase(userCredential, formikRegisterStore);

        setLoading(false);

        const emailWrapper = {
          email: formikRegisterStore.values.email,
        };

        setEmailRegistrationSubmitted(true);

        // history.push("/verify", emailWrapper);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false);

      setLoading(false);
      setErrorMessage({
        code: errorCode,
        message: t(generateErrorMessage(errorCode)),
      });
    }
  };

  const handleProviderSignin = async (providerName) => {
    try {
      let provider;
      let result;
      let credential;

      if (providerName === "google") {
        provider = new GoogleAuthProvider();
        provider.addScope("email");
        result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        credential = GoogleAuthProvider.credentialFromResult(result);
      }
      if (providerName === "facebook") {
        provider = new FacebookAuthProvider();
        provider.addScope("email");
        result = await signInWithPopup(auth, provider);
        credential = FacebookAuthProvider.credentialFromResult(result);
      }
      const token = credential.accessToken;
      // The signed-in user info.
      const { user } = result;

      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists() && user) {
        console.log("user not existing yet", user.uid, user);
        await createUserFromProviderInDatabase(user);
        dispatch({ type: SET_AUTHENTICATED });
        dispatch(getUserData(user.uid));
        setVerifiedUser(true);
      } else if (user) {
        console.log("user already exists", user.uid, user);
        dispatch({ type: SET_AUTHENTICATED });
        dispatch(getUserData(user.uid));

        if (
          user.description &&
          user.zipcode &&
          user.photoURL &&
          user.age &&
          user.sex
        ) {
          setAuthOpen(false);
        } else {
          setVerifiedUser(true);
        }
      }
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const { email } = error;
      // The AuthCredential type that was used.
      let credential;
      if (providerName === "google") {
        credential = GoogleAuthProvider.credentialFromError(error);
      }
      if (providerName === "facebook") {
        credential = FacebookAuthProvider.credentialFromError(error);
      }

      throw new Error(errorCode, errorMessage, email, credential);
    }
  };

  const handleSubmitEditDetails = async (data) => {
    if (
      userIdInFirebase !== user.userId ||
      user.isAdmin === false ||
      user.isSuperAdmin === false ||
      user.isModerator === false
    ) {
      throw new Error("user not authorized to handleSubmitEditDetails");
    }

    await updateDoc(doc(db, "users", user.userId), {
      handle: data.handle ? data.handle : user.handle,
      description: data.description ? data.description : null,
      zipcode: data.zipcode ? data.zipcode : null,
      age: data.birthyear ? data.birthyear : null,
      sex: data.gender ? data.gender : null,
    })
      .then(() => {
        dispatch(getUserData(user.userId)).then(() => {
          setAuthOpen(false);
          setAuthEditOpen(false);
        });
      })
      .catch((error) => {
        throw new Error(error, "error in handleSubmitEditDetails");
      });
  };

  async function handleImageUpload(event) {
    if (
      userIdInFirebase !== user.userId ||
      user.isAdmin === false ||
      user.isSuperAdmin === false ||
      user.isModerator === false
    ) {
      throw new Error("user not authorized to handleImageUpload");
    }
    const imageFile = event.target.files[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.03,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };
    try {
      setUploadingImage(true);
      const compressedFile = await imageCompression(imageFile, options);

      const storage = getStorage();
      const storageRef = ref(storage, `profileimages/thumbnail`);
      const userRef = doc(db, `users/${user.userId}`);

      await uploadBytes(storageRef, compressedFile).then((snapshot) => {
        console.log("Uploaded a file!");
      });
      const photoURL = await getDownloadURL(storageRef);
      // setUploadedImage(photoUrl);
      await updateDoc(userRef, { photoURL }).then(() => {
        dispatch(getUserData(user.userId));
        setUploadingImage(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // const keySubmitRef = useRef(null);

  // useEffect(() => {
  //   const listener = (event) => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. Run your function.");
  //       // callMyFunction();
  //       keySubmitRef.current?.click();
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    <Fragment>
      <SwipeModal
        openModal={authOpen || authEditOpen}
        setOpenModal={setAuthOpen}
        zIndex={9999999999}
        backgroundColor="#f9f1d7"
      >
        <AuthComponent
          errorMessage={errorMessage}
          user={user}
          loginLoading={loading}
          handleSubmitLogin={(formikLoginStore) =>
            signInWithEmailAndPassword(
              formikLoginStore.values.email,
              formikLoginStore.values.password
            )
          }
          handleSubmitRegister={(registerData) =>
            handleSubmitRegister(registerData)
          }
          handleGoogleSignIn={() => handleProviderSignin("google")}
          handleFacebookSignIn={() => handleProviderSignin("facebook")}
          handleImageUpload={handleImageUpload}
          uploadingImage={uploadingImage}
          handleSubmitEditDetails={handleSubmitEditDetails}
          emailRegistrationSubmitted={emailRegistrationSubmitted}
          verifiedUser={verifiedUser}
          handleClose={() => {
            setAuthOpen(false);
            setAuthEditOpen(false);
          }}
        />
      </SwipeModal>
    </Fragment>
  );
};

export default memo(Auth);
