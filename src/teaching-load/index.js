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
import { getUsers } from "../services/user";
import { getSections } from "../services/sections";
import { getSubjects } from "../services/subjects";
const ref = React.createRef();

export default function TeachingLoad() {
  const [firstSemGrades, setFirstSemGrades] = useState();
  const [profile, setProfile] = useState();
  const [secondSemGrades, setSecondSemGrades] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [details, setDetails] = useState();
  const [section, setSection] = useState();
  const [subject, setSubject] = useState();
  const [selected, setSelected] = useState();
  const [allSection, setAllSection] = useState();
  const [addSectModal, setAddSectModal] = useState();
  const getProfile = async () => {
    let id = searchParams.get("id");
    let res = await getUsers({ id });
    setProfile(res?.data?.data?.list[0]);
  };
  const getTeacherSection = async () => {
    let id = searchParams.get("id");
    let res = await getSections({ teacher: id });
    setSection(res?.data?.data?.list);
  };

  const getSection = async () => {
    let res = await getSections();
    setAllSection(res?.data?.data?.list);
  };

  const fetchSubject = async () => {
    let res = await getSubjects();
    console.log(res.data.data.list);
    setSubject(res.data.data.list);
  };

  useEffect(() => {
    getProfile();
    getTeacherSection();
    fetchSubject();
    getSection();
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
                <center style={{ marginTop: "100px" }}>
                  <h5>Teaching Load</h5>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      fontSize: 14,
                      bottom: 0,
                    }}
                  >
                    Teacher:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {profile?.firstName ?? ""} {profile?.lastName ?? ""}
                    </span>
                  </p>
                </center>
                {/**cute here */}
                {section?.map((item, index) => {
                  return (
                    <center style={{ marginTop: "20px" }}>
                      <p
                        style={{
                          textAlign: "left",
                          marginLeft: 80,
                          fontSize: 14,
                          bottom: 0,
                        }}
                      >
                        Grade Level:{" "}
                        <span style={{ fontWeight: 600 }}>
                          {item?.gradeLevel ?? ""}
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
                          {item?.students[0]?.student?.strand_track ?? ""}
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
                          {item?.schoolYear ?? ""}
                        </span>
                      </p>

                      <table style={{ color: "black", top: 0 }}>
                        <tr>
                          <th>Subjects</th>
                          <th>Schedule</th>
                          <th>schoolYear</th>
                        </tr>

                        {item?.subjects &&
                          item?.subjects
                            ?.filter(
                              (subj) => subj?.teacher?._id === profile?._id
                            )
                            .map((sub, index) => {
                              return (
                                <tr>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      color: "black",
                                    }}
                                  >
                                    {" "}
                                    {sub?.subject?.name}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "center",
                                    }}
                                  >
                                    {sub?.subject?.schedule}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {item?.schoolYear}
                                  </td>
                                </tr>
                              );
                            })}
                      </table>
                    </center>
                  );
                })}

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
