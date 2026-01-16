"use client";

import { useState } from "react";

/* ================== TYPES ================== */

type Lesson = { name: string };
type Chapter = { name: string; lessons: Lesson[] };

type ExamQuestion = {
  id: number;
  question: string;
  options: string[];
  hint: string;
  explanation: string;
};

/* ================== DATA HÓA ================== */

const chemistryData: Record<string, Chapter[]> = {
  "10": [
    {
      name: "Chương 1. Cấu tạo nguyên tử",
      lessons: [
        { name: "Bài 1. Thành phần của nguyên tử" },
        { name: "Bài 2. Nguyên tố hóa học" },
        { name: "Bài 3. Cấu trúc lớp vỏ electron nguyên tử" },
        { name: "Bài 4. Ôn tập Chương 1" }
      ]
    },
    {
      name: "Chương 2. Bảng tuần hoàn và định luật tuần hoàn",
      lessons: [
        { name: "Bài 5. Cấu tạo của bảng tuần hoàn" },
        { name: "Bài 6. Xu hướng biến đổi tính chất của nguyên tử" },
        { name: "Bài 7. Xu hướng biến đổi tính chất của hợp chất" },
        { name: "Bài 8. Định luật tuần hoàn – Ý nghĩa bảng tuần hoàn" },
        { name: "Bài 9. Ôn tập Chương 2" }
      ]
    },
    {
      name: "Chương 3. Liên kết hóa học",
      lessons: [
        { name: "Bài 10. Quy tắc octet" },
        { name: "Bài 11. Liên kết ion" },
        { name: "Bài 12. Liên kết cộng hóa trị" },
        { name: "Bài 13. Liên kết hydrogen và tương tác Van der Waals" },
        { name: "Bài 14. Ôn tập Chương 3" }
      ]
    },
    {
      name: "Chương 4. Phản ứng oxi hóa – khử",
      lessons: [
        { name: "Bài 15. Phản ứng oxi hóa – khử" },
        { name: "Bài 16. Ôn tập Chương 4" }
      ]
    },
    {
      name: "Chương 5. Năng lượng hóa học",
      lessons: [
        { name: "Bài 17. Biến thiên enthalpy" },
        { name: "Bài 18. Ôn tập Chương 5" }
      ]
    },
    {
      name: "Chương 6. Tốc độ phản ứng",
      lessons: [
        { name: "Bài 19. Tốc độ phản ứng" },
        { name: "Bài 20. Ôn tập Chương 6" }
      ]
    },
    {
      name: "Chương 7. Nhóm halogen",
      lessons: [
        { name: "Bài 21. Nhóm halogen" },
        { name: "Bài 22. Hydrogen halide – muối halide" },
        { name: "Bài 23. Ôn tập Chương 7" }
      ]
    }
  ],
  "11": [
    {
      name: "Chương 1. Cân bằng hóa học",
      lessons: [
        { name: "Bài 1. Khái niệm cân bằng hóa học" },
        { name: "Bài 2. Cân bằng trong dung dịch nước" },
        { name: "Bài 3. Ôn tập Chương 1" }
      ]
    },
    {
      name: "Chương 2. Nitrogen – Sulfur",
      lessons: [
        { name: "Bài 4. Nitrogen" },
        { name: "Bài 5. Ammonia và muối ammonium" },
        { name: "Bài 6. Hợp chất của nitrogen với oxygen" },
        { name: "Bài 7. Sulfur và sulfur dioxide" },
        { name: "Bài 8. Sulfuric acid và muối sulfate" },
        { name: "Bài 9. Ôn tập Chương 2" }
      ]
    },
    {
      name: "Chương 3. Đại cương hóa học hữu cơ",
      lessons: [
        { name: "Bài 10. Hợp chất hữu cơ và hóa học hữu cơ" },
        { name: "Bài 11. Phương pháp tách và tinh chế" },
        { name: "Bài 12. Công thức phân tử hợp chất hữu cơ" },
        { name: "Bài 13. Cấu tạo hóa học hợp chất hữu cơ" },
        { name: "Bài 14. Ôn tập Chương 3" }
      ]
    },
    {
      name: "Chương 4. Hydrocarbon",
      lessons: [
        { name: "Bài 15. Alkane" },
        { name: "Bài 16. Hydrocarbon không no" },
        { name: "Bài 17. Aren (hydrocarbon thơm)" },
        { name: "Bài 18. Ôn tập Chương 4" }
      ]
    },
    {
      name: "Chương 5. Dẫn xuất halogen – alcohol – phenol",
      lessons: [
        { name: "Bài 19. Dẫn xuất halogen" },
        { name: "Bài 20. Alcohol" },
        { name: "Bài 21. Phenol" },
        { name: "Bài 22. Ôn tập Chương 5" }
      ]
    },
    {
      name: "Chương 6. Hợp chất carbonyl – carboxylic acid",
      lessons: [
        { name: "Bài 23. Hợp chất carbonyl" },
        { name: "Bài 24. Carboxylic acid" },
        { name: "Bài 25. Ôn tập Chương 6" }
      ]
    }
  ],
  "12": [
    {
      name: "Chương 1. Ester – Lipid",
      lessons: [
        { name: "Bài 1. Ester – Lipid" },
        { name: "Bài 2. Xà phòng và chất giặt rửa" },
        { name: "Bài 3. Ôn tập Chương 1" }
      ]
    },
    {
      name: "Chương 2. Carbohydrate",
      lessons: [
        { name: "Bài 4. Glucose – Fructose" },
        { name: "Bài 5. Saccharose – Maltose" },
        { name: "Bài 6. Tinh bột – Cellulose" },
        { name: "Bài 7. Ôn tập Chương 2" }
      ]
    },
    {
      name: "Chương 3. Hợp chất chứa nitrogen",
      lessons: [
        { name: "Bài 8. Amine" },
        { name: "Bài 9. Amino acid và peptide" },
        { name: "Bài 10. Protein và enzyme" },
        { name: "Bài 11. Ôn tập Chương 3" }
      ]
    },
    {
      name: "Chương 4. Polymer",
      lessons: [
        { name: "Bài 12. Đại cương về polymer" },
        { name: "Bài 13. Vật liệu polymer" },
        { name: "Bài 14. Ôn tập Chương 4" }
      ]
    },
    {
      name: "Chương 5. Pin điện và điện phân",
      lessons: [
        { name: "Bài 15. Thế điện cực – nguồn điện hóa học" },
        { name: "Bài 16. Điện phân" },
        { name: "Bài 17. Ôn tập Chương 5" }
      ]
    },
    {
      name: "Chương 6. Đại cương về kim loại",
      lessons: [
        { name: "Bài 18. Cấu tạo tinh thể kim loại" },
        { name: "Bài 19. Tính chất kim loại" },
        { name: "Bài 20. Điều chế kim loại" },
        { name: "Bài 21. Hợp kim" },
        { name: "Bài 22. Ăn mòn kim loại" },
        { name: "Bài 23. Ôn tập Chương 6" }
      ]
    },
    {
      name: "Chương 7. Nhóm IA – IIA",
      lessons: [
        { name: "Bài 24. Nhóm IA" },
        { name: "Bài 25. Nhóm IIA" },
        { name: "Bài 26. Ôn tập Chương 7" }
      ]
    },
    {
      name: "Chương 8. Kim loại chuyển tiếp – Phức chất",
      lessons: [
        { name: "Bài 27. Kim loại chuyển tiếp" },
        { name: "Bài 28. Đại cương về phức chất" },
        { name: "Bài 29. Tính chất và ứng dụng phức chất" },
        { name: "Bài 30. Ôn tập Chương 8" }
      ]
    }
  ]
};

