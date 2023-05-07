/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import background from "../images/bg.png";
import header from "../images/logo-title.JPG";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useEffect } from "react";
import { useState } from "react";
import { getProfile } from "../services/user";
import { getGrades } from "../services/grades";
import { getSubjects } from "../services/subjects";
const ref = React.createRef();

export default function ProgressReport() {
  const [data, setData] = useState();
  const [update, handleUpdates] = useState(true);
  const [subject, setSubject] = useState();
  const [profile, setProfile] = useState();

  const outerContainerStyle = {
    width: "50%", // Set the desired width for the outer container
    marginBottom: 20,
    marginRight: "auto", // Adjust the margin as needed
    marginLeft: 80,
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "10px",
  };

  const columnStyle = {
    display: "flex", // Use display: flex instead of display: grid
    flexDirection: "column",
    alignItems: "start", // Align the content within each column to the start
    gap: "10px",
  };

  const paragraphStyle = {
    margin: "0",
    fontSize: "8",
    fontWeight: 600,
  };

  const fetchProfile = async () => {
    let res = await getProfile();
    setProfile(res?.data?.data?.profile);
  };

  const fetchGrades = async () => {
    let res = await getGrades({});
    setData(res?.data?.data?.list);
  };
  const fetchSubjects = async () => {
    let res = await getSubjects({});
    setSubject(res?.data?.data?.list);
  };
  const rateResult = (value) => {
    if (value <= 10) return "Very Good";
    if (value <= 19) return "Good";
    if (value <= 25) return "Satisfactory";
    if (value >= 26) return "Very unsatisfactory";
  };

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
    if (profile) {
      fetchGrades();
    }
    if (profile) {
      fetchSubjects();
    }
  }, [update, profile]);

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
                <center style={{ marginTop: "100px" }}>
                  <h5> LEARNERS PROGRESS REPORT</h5>
                </center>

                <center style={{ marginTop: "20px" }}>
                  <div style={outerContainerStyle}>
                    <div style={containerStyle}>
                      <div style={columnStyle}>
                        <p style={paragraphStyle}>Outstanding</p>
                        <p style={paragraphStyle}>Very Satisfactory</p>
                        <p style={paragraphStyle}>Satisfactory</p>
                        <p style={paragraphStyle}>Fairly Satisfactory</p>
                        <p style={paragraphStyle}>Did Not Meet Expectations</p>
                      </div>
                      <div style={columnStyle}>
                        <p style={paragraphStyle}>90-100</p>
                        <p style={paragraphStyle}>85-89</p>
                        <p style={paragraphStyle}>80-84</p>
                        <p style={paragraphStyle}>75-79</p>
                        <p style={paragraphStyle}>74 Below</p>
                      </div>
                    </div>
                  </div>
                  <table style={{ color: "black", top: 0 }}>
                    <tr>
                      <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                        Subjects
                      </th>
                      <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                        Outstanding
                      </th>
                      <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                        Very Satisfactory
                      </th>
                      <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                        Satisfactory
                      </th>
                      <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                        Fairly Satisfactory
                      </th>
                      <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                        Did Not Meet Expectations
                      </th>
                    </tr>

                    {subject &&
                      subject?.map((item, index) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              {item?.subject_code}
                            </td>

                            <td style={{ textAlign: "center" }}>
                              {
                                data?.filter(
                                  (e) =>
                                    e?.subject?.name === item?.name &&
                                    e.grade >= 90
                                )?.length
                              }
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {
                                data?.filter(
                                  (e) =>
                                    e?.subject?.name === item?.name &&
                                    e.grade >= 85 &&
                                    e.grade < 90
                                )?.length
                              }
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {
                                data?.filter(
                                  (e) =>
                                    e?.subject?.name === item?.name &&
                                    e.grade >= 80 &&
                                    e.grade < 85
                                )?.length
                              }
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {
                                data?.filter(
                                  (e) =>
                                    e?.subject?.name === item?.name &&
                                    e.grade >= 75 &&
                                    e.grade < 80
                                )?.length
                              }
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {
                                data?.filter(
                                  (e) =>
                                    e?.subject?.name === item?.name &&
                                    e.grade < 75
                                )?.length
                              }
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
                    opacity: "30%",
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
