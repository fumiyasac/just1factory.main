// 旧 components/index/Introduction.vue の移植
import Avatar from "@/components/index/Avatar";
import Profile from "@/components/index/Profile";
import Skills from "@/components/index/Skills";

export default function Introduction() {
  return (
    <div className="container">
      <div className="introduction_block">
        <h2>Developer&apos;s Profile</h2>
        <div className="row">
          <div className="col-3">
            <Avatar />
          </div>
          <div className="col-9">
            <Profile />
            <hr />
            <Skills />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
