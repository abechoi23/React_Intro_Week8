import { useState, useEffect, createContext, useContext } from "react";
import { getFirestore, getDocs, collection, doc, getDoc, addDoc, Timestamp, collectionGroup, query } from "@firebase/firestore";
import { AuthContext } from "./AuthProvider";


export const DataContext = createContext();

export const DataProvider = function (props) {
  const [posts, setPost] = useState([]);
  const { user } = useContext(AuthContext)
  const db = getFirestore();
  console.log(posts);

  useEffect(() => {
    async function getPost() {
      //   const response = await fetch(
      //     "https://cdn109-fakebook.onrender.com/api/posts"
      //   );
      //   const data = await response.json();
      //   setPost(data);
      const postQuery = query(collectionGroup(db, 'posts'))
      const querySnapshot = await getDocs(postQuery);
      const loadedPosts = [];
      querySnapshot.forEach((doc) => {
        loadedPosts.push({
          id: doc.id,
          uid: doc.ref.parent.parent.id,
          ...doc.data(),
        });
      });
      setPost(loadedPosts);
    }
    getPost();
  }, [db]);

  async function getPost(uid, id) {
    // const response = await fetch(
    //   `https://cdn109-fakebook.onrender.com/api/post/${id}`
    // );
    // // if (response.status === 404) {
    // //   setPost({ notFound: true });
    // // } else {
    // const data = await response.json();
    // return data;
    const docRef = doc(db, 'users', uid, "posts", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        // Throw an error, so that the catch is triggered in PostSingle
        throw new Error()
    }
    return docSnap.data()
    // if (docSnap.exists()) {
    //   return {
    //     id: docSnap.id,
    //     ...docSnap.data(),
    //   };
    // } else {
    //   console.log("No such document!");
    //   return PostSingle();
    // }
  }

  async function getPokemonData(pokemonId) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    const data = await response.json();
    return data;
  }

  async function addPost(title, body) {
    const newPost = {
        title,
        body,
        dateCreated: Timestamp.now(),
        username: user.displayName
    }
    const docRef = await addDoc(collection(db, 'users', user.uid, 'posts'), newPost)

    newPost.id = docRef.id

    setPost([
        ...posts,
        newPost
    ])

    return newPost
  }

  const value = {
    // title: title is equivalent to:
    posts,
    getPost,
    getPokemonData,
    addPost
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
