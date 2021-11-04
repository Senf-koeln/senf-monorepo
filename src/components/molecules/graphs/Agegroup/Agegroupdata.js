/** @format */

import React from "react";

export function Agegroupdata(screams, likes, filteredTopic) {
  // const listOfIdsPerTopic1 = [];

  // for (const scream of screams) {
  //   if (scream.Thema === filteredTopic) {
  //     listOfIdsPerTopic1.push(scream.id);
  //   }
  // }

  // const votesTopic1agegroupUnder18 = likes.reduce((acc, cur) => {
  //   // cur refers to each object in the array votes & acc is a number that get returned

  //   if (
  //     listOfIdsPerTopic1.includes(cur.ideaId) &&
  //     cur.age >= 14 &&
  //     cur.age < 18
  //   ) {
  //     return ++acc;
  //   } else {
  //     return acc;
  //   }
  // }, 0); // here, 0 is the initiual number for the accumulator

  // const votesTopic1agegroupBetween18and24 = likes.reduce((acc, cur) => {
  //   if (
  //     listOfIdsPerTopic1.includes(cur.ideaId) &&
  //     cur.age >= 18 &&
  //     cur.age < 25
  //   ) {
  //     return ++acc;
  //   } else {
  //     return acc;
  //   }
  // }, 0); // here, 0 is the initiual number for the accumulator

  // const votesTopic1agegroupBetween25and34 = likes.reduce((acc, cur) => {
  //   if (
  //     listOfIdsPerTopic1.includes(cur.ideaId) &&
  //     cur.age >= 25 &&
  //     cur.age < 34
  //   ) {
  //     return ++acc;
  //   } else {
  //     return acc;
  //   }
  // }, 0); // here, 0 is the initiual number for the accumulator

  // const votesTopic1agegroupBetween35and44 = likes.reduce((acc, cur) => {
  //   if (
  //     listOfIdsPerTopic1.includes(cur.ideaId) &&
  //     cur.age >= 35 &&
  //     cur.age < 44
  //   ) {
  //     return ++acc;
  //   } else {
  //     return acc;
  //   }
  // }, 0); // here, 0 is the initiual number for the accumulator

  // const votesTopic1agegroupBetween45and54 = likes.reduce((acc, cur) => {
  //   if (
  //     listOfIdsPerTopic1.includes(cur.ideaId) &&
  //     cur.age >= 45 &&
  //     cur.age < 54
  //   ) {
  //     return ++acc;
  //   } else {
  //     return acc;
  //   }
  // }, 0); // here, 0 is the initiual number for the accumulator

  // const votesTopic1agegroupBetween55and64 = likes.reduce((acc, cur) => {
  //   if (
  //     listOfIdsPerTopic1.includes(cur.ideaId) &&
  //     cur.age >= 55 &&
  //     cur.age < 64
  //   ) {
  //     return ++acc;
  //   } else {
  //     return acc;
  //   }
  // }, 0); // here, 0 is the initiual number for the accumulator

  // const votesTopic1agegroupOver64 = likes.reduce((acc, cur) => {
  //   if (
  //     listOfIdsPerTopic1.includes(cur.ideaId) &&
  //     cur.age >= 65 &&
  //     cur.age < 104
  //   ) {
  //     return ++acc;
  //   } else {
  //     return acc;
  //   }
  // }, 0); // here, 0 is the initiual number for the accumulator

  const dataOutcome = [
    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 14 && age < 18
    ).length,
    likes.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 14 && age < 18
    ).length,
    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 18 && age < 25
    ).length,
    likes.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 18 && age < 25
    ).length,
    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 25 && age < 35
    ).length,
    likes.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 25 && age < 35
    ).length,

    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 35 && age < 45
    ).length,
    likes.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 35 && age < 45
    ).length,

    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 45 && age < 55
    ).length,
    likes.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 45 && age < 55
    ).length,

    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 55 && age < 65
    ).length,
    likes.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 55 && age < 65
    ).length,

    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 65 && age < 105
    ).length,

    likes.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 65 && age < 105
    ).length,
  ];
  return dataOutcome;
}
