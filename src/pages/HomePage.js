import { useEffect, useRef, useState } from "react";
import { PostCard } from "../components"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useTitle } from "../hooks/useTitle";
import { SkeletonCard } from "../components/SkeletonCard";

export const HomePage = () => {
    const [posts,setPosts] = useState(new Array(3).fill(false));
    const [toggle,setToggle] = useState(false);
    useTitle("Home");
    const postRef = useRef(collection(db,"posts"));

    useEffect(()=>{
        async function getPosts(){
            const data = await getDocs(postRef.current);
            setTimeout(3000)
            console.log(data);
           setPosts(data.docs.map((document)=> ({...document.data(),id:document.id})))
        }
        getPosts();
    },[toggle])

  return (
    <section>
        { posts.map((post,index) => post ? (<PostCard key={post.id} post={post} toggle = {toggle} setToggle={setToggle}/> ) : (<SkeletonCard key={index} />))}

    </section>
  )
}
