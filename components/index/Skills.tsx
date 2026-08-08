import { Fragment } from "react";

// 旧 components/index/parts_introduction/Skills.vue の移植
// ※ 現行の表記ゆれ（"UI Desigin"）もそのまま維持する
const SKILLS = [
  "Swift",
  "Objective-C",
  "Ruby",
  "PHP",
  "JavaScript",
  "Go",
  "Kotlin",
  "ReactNative",
  "UI Desigin",
];

export default function Skills() {
  return (
    <div className="container text-center skills_block">
      {SKILLS.map((skill) => (
        // バッジ間の空白（現行はHTML改行由来の半角スペース）を {" "} で再現
        <Fragment key={skill}>
          <span className="badge badge-pill badge-info">{skill}</span>{" "}
        </Fragment>
      ))}
    </div>
  );
}
