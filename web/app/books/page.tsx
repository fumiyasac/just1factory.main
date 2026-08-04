// 旧 pages/books.vue の移植
import BookHeadline from "@/components/books/BookHeadline";
import BookInformation from "@/components/books/BookInformation";

export default function Books() {
  return (
    <div>
      <BookHeadline />
      <BookInformation />
    </div>
  );
}
