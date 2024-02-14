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
   <h1 className={styles.text__blue}>更新:-:{time}</h1>
   <ul>
    {contents.map((blog) => {
     return (
         <li key={blog.id}>
             {blog.publishedAt}<br />
             {blog.category.length}
          {blog.category.length > 0 && (
            <li className={`py-0.5 pl-0`}>
                     categories:{' '}
           
              {blog.category.map((category, index, array) => {
                const isLast = index === array.length - 1
                return (
                  <>
                    <Link href={`/articles/categories/${category.id}/pages/1`}>
                      <span key={category.id} className={`hover:text-violet-600 cursor-pointer`}>
                        {category.name}
                      </span>
                    </Link>
                    {!isLast ? ', ' : ''}
                  </>
                )
              })}
            </li>
          )}
             
       <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
      </li>
     );
    })}
   </ul>
  </div>
 );
}