/* ================== UI COMPONENTS ================== */

function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: 24,
        padding: 24,
        borderRadius: 16,
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >
      <h2 style={{ fontSize: 20, color: "#1a237e", marginBottom: 8 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function QuestionWithHint({ q }: { q: ExamQuestion }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "#ffffff",
        padding: 16,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: 16,
        color: "#0b0f2a"
      }}
    >
      <p style={{ fontWeight: 700 }}>Câu {q.id}:</p>
      <p>{q.question}</p>

      <ul>
        {q.options.map((opt, i) => (
          <li key={i}>
            {String.fromCharCode(65 + i)}. {opt}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setOpen(!open)}
        style={{
          marginTop: 8,
          padding: "6px 10px",
          borderRadius: 8,
          border: "1px solid #1e88e5",
          background: "#e3f2fd",
          color: "#1a237e",
          cursor: "pointer"
        }}
      >
        {open ? "Ẩn HINTS" : "🔍 HINTS"}
      </button>

      {open && (
        <div
          style={{
            marginTop: 10,
            padding: 10,
            background: "#f5f9ff",
            borderLeft: "5px solid #1e88e5",
            borderRadius: 8
          }}
        >
          <p>
            <strong>Gợi ý:</strong> {q.hint}
          </p>
          <p style={{ marginTop: 6 }}>
            <strong>Giải thích:</strong> {q.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

/* ================== MAIN PAGE ================== */

export default function Page() {
  const [grade, setGrade] = useState<number | null>(null);
  const [chapterIndex, setChapterIndex] = useState<number | null>(null);
  const [lessonIndex, setLessonIndex] = useState<number | null>(null);
  const [includeExam, setIncludeExam] = useState(true);

  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  const chapters = grade ? chemistryData[String(grade)] : [];
  const lessons =
    grade !== null && chapterIndex !== null
      ? chapters[chapterIndex]?.lessons ?? []
      : [];

  const handleGenerate = async () => {
    if (grade === null || chapterIndex === null || lessonIndex === null) return;

    setLoading(true);

    const prompt = `
Bạn là giáo viên Hóa học THPT, chuyên luyện thi TN THPT.

BÀI HỌC:
- Lớp ${grade}
- ${chapters[chapterIndex].name}
- ${lessons[lessonIndex].name}

HÃY TRẢ VỀ ĐÚNG JSON (KHÔNG TEXT NGOÀI JSON).

Mỗi câu có dạng:
{
  "id": number,
  "question": "...",
  "options": ["A...", "B...", "C...", "D..."],
  "hint": "Gợi ý ngắn gọn",
  "explanation": "Giải thích chi tiết + đáp án cuối"
}

Tạo 3 câu hỏi TN THPT có mức độ Easy–Medium–Hard.
`;

    try {
      const res = await fetch("/api/generate-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      setExamQuestions(data.exam || []);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectStyle = {
    width: "100%",
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.2)",
    background: "#ffffff",
    color: "#0b0f2a",
    cursor: "pointer"
  } as const;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 40,
        background: "#f5f9ff",
        color: "#0b0f2a",
        fontFamily: "system-ui"
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontSize: 42, color: "#1a237e" }}>
          ⚛ Chemistry AI Assistant
        </h1>
        <p style={{ fontSize: 18, color: "#1565c0" }}>
          Công cụ tạo đề TN THPT – Môn Hóa (có HINTS)
        </p>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Card title="Chọn lớp">
          <select
            style={selectStyle}
            value={grade ?? ""}
            onChange={(e) => {
              setGrade(Number(e.target.value));
              setChapterIndex(null);
              setLessonIndex(null);
            }}
          >
            <option value="" disabled>
              -- Chọn lớp --
            </option>
            <option value={10}>Lớp 10</option>
            <option value={11}>Lớp 11</option>
            <option value={12}>Lớp 12</option>
          </select>
        </Card>

        {grade !== null && (
          <Card title="Chọn chương">
            <select
              style={selectStyle}
              value={chapterIndex ?? ""}
              onChange={(e) => {
                setChapterIndex(Number(e.target.value));
                setLessonIndex(null);
              }}
            >
              <option value="" disabled>
                -- Chọn chương --
              </option>
              {chapters.map((c, i) => (
                <option key={i} value={i}>
                  {c.name}
                </option>
              ))}
            </select>
          </Card>
        )}

        {chapterIndex !== null && (
          <Card title="Chọn bài">
            <select
              style={selectStyle}
              value={lessonIndex ?? ""}
              onChange={(e) => setLessonIndex(Number(e.target.value))}
            >
              <option value="" disabled>
                -- Chọn bài --
              </option>
              {lessons.map((l, i) => (
                <option key={i} value={i}>
                  {l.name}
                </option>
              ))}
            </select>
          </Card>
        )}

        {lessonIndex !== null && (
          <Card title="Cấu hình đề">
            <label style={{ display: "flex", gap: 10 }}>
              <input
                type="checkbox"
                checked={includeExam}
                onChange={(e) => setIncludeExam(e.target.checked)}
              />
              Bao gồm câu hỏi TN THPT
            </label>

            <button
              onClick={() => {
                window.open("https://www.canva.com/ai/code", "_blank");
                handleGenerate();
              }}
              style={{
                marginTop: 20,
                width: "100%",
                padding: 16,
                fontSize: 20,
                fontWeight: 700,
                borderRadius: 12,
                border: "none",
                background: "#1e88e5",
                color: "white",
                cursor: "pointer"
              }}
            >
              🚀 Generate Worksheet
            </button>
          </Card>
        )}

        {loading && (
          <p style={{ textAlign: "center", color: "#1565c0" }}>
            ⏳ Đang tạo đề...
          </p>
        )}

        {examQuestions.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h2 style={{ color: "#1a237e", marginBottom: 12 }}>
              III. CÂU HỎI TN THPT (ẨN ĐÁP ÁN – CÓ HINTS)
            </h2>

            {examQuestions.map((q) => (
              <QuestionWithHint key={q.id} q={q} />
            ))}
          </div>
        )}

        <style jsx global>{`
          select option {
            background: #1a237e;
            color: #ff1744;
          }
          select option:hover {
            background: #283593;
          }
        `}</style>
      </div>
    </main>
  );
}
