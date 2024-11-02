
import { auth,db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
export const PostCard = ({post,toggle,setToggle}) => {
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    async function handleDelete(){
        const postDoc = doc(db,"posts",post.id);
        await deleteDoc(postDoc);
        setToggle(!toggle);
    }
  return (
    <div className="card">
        <p className="title">{post.title}</p>
        <p className="description">{post.description}</p>
        <p className="control">
            <span className="author">{post.author.name}</span>
            {isLogin && ((auth.currentUser.uid === post.author.id) &&  <span onClick={handleDelete} className="delete"><i className="bi bi-trash3"></i></span>)}
            
        </p>
    </div>
  )
}
