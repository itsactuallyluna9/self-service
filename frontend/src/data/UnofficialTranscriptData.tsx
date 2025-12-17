
export interface UTCourse {
  coursecode: string;
  title: string;
  subtype: string;
  grade: string;
  credits: number;
  qualityPoints: number;
}

// export interface UTStats {
//   attemptedCredits: number;
//   earnedCredits: number;
//   totalCredits: number;
//   gpaCredits: number;
//   qualityPoints: number;
//   gpa: number;
//   classRank: number;
//   classSize: number;
// }

export interface UTTerm {
  term: string;       
  courses: UTCourse[];
  // termStats: UTStats;
  // overallStats: UTStats;
}

export interface UTYear {
  year: number;       
  terms: UTTerm[];
}

export interface UTProgram {
  program: string;
  degree: string;
  curriculum: string;
  degreeAwarded: boolean;
  dateGranted: string | null;
}

export interface UT {
  username: string;
  fullname: string;
  overallCredits: number;
  overallGPA: number;
  transcript: UTYear[];
  programs: UTProgram[];
}


// Mock Unofficial Transcript Data
const mockUT: UT = {
  username: "user123",
  fullname: "First Last",
  programs: [
    {
      program: "Undergraduate",
      degree: "Additional Major",
      curriculum: "Data Science",
      degreeAwarded: false,
      dateGranted: null
    },
    {
      program: "Undergraduate",
      degree: "Bachelor of Arts",
      curriculum: "Computer Science",
      degreeAwarded: false,
      dateGranted: null
    },
    {
      program: "Undergraduate",
      degree: "Minor",
      curriculum: "Applied Mathematics Minor",
      degreeAwarded: false,
      dateGranted: null
    }
  ],
  overallCredits: 20.00,
  overallGPA: 3.9157,
  transcript: [
    {
      year: 2023,
      terms: [
        {
          term: "Fall",
          courses: [
            {
              coursecode: "CSC 140",
              title: "Foundations of Computer Science",
              subtype: "Course",
              grade: "A",
              credits: 1.0,
              qualityPoints: 4.0
            },
            {
              coursecode: "INT 106",
              title: "Gaming (W)",
              subtype: "Writing",
              grade: "A",
              credits: 1.0,
              qualityPoints: 4.0
            },
            {
              coursecode: "INT 111",
              title: "How Do We Know? FYS",
              subtype: "Course",
              grade: "B+",
              credits: 1.0,
              qualityPoints: 3.3
            },
            {
              coursecode: "THE 281",
              title: "Jazz Studio I",
              subtype: "Course",
              grade: "A",
              credits: 1.0,
              qualityPoints: 4.0
            }
          ], // Fall courses
          // termStats: {
          //   attemptedCredits: 4.0,
          //   earnedCredits: 4.0,
          //   totalCredits: 4.0,
          //   gpaCredits: 4.0,
          //   qualityPoints: 15.3,
          //   gpa: 3.825,
          //   classRank: 51,
          //   classSize: 323
          // },
          // overallStats: {
          //   attemptedCredits: 4.0,
          //   earnedCredits: 4.0,
          //   totalCredits: 4.75,
          //   gpaCredits: 4.0,
          //   qualityPoints: 15.3,
          //   gpa: 3.825,
          //   classRank: 51,
          //   classSize: 323
          // }
        }, // Fall term
      ], // 2023 terms
    },
    {
      year: 2025,
      terms: [
        {
          term: "Spring",
          courses: [
            {
              coursecode: "CSC 201",
              title: "Data Structures",
              subtype: "Course",
              grade: "A",
              credits: 1.0,
              qualityPoints: 4.0
            }
          ],
          // termStats: {
          //   attemptedCredits: 2.0,
          //   earnedCredits: 2.0,
          //   totalCredits: 2.0,
          //   gpaCredits: 2.0,
          //   qualityPoints: 6.7,
          //   gpa: 3.35,
          //   classRank: 48,
          //   classSize: 320
          // },
          // overallStats: {
          //   attemptedCredits: 6.0,
          //   earnedCredits: 6.0,
          //   totalCredits: 6.75,
          //   gpaCredits: 6.0,
          //   qualityPoints: 22.0,
          //   gpa: 3.725,
          //   classRank: 50,
          //   classSize: 322
          // }
        }, // Spring term
         {
          term: "Fall",
          courses: [
            {
              coursecode: "CSC 230",
              title: "Database Technlgies",
              subtype: "Course",
              grade: "A",
              credits: 1.0,
              qualityPoints: 4.0
            },
            {
              coursecode: "CSC 301",
              title: "Computer Algorithms",
              subtype: "Course",
              grade: "A",
              credits: 1.0,
              qualityPoints: 4.0
            }
          ],
          // termStats: {
          //   attemptedCredits: 2.0,
          //   earnedCredits: 2.0,
          //   totalCredits: 2.0,
          //   gpaCredits: 2.0,
          //   qualityPoints: 7.3,
          //   gpa: 4.00,
          //   classRank: 1,
          //   classSize: 216
          // },
          // overallStats: {
          //   attemptedCredits: 8.0,
          //   earnedCredits: 8.0,
          //   totalCredits: 8.75,
          //   gpaCredits: 8.0,
          //   qualityPoints: 29.3,
          //   gpa: 4.00,
          //   classRank: 27,
          //   classSize: 216
          // }
        } // Fall term
      ] // 2024 terms
    }
  ] // transcript
};

export default mockUT;
