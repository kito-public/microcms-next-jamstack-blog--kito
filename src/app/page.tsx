import Image from 'next/image'
import styles from './styles/globals.module.scss'
import Link from "next/link";
import { getList } from "../app/libs/microcms";

export default async function StaticPage() {
 const { contents } = await getList();

 // ページの生成された時間を取得
 const time = new Date().toLocaleString();

 if (!contents || contents.length === 0) {
  return <h1>No contents</h1>;
 }

 return (
  <div>
   <h1 className={styles.text__blue}>更新::{time}</h1>
   <ul>
    {contents.map((post) => {
     return (
      <li key={post.id}>
       <Link href={`/blog/${post.id}`}>{post.title}</Link>
      </li>
     );
    })}
   </ul>
  </div>
 );
}
