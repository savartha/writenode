import { useNavigate } from "react-router-dom";
import { auth,db } from "../firebase/config";
import { addDoc,collection } from "firebase/firestore";
import { useTitle } from "../hooks/useTitle";

export const CreatePost = () => {
    const navigate = useNavigate();
    useTitle("Create Post");
    const postRef = collection(db,"posts");

    async function handleCreatePost(event){
        event.preventDefault();
        const postObj = {
            title: event.target.title.value,
            description: event.target.description.value,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid
            }
        }
        await addDoc(postRef,postObj);
        navigate("/");

    }
  return (
    <section className="create">
        <div className="heading">
            <h1>Add New Post</h1>
        </div>
        <form className="createPost" onSubmit={handleCreatePost}>
            <input type="text" className="title" placeholder="Title" name="title" maxLength="50" required/>
            <textarea type="text" className="description" name="description" placeholder="Description" maxLength="600" required />
            <button type="submit" className="submit">Create</button>
        </form>
    </section>
  )
}
