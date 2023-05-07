/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import background from "../images/bg.png";
import header from "../images/logo-title.JPG";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useEffect } from "react";
import { getGrades, getGradesById } from "../services/grades";
import { useState } from "react";
import store from "store";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../services/user";
import { getSections } from "../services/sections";
import { getSubjects } from "../services/subjects";
const ref = React.createRef();

export default function StudentList() {
  const [data, setData] = useState();
  const [showGradeEdit, setShowGradeEdit] = useState();
  const [currentRow, setCurrentRow] = useState();
  const [showUpload, handleUpload] = useState(false);
  const [section, setSection] = useState();
  const [grades, setGrades] = useState();
  const [student, setStudent] = useState();
  const [details, setDetails] = useState();
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let subject = searchParams.get("subject");
  let subjectDescription = searchParams.get("subject_description");
  const firstSemGrades = grades?.filter((item) => item.gradingPeriod === "1st");
  const secondSemGrade = grades?.filter((item) => item.gradingPeriod === "2nd");
  const fetchSections = async (values) => {
    let res = await getSections({ id });
    setSection(res?.data?.data?.list[0]);
    console.log(res?.data);
    setData(res?.data?.data?.list[0]?.students);
    setDetails(res?.data?.data?.list[0]);
  };
  const fetchGrades = async () => {
    let res = await getGrades({ subject, section: id });
    setGrades(res?.data?.data?.list);
  };
  useEffect(() => {
    fetchSections();
    fetchGrades();
  }, []);
  console.log(
    "the datat your looking for",
    grades?.filter(
      (item) =>
        item.gradingPeriod === "2nd" && item.student?.idNo === "30395224"
    )
  );

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
                  <h5>STUDENT LIST</h5>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      fontSize: 14,
                      bottom: 0,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>STRAND: </span>
                    {details?.students[0]?.student?.strand_track ?? ""}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      fontSize: 14,
                      bottom: 0,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>GRADE LEVEL: </span>{" "}
                    {details?.gradeLevel ?? ""}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      fontSize: 14,
                      bottom: 0,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>SUBJECT CODE: </span>{" "}
                    {searchParams.get("subject-code") ?? ""}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      fontSize: 14,
                      bottom: 0,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>SUBJECT NAME: </span>{" "}
                    {details?.name ?? ""}
                  </p>
                  <table style={{ color: "black", top: 0 }}>
                    <tr>
                      <th>Subjects</th>
                      <th>Student ID Number</th>
                      <th>schoolYear</th>
                    </tr>

                    {data?.map((item, index) => {
                      return (
                        <tr>
                          <td
                            style={{
                              textAlign: "center",
                              color: "black",
                            }}
                          >
                            {`${item?.student?.firstName} ${item?.student?.lastName}`}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {item?.student?.idNo}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {details?.schoolYear}
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
