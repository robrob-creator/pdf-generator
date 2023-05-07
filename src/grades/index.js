/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import background from "../images/bg.png";
import header from "../images/logo-title.JPG";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useEffect } from "react";
import { getGradesById } from "../services/grades";
import { useState } from "react";
import store from "store";
import { useSearchParams } from "react-router-dom";
const ref = React.createRef();

export default function PDF() {
  const [firstSemGrades, setFirstSemGrades] = useState();
  const [profile, setProfile] = useState();
  const [secondSemGrades, setSecondSemGrades] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [details, setDetails] = useState();
  const fetchProfile = async (values) => {
    let grade = await getGradesById(searchParams.get("id"), {
      ...values,
    });
    setDetails(grade?.data?.data?.list[0]);
    setProfile(grade?.data?.data?.list[0]?.student);
    const grouped = grade?.data?.data?.list?.reduce(
      (catsSoFar, { subject, gradingPeriod, grade, gradedBy }) => {
        if (!catsSoFar[subject.name]) catsSoFar[subject.name] = [];
        catsSoFar[subject.name].push({
          code: subject.subject_code,
          gradingPeriod,
          grade,
          gradedBy,
        });
        return catsSoFar;
      },
      {}
    );

    setFirstSemGrades(Object.keys(grouped).map((key) => grouped[key]));
    return grade;
  };
  const fetchSecondSem = async (values) => {
    let grade = await getGradesById(searchParams.get("id"), {
      ...values,
    });
    const grouped = grade?.data?.data?.list?.reduce(
      (catsSoFar, { subject, gradingPeriod, grade, gradedBy }) => {
        if (!catsSoFar[subject.name]) catsSoFar[subject.name] = [];
        catsSoFar[subject.name].push({
          code: subject.subject_code,
          gradingPeriod,
          grade,
          gradedBy,
        });
        return catsSoFar;
      },
      {}
    );

    setSecondSemGrades(Object.keys(grouped).map((key) => grouped[key]));
    return grade;
  };

  useEffect(() => {
    store.set("accessToken", searchParams.get("token"));
    fetchProfile({ semester: "1st" });
    fetchSecondSem({ semester: "2nd" });
  }, []);

  const printDocument = () => {
    html2canvas(ref.current, {
      width: 810,
      height: 1010,
      scale: 1,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  return (
    <center>
      <div>
        <div style={{ padding: "40px" }}>
          <button
            class="dl-pdf pdf"
            style={{
              padding: "20px",
              borderRadius: 40,
              backgroundColor: "#72ffaf",
            }}
            onClick={() => printDocument()}
          >
            Generate Pdf
          </button>
        </div>
        <div ref={ref} style={{ width: 810, height: 919 }}>
          <div style={{ width: 810, height: 504, position: "relative" }}>
            <img
              style={{
                width: 810,
                right: 0,
                paddingTop: "13px",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingBottom: "13px",
              }}
              src={header}
            />
            <div
              style={{
                width: 810,
                height: 438,
                left: 0,
                top: 1,
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  width: 810,
                  height: 958,
                  left: 0,
                  top: 190,
                  position: "absolute",
                }}
              />

              <div
                style={{
                  width: "810px",
                  top: "105px",
                  height: "903px",
                  position: "absolute",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100%",
                  backgroundImage: `url(${background})`,
                }}
              >
                {/**cute here */}
                <center style={{ marginTop: "100px" }}>
                  <h5>REPORT ON LEARNING PROGRESS AND ACHIEVEMENT</h5>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      fontSize: 14,
                      bottom: 0,
                    }}
                  >
                    Name:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {profile?.firstName ?? ""} {profile?.lastName ?? ""}
                    </span>
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      fontSize: 14,
                      bottom: 0,
                    }}
                  >
                    Year and Section:{""}
                    <span style={{ fontWeight: 600 }}>
                      {profile?.gradeLevel ?? ""}
                    </span>
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      fontSize: 14,
                      bottom: 0,
                    }}
                  >
                    Strand/Track:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {profile?.strand_track ?? ""}
                    </span>
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      fontSize: 14,
                      bottom: 0,
                    }}
                  >
                    School Year:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {details?.schoolYear ?? ""}
                    </span>
                  </p>
                  <h5
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      bottom: 0,
                    }}
                  >
                    1st Semester
                  </h5>
                  <table style={{ color: "black", top: 0 }}>
                    <tr>
                      <th>Subject Code</th>
                      <th>Midterm</th>
                      <th>Final</th>
                    </tr>

                    {firstSemGrades &&
                      firstSemGrades.map((item, index) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center", color: "black" }}>
                              {" "}
                              {item[0] && item[0]?.code}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item[0]
                                ? item.filter(
                                    (i) => i?.gradingPeriod === "1st"
                                  )[0]?.grade
                                : "0"}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item[0]
                                ? item.filter(
                                    (i) => i?.gradingPeriod === "2nd"
                                  )[0]?.grade
                                : "0"}
                            </td>
                          </tr>
                        );
                      })}
                  </table>
                </center>

                <center style={{ marginTop: "20px" }}>
                  <h5
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      bottom: 0,
                    }}
                  >
                    2nd Semester
                  </h5>
                  <table>
                    <tr>
                      <th>Subject Code</th>
                      <th>Midterm</th>
                      <th>Final</th>
                    </tr>

                    {secondSemGrades &&
                      secondSemGrades.map((item, index) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              {" "}
                              {item[0] && item[0]?.code}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item[0]
                                ? item.filter(
                                    (i) => i?.gradingPeriod === "1st"
                                  )[0]?.grade
                                : "0"}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item[0]
                                ? item.filter(
                                    (i) => i?.gradingPeriod === "2nd"
                                  )[0]?.grade
                                : "0"}
                            </td>
                          </tr>
                        );
                      })}
                  </table>
                </center>

                {/**cute here */}

                <p
                  style={{
                    fontSize: 17,
                    paddingRight: "71px",
                    paddingLeft: "71px",
                    position: "absolute",
                    bottom: 0,
                    color: "black",
                  }}
                >
                  Not Valid without School Seal
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
}
